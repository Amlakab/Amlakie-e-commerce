import data from '@/lib/data';
import { connectToDatabase } from '@/lib/db';
import Product from './models/product.model';
import { loadEnvConfig } from '@next/env';

// Load environment variables
loadEnvConfig(process.cwd());

const main = async () => {
  try {
    const { products } = data;
    
    // Connect to MongoDB
    await connectToDatabase(process.env.MONGODB_URI!);

    // Clear existing products
    await Product.deleteMany();
    
    // Insert new products
    const createdProducts = await Product.insertMany(products);

    console.log({
      createdProducts,
      message: 'Seeded database successfully',
    });
    
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();