import mongoose, {Schema, Document} from "mongoose";

export interface Role extends Document {
    designation: string,
    description: string
}

const RoleSchema : Schema<Role> = new mongoose.Schema({
    description: {
        type: String
    },
    designation: {
        type: String
    }
})

const RoleModel = (mongoose.models.Role as mongoose.Model<Role>) || (mongoose.model<Role>("Role", RoleSchema));

export default RoleModel;