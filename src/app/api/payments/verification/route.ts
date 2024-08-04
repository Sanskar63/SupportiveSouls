import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { parse } from "querystring";

export async function POST(req: NextRequest) {
    try {
        // Get the raw body as a string
        const bodyText = await req.text();

        // Parse the URL-encoded body
        const body = parse(bodyText);

        // console.log("Received body:", body);

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

        // Verify the Razorpay signature to ensure the request is genuine
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY!)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (generated_signature !== razorpay_signature) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        //payment is verified-----sAVE THE details 
        return NextResponse.redirect(new URL('/', req.nextUrl));
    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
