import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ServiceSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  name: {
    type: String,
    required: true
  },
  payload: {
    type: Object
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});
