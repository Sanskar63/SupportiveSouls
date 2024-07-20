import mongoose, { Schema, Document } from 'mongoose';

export interface Work extends Document {
  description: string;
  images: [string];
  heading: string
}
//interface is part of typescript but document is part of mongoose. Here we made typesafety for Work custom data type.

// Updated User schema
const WorkSchema: Schema<Work> = new mongoose.Schema({
  //here this is schema of work data type
  description: {
    type: String,
  },

  images: [
    {type: String,}
  ],

  heading: {
    type: String
  },
});

const WorkModel = (mongoose.models.Work as mongoose.Model<Work>) ||  mongoose.model<Work>('Work', WorkSchema);

export default WorkModel;