import dbConnect from "@/lib/dbConnect";
import WorkModel from "@/model/Work";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { id } = await request.json();
    } catch (error) {
        
    }
}