import dbConnect from "@/lib/dbConnect";
import RoleModel from "@/model/Role";
import { RoleSchema } from "@/Schemas/rolesSchema";

export async function POST(req: Request) {
    dbConnect();

    try {
        const { description, designation } = await req.json();

        if (!description || !designation) {
            return new Response("All feilds are required", { status: 400 });
        }

        const content = {
            description,
            designation
        };
        const result = RoleSchema.safeParse(content);

        if (!result.success) {
            // Handle validation errors
            console.log("Validation errors ZOD:", result.error);
            return new Response("Invalid data parsing error in Zod", { status: 400 });
        }

        const validData = result.data;

        const newRole = new RoleModel(validData);
        await newRole.save();
        console.log(newRole);


        return new Response("role added successfully", { status: 201 });

    } catch (error) {
        console.log("Error in Work add route", error);
        return new Response("error in role add route in try catch", { status: 500 });
    }
}