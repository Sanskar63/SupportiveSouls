import dbConnect from "@/lib/dbConnect";
import EventModel from "@/model/Event";
import { deleteFromCloudinary } from "@/lib/upload";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        const result = await EventModel.findById(id);
        console.log(result);
        if(!result){
            return new Response("Couldn't delete", {status: 400});
        }
        // let public_id = result.banner[0].public_id;
        const deleted = await EventModel.deleteOne({_id:id});
        // public_id = await deleteFromCloudinary(public_id);

        console.log(deleted);
        return new Response("sucessfully deleted the events", {status:200});
    } catch (error) {
        console.log(error);
        return new Response("Some error in removing events in try catch", {status:400});
    }
}