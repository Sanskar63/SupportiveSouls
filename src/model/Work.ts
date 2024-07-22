import mongoose, { Schema, Document } from 'mongoose';

interface Banner {
  url: string;
  public_id: string;
}

export interface Work extends Document {
  description: string;
  images: Banner[];
  heading: string
}
//interface is part of typescript but document is part of mongoose. Here we made typesafety for Work custom data type.


const BannerSchema: Schema<Banner> = new Schema({
  url: {
      type: String,
      required: true
  },
  public_id: {
      type: String,
      required: true
  }
});

// Updated User schema
const WorkSchema: Schema<Work> = new mongoose.Schema({
  //here this is schema of work data type
  description: {
    type: String,
  },

  images: [
    BannerSchema
  ],

  heading: {
    type: String
  },
},{timestamps: true});

const WorkModel = (mongoose.models.Work as mongoose.Model<Work>) ||  mongoose.model<Work>('Work', WorkSchema);

export default WorkModel;