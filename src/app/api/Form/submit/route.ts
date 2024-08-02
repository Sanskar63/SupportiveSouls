import FormModel from "@/model/Form";
import dbConnect from "@/lib/dbConnect";
import { FormSchema } from "@/Schemas/formSchema";
import { writeFile } from "fs/promises";
import { uploadOnCloudinary } from "@/lib/upload";

export async function POST(request: Request) {
  await dbConnect();
  console.log("Hello");
  
  try {
    const data = await request.formData();
    const name = data.get('name')?.toString();
    const email = data.get('email')?.toString();
    // const file = data.get('image') as File;
    const contact = data.get('contact');
    const role = data.get('role')?.toString();
    const hours = data.get('hours');
    const about = data.get('about')?.toString();
    const aadhar = data.get('aadhar');

    const contactNum = Number(contact);
    const hoursNum = Number(hours);
    const aadharNum = Number(aadhar);
    // console.log(data)
    // return new Response(data);
    
    if (!name || !email || !contact || !role || !hours || !about || !aadhar) {
      console.log("----------All data needed-------------")
      return new Response("All feilds are required", { status: 400 });
    }
    
    // const byteData = await file.arrayBuffer();
    // const buffer = Buffer.from(byteData);
    // const localPath = `./public/${file.name}`;
    // await writeFile(localPath, buffer);
    
    // const uploadResponse = await uploadOnCloudinary(localPath);
    // if (!uploadResponse) {
    //   return new Response("Failed to upload image", { status: 500 });
    // }

    // const imageUrl = uploadResponse.secure_url;
    
    const content = {
      name,
      email,
      contact:contactNum,
      role,
      hours:hoursNum,
      about,
      // image: imageUrl,
      aadhar:aadharNum
    };

    console.log(content);

    const result = FormSchema.safeParse(content);

    if (!result.success) {
      // Handle validation errors
      console.log("Validation errors ZOD:", result.error);
      return new Response("Invalid data parsing error in Zod", { status: 400 });
    }

    const validData = result.data;

    // Create a new document in the database
    const newForm = new FormModel(validData);
    await newForm.save();
    console.log(newForm);

    return new Response("Form Submitted successfully", { status: 201 });

  } catch (error) {
    console.log("Error in Work add route", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
