import { NextRequest, NextResponse } from 'next/server';
import razorpay from '@/components/backend/razorpay';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency } = await request.json();
    
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency,
      receipt: 'receipt_order_12345',
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return new NextResponse(error.message, { status: 500 });
    } else {
      console.error('Unknown error', error);
      return new NextResponse('An unknown error occurred', { status: 500 });
    }
  }
}
