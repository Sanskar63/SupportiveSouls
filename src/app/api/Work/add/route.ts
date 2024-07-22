import WorkModel from "@/model/Work";
import dbConnect from "@/lib/dbConnect";
import { WorkSchema } from "@/Schemas/workSchema";
import { writeFile } from "fs/promises";
import { uploadOnCloudinary } from "@/lib/upload"; 

export async function POST(request: Request) {
    await dbConnect();
    console.log("------------------Hello-------------------");

    try {
        const data = await request.formData();
        const description = data.get('description') as string;
        const heading = data.get('heading') as string;

        if (!description || !heading) {
            return new Response("Heading and Description can't be empty.", { status: 400 });
        }

        const files = data.getAll('images');
        if (files.length === 0) {
            return new Response("No images provided", { status: 400 });
        }

        const imageUrls = [];
        for (const file of files) {
            const byteData = await (file as File).arrayBuffer();
            const buffer = Buffer.from(byteData);
            const path = `./public/${(file as File).name}`;
            await writeFile(path, buffer);
            const response = await uploadOnCloudinary(path);
            if (response) {
                // console.log(response, "----------------------------------");
                imageUrls.push({url:response.secure_url, public_id: response.public_id});
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
            return new Response("Invalid data zod parsing error", { status: 400 });
        }

        const validData = result.data;
        const newWork = new WorkModel(validData);
        await newWork.save();
        console.log(newWork);

        return new Response("Work added successfully", { status: 201 });

    } catch (error) {
        console.log("Error in Work add route", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
