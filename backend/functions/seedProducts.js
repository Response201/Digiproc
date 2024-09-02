const Product = require('../models/Product');



/*This function checks if specific products exist in the database. 
If a product is not found, it creates a new entry */

const seedProducts = async () => {

  try {
  
    const products = [
      { name: "Saving & Cost avoidance", image: "https://i.postimg.cc/brhN8SN6/Product1.jpg", primaryColor: "#dc8409", price: 100, rating: 4 },
      { name: "Code of Conduct", image: "https://i.postimg.cc/DwMv0Mw4/Product2.jpg", primaryColor: "#1a364c", price: 150, rating: 4 },
      { name: "ESG measurement", image: "https://i.postimg.cc/Kznx9crt/Product3.jpg", primaryColor: "#009760", price: 200, rating: 4 },
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