import dbConnect from "@/lib/dbConnect";
import RoleModel from "@/model/Role";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        const result = await RoleModel.findByIdAndDelete(id);
        // console.log(result);
        if(!result){
            return new Response("Couldn't delete", {status: 400});
        }
        return new Response("sucessfully deleted the role", {status:200});
    } catch (error) {
        console.log(error);
        return new Response("Some error in removing role in try catch", {status:400});
    }
}