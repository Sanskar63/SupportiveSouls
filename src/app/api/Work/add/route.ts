import WorkModel from "@/model/Work";
import dbConnect from "@/lib/dbConnect";
import { WorkSchema } from "@/Schemas/workSchema";
import { writeFile } from "fs/promises";
import { uploadOnCloudinary } from "@/lib/upload"; 
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    await dbConnect();
    console.log("------------------Hello-------------------");

    try {
        const data = await request.formData();
        const description = data.get('description') as string;
        const heading = data.get('heading') as string;

        if (!description || !heading) {
            console.log("Validation failed: Missing heading or description");
            return NextResponse.json({ message: "Heading and Description can't be empty." }, { status: 400 });
        }

        const files = data.getAll('images');
        if (files.length === 0) {
            console.log("Validation failed: No images provided");
            return NextResponse.json({ message: "No images provided" }, { status: 400 });
        }

        const imageUrls = [];
        for (const file of files) {
            const byteData = await (file as File).arrayBuffer();
            const buffer = Buffer.from(byteData);
            const path = `./public/${(file as File).name}`;
            await writeFile(path, buffer);

            const response = await uploadOnCloudinary(path);
            if (response) {
                console.log("Upload successful:", response);
                imageUrls.push({ url: response.secure_url, public_id: response.public_id });
            } else {
                console.log("Upload failed for file:", path);
            }
        }

        const content = {
            description,
            heading,
            images: imageUrls
        };

        const result = WorkSchema.safeParse(content);
        if (!result.success) {
            console.log("Validation errors:", result.error);
            return NextResponse.json({ message: "Invalid data zod parsing error", error: result.error }, { status: 400 });
        }

        const validData = result.data;
        const newWork = new WorkModel(validData);
        await newWork.save();
        console.log(newWork);

        return NextResponse.json({ message: "Work added successfully" }, { status: 201 });

    } catch (error: any) {
        console.log("Error in Work add route", error);
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}
