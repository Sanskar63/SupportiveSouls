import dbConnect from "@/lib/dbConnect";
import FormModel from "@/model/Form";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
    await dbConnect();

    try {
        const forms = await FormModel.find().lean();
        return NextResponse.json(forms);
    } catch (error) {
        console.error('Error fetching forms:', error);
        return NextResponse.json({ error: 'Failed to fetch forms. Please try again later.' }, { status: 500 });
    }
}
