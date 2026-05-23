import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any)?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // Cek apakah content type JSON atau form-data
    let userId, buyType, amount, packagePrice, packageName, robloxUser, robloxPass, backupCode, whatsapp, file;
    let dbFilePath = null;

    if (req.headers.get("content-type")?.includes("application/json")) {
      const body = await req.json();
      buyType = body.buyType;
      packagePrice = body.packagePrice;
      amount = body.amount;
      packageName = body.packageName || `${amount} R$ - ${buyType}`;
      robloxUser = body.robloxUser;
      robloxPass = body.robloxPass;
      backupCode = body.backupCode;
      whatsapp = body.whatsapp;
    } else {
      const formData = await req.formData();
      userId = formData.get('userId') as string;
      buyType = formData.get('buyType') as string;
      amount = Number(formData.get('amount'));
      packagePrice = Number(formData.get('packagePrice'));
      packageName = `${amount} R$ - ${buyType}`;
      robloxUser = formData.get('robloxUser') as string;
      robloxPass = formData.get('robloxPass') as string;
      backupCode = formData.get('backupCode') as string;
      whatsapp = formData.get('whatsapp') as string;
      file = formData.get('paymentProof') as File;
    }

    if (!robloxUser || !whatsapp || !amount) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Process file upload if it exists
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadResult = await uploadToCloudinary(buffer, 'w2e/payment_proofs');
      dbFilePath = uploadResult.secure_url;
    }

    // Create Order in DB
    const order = await prisma.order.create({
      data: {
        userId: (session.user as any).id,
        buyType: buyType,
        package: packageName,
        amount: packagePrice,
        robloxUser,
        robloxPass: buyType === '5days' ? robloxPass : null,
        backupCode: buyType === '5days' ? backupCode : null,
        whatsapp,
        paymentProof: dbFilePath,
        status: "PENDING"
      }
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      message: "Order placed successfully. Awaiting admin verification."
    });
  } catch (err: any) {
    console.error("Checkout Error:", err);
    return NextResponse.json({ success: false, error: err.message || "Bad Request" }, { status: 500 });
  }
}
