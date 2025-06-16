import mongoose, { Schema } from 'mongoose';


const problemStatsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  rating: {
    type: Number,
  },
  problemId: {
    type: String,
  },
  problemName: {
    type: String,
  },
  tags: [String],
});

export default mongoose.model('ProblemStats', problemStatsSchema);