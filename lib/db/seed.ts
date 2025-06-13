import data from '@/lib/data';
import { connectToDatabase } from '@/lib/db';
import Product from './models/product.model';
import { loadEnvConfig } from '@next/env';
import  User  from './models/user.model';

// Load environment variables
loadEnvConfig(process.cwd());

const main = async () => {
  try {
    const { products ,users} = data;

        // Connect to MongoDB
    await connectToDatabase(process.env.MONGODB_URI!);

    // Clear existing users
    await User.deleteMany()
    const createdUser = await User.insertMany(users)
    

    // Clear existing products
    await Product.deleteMany();
    
    // Insert new products
    const createdProducts = await Product.insertMany(products);

    console.log({
      createdUser,
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