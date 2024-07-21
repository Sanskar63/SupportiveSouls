import EventModel from "@/model/Event";
import dbConnect from "@/lib/dbConnect";
import { EventSchema } from "@/Schemas/eventsSchema";
import { writeFile } from "fs/promises";
import { uploadOnCloudinary } from "@/lib/upload";

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
      return new Response("All feilds are required", { status: 400 });
    }
    
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const localPath = `./public/${file.name}`;
    await writeFile(localPath, buffer);
    
    const uploadResponse = await uploadOnCloudinary(localPath);
    if (!uploadResponse) {
      return new Response("Failed to upload image", { status: 500 });
    }

    const imageUrl = uploadResponse.secure_url;
    // console.log(description, heading, imageUrl, date);
    
    const content = {
      description,
      heading,
      banner:imageUrl,
      date
    };

    const result = EventSchema.safeParse(content);

    if (!result.success) {
      // Handle validation errors
      console.log("Validation errors:", result.error);
      return new Response("Invalid data", { status: 400 });
    }

    const validData = result.data;

    // Create a new document in the newEvent
    const newEvent= new EventModel(validData);
    await newEvent.save();
    // console.log(newEvent);

    return new Response("Event added successfully", { status: 201 });

  } catch (error) {
    console.log("Error in Work add route", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
