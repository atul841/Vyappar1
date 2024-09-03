import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key'; // Ensure this is securely managed

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('Vyappar');
    const users = db.collection('users');

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }

    // Find user by email
    const user = await users.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid email' }, { status: 404 });
    }

    // Compare password (no hashing, simple string comparison)
    if (password !== user.Password) {
      return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ success: true, message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ success: false, message: 'Failed to login', error: error.message }, { status: 500 });
  }
}
