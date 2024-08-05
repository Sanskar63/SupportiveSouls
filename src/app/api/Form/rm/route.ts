import dbConnect from "@/lib/dbConnect";
import FormModel from "@/model/Form";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        const result = await FormModel.findByIdAndDelete(id);
        if(!result){
            return new Response("Couldn't delete", {status: 400});
        }
        
        return new Response("sucessfully deleted the Form", {status:200});
    } catch (error) {
        console.log(error);
        return new Response("Some error in removing work in try catch", {status:400});
    }
}