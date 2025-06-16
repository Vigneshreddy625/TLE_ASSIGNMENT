import mongoose, { Schema } from 'mongoose';

const historySchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    contestId: {
      type: Number,
      required: true,
    },
    contestName: {
      type: String,
    },
    date: {
      type: Date, 
      required: true,
    },
    oldRating: {
      type: Number,
    },
    newRating: {
      type: Number,
    },
    ratingChange: {
      type: Number,
    },
    rank: {
      type: Number,
    },
    unsolvedProblems: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('History', historySchema);