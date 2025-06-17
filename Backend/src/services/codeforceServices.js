import axios from 'axios';
import User from '../models/user.model.js'; 
import History from '../models/history.model.js'; 
import ProblemStats from '../models/problems.model.js';

const CF_API_BASE = 'https://codeforces.com/api';

/**
 * Syncs all Codeforces data for a given user:
 * - User info (current and max rating)
 * - Contest history (including rating changes, rank, and unsolved problems per contest)
 * - Problem submission stats (unique accepted problems)
 * @param {string} userId - The ID of the user from your database.
 */
export const syncUserData = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const handle = user.codeforcesHandle;
        if (!handle) {
            console.warn(`User ${userId} has no Codeforces handle. Skipping sync.`);
            return;
        }

        console.log(`Starting sync for user: ${handle}`);

        try {
            const userInfoResponse = await axios.get(`${CF_API_BASE}/user.info?handles=${handle}`);
            const userInfo = userInfoResponse.data.result[0];
            user.avatar = userInfo.avatar || '';
            user.currentRating = userInfo.rating || 0;
            user.maxRating = userInfo.maxRating || 0;
            user.lastSyncedAt = new Date();
            await user.save();
            console.log(`Updated user info for ${handle}. Current Rating: ${user.currentRating}`);
        } catch (error) {
            console.error(`Error fetching user info for ${handle}:`, error.message);
        }

        await syncContestHistory(userId, handle);

        await syncProblemSubmissions(userId, handle);

        console.log(`Successfully synced all data for user ${handle}`);
    } catch (error) {
        console.error(`Error syncing data for user ID ${userId}:`, error.message);
    }
};

/**
 * @param {string} userId - The ID of the user.
 * @param {string} handle - The Codeforces handle of the user.
 */
const syncContestHistory = async (userId, handle) => {
  try {
    console.log(`Syncing contest history for ${handle}...`);
    const response = await axios.get(`${CF_API_BASE}/user.rating?handle=${handle}`);
    const contests = response.data.result;

    await History.deleteMany({ user: userId });

    const historyDataPromises = contests.map(async (contest) => {
      let unsolvedProblemsCount = 0;

      try {
        const problemsRes = await axios.get(
          `${CF_API_BASE}/contest.standings?contestId=${contest.contestId}&from=1&count=1&showUnofficial=true`
        );
        const allProblems = problemsRes.data.result.problems;
        const totalProblems = allProblems.length;

        const submissionsRes = await axios.get(
          `${CF_API_BASE}/contest.status?contestId=${contest.contestId}&handle=${handle}&count=10000`
        );
        const submissions = submissionsRes.data.result;

        const solvedSet = new Set();
        for (const sub of submissions) {
          if (sub.verdict === 'OK' && sub.problem?.contestId && sub.problem?.index) {
            solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
          }
        }

        unsolvedProblemsCount = Math.max(0, totalProblems - solvedSet.size);
      } catch (error) {
        console.warn(
          `Warning: Could not fetch problems/submissions for contest ${contest.contestId} (${contest.contestName}) — ${error.message}`
        );
        unsolvedProblemsCount = -1;
      }

      return {
        user: userId,
        contestId: contest.contestId,
        contestName: contest.contestName,
        date: new Date(contest.ratingUpdateTimeSeconds * 1000),
        oldRating: contest.oldRating,
        newRating: contest.newRating,
        ratingChange: contest.newRating - contest.oldRating,
        rank: contest.rank,
        unsolvedProblems: unsolvedProblemsCount,
      };
    });

    const historyData = await Promise.all(historyDataPromises);

    if (historyData.length > 0) {
      await History.insertMany(historyData);
      console.log(`Inserted ${historyData.length} contest history records for ${handle}.`);
    } else {
      console.log(`No contest history found for ${handle}.`);
    }
  } catch (error) {
    console.error(`Error syncing contest history for ${handle}:`, error.message);
  }
};


/**
 * Syncs a user's problem submissions, focusing on unique accepted problems.
 * Includes pagination for fetching all submissions.
 * @param {string} userId - The ID of the user.
 * @param {string} handle - The Codeforces handle of the user.
 */
const syncProblemSubmissions = async (userId, handle) => {
    try {
        console.log(`Syncing problem submissions for ${handle}...`);
        let allSubmissions = [];
        let from = 1;
        const count = 10000; 

        while (true) {
            const response = await axios.get(`${CF_API_BASE}/user.status?handle=${handle}&from=${from}&count=${count}`);
            const submissionsBatch = response.data.result;
            allSubmissions = allSubmissions.concat(submissionsBatch);

            if (submissionsBatch.length < count) {
                break;
            }
            from += count;
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        const acceptedSubmissions = allSubmissions.filter(sub => sub.verdict === 'OK');

        const uniqueProblems = {};
        acceptedSubmissions.forEach(sub => {
            const problemKey = `${sub.problem.contestId || 'no_contest_id'}-${sub.problem.index || 'no_index'}`;
            if (!uniqueProblems[problemKey] || sub.creationTimeSeconds < uniqueProblems[problemKey].creationTimeSeconds) {
                uniqueProblems[problemKey] = sub;
            }
        });

        await ProblemStats.deleteMany({ user: userId });

        const problemData = Object.values(uniqueProblems).map(sub => ({
            user: userId,
            date: new Date(sub.creationTimeSeconds * 1000), 
            rating: sub.problem.rating || 0, 
            problemId: `${sub.problem.contestId || 'no_contest_id'}${sub.problem.index || 'no_index'}`, // For easier indexing
            problemName: sub.problem.name || 'Unknown Problem',
            tags: sub.problem.tags || [],
            submissionTime: new Date(sub.creationTimeSeconds * 1000) 
        }));

        if (problemData.length > 0) {
            await ProblemStats.insertMany(problemData);
            console.log(`Inserted ${problemData.length} unique problem stats for ${handle}.`);
        } else {
            console.log(`No unique accepted problems found for ${handle}.`);
        }
    } catch (error) {
        console.error(`Error syncing problem submissions for ${handle}:`, error.message);
    }
};

export const syncAllUsers = async () => {
  try {
    const users = await User.find({}); 
    console.log(`Starting data sync for ${users.length} users.`);

    for (const user of users) {
      await syncUserData(user._id);
      user.lastSyncedAt = new Date();
      await user.save();
      await new Promise(resolve => setTimeout(resolve, 2000)); 
    }

    console.log('Completed data sync for all users.');
  } catch (error) {
    console.error('Error during batch sync for all users:', error.message);
  }
};