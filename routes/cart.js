const Cart = require('../models/Cart')
const {
	verifyToken,
	verifyTokenAndAuth,
	verifyTokenAndAdmin
} = require('./verifyToken')

const router = require('express').Router()

// CREATE

router.post('/', verifyTokenAndAuth, async (req, res) => {
	const newCart = new Cart(req.body)

	try {
		const savedCart = await newCart.save()
		res.status(200).json(savedCart)
	} catch (error) {
		res.status(500).json(error)
	}
})

// UPDATE

router.put('/:id', verifyTokenAndAuth, async (req, res) => {
	try {
		const updatedCart = await Cart.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		)

		res.status(200).json(updatedCart)
	} catch (error) {
		res.status(500).json(error)
	}
})

// DELETE

router.delete('/:id', verifyTokenAndAuth, async (req, res) => {
	try {
		await Cart.findByIdAndDelete(req.params.id)
		res.json(200).json('Товар был удалён из корзины')
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET USER CART

router.get('/find/:id', verifyTokenAndAuth, async (req, res) => {
	try {
		const cart = await Cart.findById({ userId: req.params.userId })
		res.status(200).json(cart)
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET ALL PRODUCTS

router.get('/', verifyTokenAndAdmin, async (req, res) => {
	try {
		const carts = await Cart.find()
		res.status(200).json(carts)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router
