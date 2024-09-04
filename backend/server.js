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
const port = 27017;


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
		if (!allProducts) {
			return res.status(404).json({ message: "No Products found" });
		} else {
			res.json({ products: allProducts });
		}
	} catch (error) {
		console.error(error);
		res.json({ error: 'Something went wrong' });
	}
});



/* Route to get a product by ID */
app.get("/productById", async (req, res) => {
	const { id } = req.body;
	if (!id) {
		return res.status(404).json({ message: "ID is required" });
	}
	try {
		const product = await Product.findById(id);
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		} else {
			res.json({ product: product });
		}
	} catch (error) {
		console.error(error);
		res.json({ message: 'Something went wrong' });
	}
});




/* Start server */
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
