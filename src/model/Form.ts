import mongoose, { Schema, Document } from 'mongoose';


export interface Form extends Document {
    name: string;
    email: string;
    contact: number;
    role: string;
    hours: number;
    aadhar: number;
    else: string;
}
//interface is part of typescript but document is part of mongoose. Here we made typesafety for Work custom data type.

// Updated User schema
const FormSchema: Schema<Form> = new mongoose.Schema({ //here this is schema of work data type
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
    contact: {
        type: Number,
        required: [true, 'Contact is required'],
    },
    role: {
        type: String,
        required: [true, 'Verify Code is required'],
    },
    hours: {
        type: Number,
    },
    aadhar: {
        type: Number,
        required: [true, 'aadhar is required'],
    },
    else: {
        type: String,
    },
});

const FormModel = (mongoose.models.Form as mongoose.Model<Form>) || mongoose.model<Form>('Form', FormSchema);

export default FormModel;