import dbConnect from "@/lib/dbConnect";
import EventModel from "@/model/Event";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    await dbConnect();
    try {
        const events = await EventModel.find().lean();
        // console.log(events);
        return NextResponse.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}