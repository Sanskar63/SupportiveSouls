import dbConnect from "@/lib/dbConnect";
import { deleteFromCloudinary } from "@/lib/upload";
import WorkModel from "@/model/Work";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        const result = await WorkModel.findById(id);
        // console.log(result, result?.images.length);
        if(!result){
            return new Response("Couldn't delete", {status: 400});
        }
        let public_id;
        for(let i=0; i< result?.images.length; i++){
            public_id = await deleteFromCloudinary(result?.images[i].public_id);
            // console.log(result?.images[i])
        }
        const deleted = await WorkModel.deleteOne({_id:id});

        return new Response("sucessfully deleted the work", {status:200});
    } catch (error) {
        console.log(error);
        return new Response("Some error in removing work in try catch", {status:400});
    }
}