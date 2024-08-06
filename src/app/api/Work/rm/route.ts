import dbConnect from "@/lib/dbConnect";
import { deleteFromCloudinary } from "@/lib/upload";
import WorkModel from "@/model/Work";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        const result = await WorkModel.findById({_id:id});
        if(!result){
            return new Response(`Couldn't find the item with id == ${id}`, {status: 400});
        }
        let public_id;
        for(let i=0; i< result?.images.length; i++){
            public_id = await deleteFromCloudinary(result?.images[i].public_id);
        }
        const deleted = await WorkModel.deleteOne({_id:id});

        return NextResponse.json({message: "sucessfully deleted the work", data:deleted}, {status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Some error in removing work in try catch", error:error}, {status:400});
    }
}