import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  projects: [ { type: Schema.Types.ObjectId, ref: 'Project' } ],
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});
