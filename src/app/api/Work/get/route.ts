import dbConnect from "@/lib/dbConnect";
import WorkModel from "@/model/Work";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    await dbConnect();
    try {
        const events = await WorkModel.find().lean();
        // console.log(events);
        return NextResponse.json(events);
    } catch (error) {
        console.error('Error fetching roles:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}