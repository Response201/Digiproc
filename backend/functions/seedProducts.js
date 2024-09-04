const Product = require('../models/Product');



/*This function checks if specific products exist in the database. 
If a product is not found, it creates a new entry */

const seedProducts = async () => {

  try {
  
    const products = [
      { name: "Saving & Cost avoidance", image: "https://svgshare.com/i/1A2T.svg", primaryColor: "#dc8409", price: 90000, rating: 4 },
      { name: "Code of Conduct", image: "https://svgshare.com/i/1A30.svg", primaryColor: "#1a364c", price: 90000, rating: 4 },
      { name: "ESG measurement", image: "https://svgshare.com/i/1A1v.svg", primaryColor: "#009760", price: 90000, rating: 4 },
    ];

    for (const product of products) {
      const existingProduct = await Product.findOne({ name: product.name });
      if (!existingProduct) {
        await Product.create(product);
        console.log(`Inserted: ${product.name}`);
      } else {
        console.log(`Already exists: ${product.name}`);
      }
    }

  } catch (err) {
    
    console.error("Error seeding products:", err);
  } 
};  



module.exports = seedProducts;