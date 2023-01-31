
const express = require('express')
const router = express.Router()

//import model
// const {Chat} = require('../models')
 const db = require('../models')
 const { handleValidateOwnership, requireToken } = require("../config/auth");


// middleware to print out the HTTP method and the URL path for every request to our terminal
router.use((req, res, next) => {    
	console.log(`${req.method} ${req.originalUrl}`);    
	next();
});


// index route (GET HTTP VERB)
// this route will catch GET requests to /products/ and respond with all the products
router.get('/', async (req, res, next) => { 
	try {
			const chat = await db.Chat.find({}).populate('owner', 'username -_id').exec()
			res.status(200).json(chat)
	} catch (error) {
			console.error(error)
			return next(error)
	}
});


// show route (GET HTTP VERB)
// this route will catch GET requests to /products/index/ and respond with a single product
router.get('/:id', async (req, res, next) => { 
try {
	const foundChat = await db.Chat.findById(req.params.id)
	.populate("owner")
	.exec();
	console.log(foundChat)
	res.status(200).json(foundChat)
} catch (error) {
	console.error(error)
	return next(error)
}
});


// create route (POST HTTP VERB)
// send data to create a new product
router.post("/", requireToken, async (req, res, next) => {
  try {

		// passport will verify the the token passed with the request's Authorization headers and set the current user for the request (req.user).
		const owner = req.user._id
		req.body.owner = owner
    const newChat = await db.Chat.create(req.body);
    res.status(201).json(newChat);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

// update route (PUT HTTP VERB)
router.put("/:id", requireToken, async (req, res) => {
	try {
		handleValidateOwnership(req, await db.Chat.findById(req.params.id))
		const updatedChat = await db.Chat.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		)
		res.status(200).json(updatedChat)
	} catch (error) {
		//send error
		res.status(400).json({error: error.message})
	}
})

// destroy route (DELETE HTTP VERB)
router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    handleValidateOwnership(req, await db.Chat.findById(req.params.id));
    const deletedChat = await db.Chat.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedChat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});




module.exports = router