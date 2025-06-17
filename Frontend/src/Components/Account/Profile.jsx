import ProfileHeader from "./Header";
import ContestHistory from "./History";
import ProblemSolvingData from "./ProblemSolving";

const Profile = () => {
  const studentData = {
    name: "Alex Chen",
    username: "alexc_2024",
    currentRating: 1847,
    maxRating: 1923,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  };

  const contestHistory = [
    { date: "2024-06-10", contest: "Codeforces Round #950", rating: 1847, change: +42, rank: 156, unsolved: 2 },
    { date: "2024-06-05", contest: "Educational Codeforces Round #167", rating: 1805, change: -15, rank: 892, unsolved: 3 },
    { date: "2024-05-28", contest: "Codeforces Round #949", rating: 1820, change: +38, rank: 234, unsolved: 1 },
    { date: "2024-05-20", contest: "Div. 2 Round #948", rating: 1782, change: -28, rank: 1247, unsolved: 4 },
    { date: "2024-05-15", contest: "Global Round #25", rating: 1810, change: +55, rank: 89, unsolved: 1 },
    { date: "2024-05-08", contest: "Educational Round #166", rating: 1755, change: +31, rank: 445, unsolved: 2 },
    { date: "2024-04-30", contest: "Codeforces Round #947", rating: 1724, change: -22, rank: 1056, unsolved: 3 },
    { date: "2024-04-22", contest: "Div. 2 Round #946", rating: 1746, change: +49, rank: 178, unsolved: 1 },
  ];

  const problemsData = {
  mostDifficult: { name: "Tree DP with Rerooting", rating: 2100, date: "2024-06-12" },
  totalSolved: 847,
  averageRating: 1456,
  averagePerDay: 2.3,
  ratingBuckets: [
    { range: "800-1000", count: 156 },
    { range: "1000-1200", count: 189 },
    { range: "1200-1400", count: 203 },
    { range: "1400-1600", count: 167 },
    { range: "1600-1800", count: 89 },
    { range: "1800-2000", count: 32 },
    { range: "2000+", count: 11 },
  ],
};

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-2 md:px-6 lg:px-8 pb-4 space-y-4">
        <ProfileHeader studentData={studentData} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          <ContestHistory contestHistory={contestHistory} />
          <ProblemSolvingData problemsData={problemsData} />
        </div>
      </div>
    </div>
  );
};

export default Profile;