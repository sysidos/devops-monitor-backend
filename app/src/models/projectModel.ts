import mongoose from 'mongoose';
import crypto from 'crypto';

const Schema = mongoose.Schema;

export const ProjectSchema = new Schema({
  token: {
    type: String,
    unique: true,
    default: function () {
      return crypto.randomBytes(48).toString('base64');
    }
  },
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});
