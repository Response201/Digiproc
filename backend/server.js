const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const Product = require('./models/Product');
const seedProducts = require('./functions/seedProducts');


/* MongoDB connection URL, defaults to local if not specified */
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/digiproc";


/*  Connect to MongoDB and seed products */
mongoose.connect(mongoUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => {
		console.log("Connected to MongoDB!!!");

		/* Seed the database with initial products */
		seedProducts();
	})
	.catch(err => {
		console.error("MongoDB connection error:", err);
	});
	const port = process.env.PORT || 3000; 


/*  Middleware setup - cors and json */
app.use(cors()); 
app.use(express.json());


/* Endpoints */


app.get("/", (req, res) => {
	res.send("Welcome to this API");
});


/* Route to get all products */
app.get("/allProducts", async (req, res) => {
	try {

		const allProducts = await Product.find();

		/* if no products are found, respond with a 404 error */
		if (!allProducts) {
			return res.status(404).json({ message: "No Products found" });
		} else {
			/*  respond with the list of all products */
			res.json({ products: allProducts });
		}
	} catch (error) {
	
		res.json({ error: 'Something went wrong' });
	}
});



/* Route to update rating */
app.put("/updateRating", async (req, res) => {
	const { id, newRating } = req.body;
	
	/* Check if 'id' or 'newRating' are provided */
	if (!id || !newRating) {
	
		return res.status(404).json({ message: "Something went wrong" });
	}
	
	try {
		/* find the product by its _id and update its rating */
		const product = await Product.findByIdAndUpdate(id, { rating: +newRating }, { new: true });
		
		/* if the product was not found, respond with a 404 error */
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		} else {
			/* if the product was found and updated, retrieve all products */
			const allProducts = await Product.find();
			
			/* if no products are found, respond with a 404 error */
			if (!allProducts) {
				return res.status(404).json({ message: "No Products found" });
			} else {
				/*  respond with the list of all products */
				res.json({ products: allProducts });
			}
		}
	} catch (error) {
		
		res.json({ message: 'Something went wrong' });
	}
});




/* Start server */
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
