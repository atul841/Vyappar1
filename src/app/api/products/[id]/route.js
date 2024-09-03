import clientPromise from '@/lib/mongodb';

export async function GET({ params }) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db();
    
    // Fetch product by ID
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });
    if (product) {
      return new Response(JSON.stringify(product), { status: 200 });
    } else {
      return new Response("Product not found", { status: 404 });
    }
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
