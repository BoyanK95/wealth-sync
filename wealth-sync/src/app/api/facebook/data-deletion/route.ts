import { db } from "@/server/db";
import { NextResponse } from "next/server";

//STILL NEED TO IMPLEMENT THIS
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const confirmCode = searchParams.get("confirm_code");

  // Return the confirmation code in the required format
  return NextResponse.json({
    url: `https://your-domain.com/api/facebook/data-deletion?id=${id}&confirm_code=${confirmCode}`,
    confirmation_code: confirmCode,
  });
}

export async function POST(request: Request) {
  try {
    const { user_id } = await request.json();

    // Find and delete user with Facebook ID
    await db.user.deleteMany({
      where: {
        accounts: {
          some: {
            provider: "facebook",
            providerAccountId: user_id as string,
          },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Facebook data deletion error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process deletion request" },
      { status: 500 },
    );
  }
}
