import EventModel from "@/model/Event";
import dbConnect from "@/lib/dbConnect";
import { EventSchema } from "@/Schemas/eventsSchema";
import { uploadOnCloudinary } from "@/lib/upload";
import { NextResponse } from 'next/server';

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
}

export async function POST(request: Request) {
  await dbConnect();
  console.log("Hello");

  try {
    const data = await request.formData();
    const description = data.get('description')?.toString();
    const heading = data.get('heading')?.toString();
    const file = data.get('banner') as File;
    const date = data.get('date')?.toString();

    console.log(data);

    if (!file || !description || !heading || !date) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const uploadResponse = await uploadOnCloudinary(file);
    if (!uploadResponse) {
      return NextResponse.json({ message: "Failed to upload image" }, { status: 500 });
    }

    const imageUrl = { url: uploadResponse.secure_url, public_id: uploadResponse.public_id };
    console.log(imageUrl);

    const content = {
      description,
      heading,
      banner: imageUrl,
      date
    };

    const result = EventSchema.safeParse(content);

    if (!result.success) {
      // Handle validation errors
      console.log("Validation errors:", result.error);
      return NextResponse.json({ message: "Invalid data", error: result.error }, { status: 400 });
    }

    const validData = result.data;

    // Create a new document in the EventModel
    const newEvent = new EventModel(validData);
    await newEvent.save();
    // console.log(newEvent);

    return NextResponse.json({ message: "Event added successfully" }, { status: 201 });

  } catch (error: any) {
    console.log("Error in Work add route", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
