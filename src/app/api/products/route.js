import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';


// Create a product
export async function POST(req) {
  try {
    const { name, description, price, stock, shopkeeper_id } = await req.json();
    const client = await clientPromise;
    const db = client.db();
    
    // Create a new product
    const result = await db.collection('products').insertOne({
      name,
      description,
      price,
      stock,
      shopkeeper_id,
      created_at: new Date(),
      updated_at: new Date()
    });

    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}


// Update a product
export async function PATCH(req) {
    try {
      const { id, updates } = await req.json();
      const client = await clientPromise;
      const db = client.db();
      
      // Update the product
      const result = await db.collection('products').updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...updates, updated_at: new Date() } }
      );
  
      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      return new Response(error.message, { status: 500 });
    }
  }

  // Delete a product
export async function DELETE(req) {
    try {
      const { id } = await req.json();
      const client = await clientPromise;
      const db = client.db();
      
      // Delete the product
      const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });
      return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
      return new Response(error.message, { status: 500 });
    }
  }

// Get all products
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Fetch all products
    const products = await db.collection('products').find({}).toArray();

    // Each product is returned as a separate object within an array
    const responses = products.map(product => ({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      shopkeeper_id: product.shopkeeper_id,
      created_at: product.created_at,
      updated_at: product.updated_at
    }));

    // Log each product separately for debugging
    products.forEach(product => {
      console.log(JSON.stringify(product, null, 2));
    });

    // Return all products as an array of separate objects
    return new Response(JSON.stringify(responses, null, 2), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}