import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    avatar:{
      type: String,
    },
    codeforcesHandle: {
      type: String,
      required: true,
      unique: true,
    },
    currentRating: {
      type: Number,
    },
    maxRating: {
      type: Number,
    },
    lastSyncedAt: {
      type: Date,
    },
    autoEmailEnabled: {
      type: Boolean,
      default: true,
    },
    reminderEmailCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const User = mongoose.model('User', UserSchema);
export default User;