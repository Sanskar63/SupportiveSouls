import mongoose, {Schema , Document} from "mongoose";


interface Banner {
    url: string;
    public_id: string;
}


export interface Event extends Document {
    banner: Banner[],
    description: string,
    date: Date,
    heading: string
}



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


const EventsSchema : Schema<Event> = new mongoose.Schema({
    banner:[BannerSchema],
    description:{
        type: String,
        required: [true, "description is required"]
    },
    date:{
        type: Date
    },
    heading: {
        type: String
    }
},{timestamps: true});

const EventModel = (mongoose.models.Event as mongoose.Model<Event>) || (mongoose.model<Event>("Event", EventsSchema));

export default EventModel;