import { NextResponse } from "next/server";
import User from "../../../lib/models/User";
import clientPromise from "../../../lib/mongodb";

export async function POST(req) {
  try {
    // Parse the incoming request body
    const { username, email, password, phoneNumber } = await req.json();
    console.log("Request Data:", { username, email, password, phoneNumber });

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Check if the user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
    }

    // Create a new user instance using the User model
    const newUser = {
      username,
      email,
      Password: password, // Ensure this field matches the schema
      phoneNumber,
      createdAt: new Date(),
    };

    console.log("New User Data:", newUser);

    // Save the user to MongoDB
    const result = await db.collection('users').insertOne(newUser);
    console.log("Insert Result:", result);

    return NextResponse.json({ success: true, message: "User saved to MongoDB", data: result }, { status: 201 });
  } catch (error) {
    console.error("Error saving user to MongoDB:", error);
    return NextResponse.json({ success: false, message: "Failed to save user", error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ success: false, message: "Method GET Not Allowed" }, { status: 405 });
}
