import mongoose, {Schema , Document} from "mongoose";

export interface Event extends Document {
    banner: string,
    description: string,
    date: Date
}

const EventsSchema : Schema<Event> = new mongoose.Schema({
    banner:{
        type: String,
    },
    description:{
        type: String,
        required: [true, "description is required"]
    },
    date:{
        type: Date
    }
})

const EventModel = (mongoose.models.Event as mongoose.Model<Event>) || (mongoose.model<Event>("Event", EventsSchema));

export default EventModel;