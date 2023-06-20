const Product = require('../models/Product')
const {
	verifyToken,
	verifyTokenAndAuth,
	verifyTokenAndAdmin
} = require('./verifyToken')

const router = require('express').Router()

// CREATE

router.post('/', verifyTokenAndAdmin, async (req, res) => {
	const newProduct = new Product(req.body)

	try {
		const savedProduct = await newProduct.save()
		res.status(200).json(savedProduct)
	} catch (error) {
		res.status(500).json(error)
	}
})

// UPDATE

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		)

		res.status(200).json(updatedProduct)
	} catch (error) {
		res.status(500).json(error)
	}
})

// DELETE

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id)
		res.json(200).json('Товар был удалён...')
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET PRODUCT

router.get('/find/:id', async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		res.status(200).json(product)
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET ALL PRODUCTS

router.get('/', async (req, res) => {
	const qNew = req.query.new
	const qCategory = req.query.category
	const qBrand = req.query.brand
	const qGender = req.query.gender

	try {
		let products

		if (qNew) {
			products = await Product.find().sort({ createdAt: -1 })
		} else if (qGender && qCategory && qBrand) {
			products = await Product.find({
				categories: {
					$in: [qCategory]
				},
				brand: qBrand,
				gender: qGender
			})
		} else if (qGender && qCategory) {
			products = await Product.find({
				categories: {
					$in: [qCategory]
				},
				gender: qGender
			})
		} else if (qGender && qBrand) {
			products = await Product.find({
				brand: qBrand,
				gender: qGender
			})
		} else if (qCategory && qBrand) {
			products = await Product.find({
				categories: {
					$in: [qCategory]
				},
				brand: qBrand
			})
		} else if (qGender) {
			products = await Product.find({
				gender: qGender
			})
		} else if (qCategory) {
			products = await Product.find({
				categories: {
					$in: [qCategory]
				}
			})
		} else if (qBrand) {
			products = await Product.find({
				brand: qBrand
			})
		} else {
			products = await Product.find()
		}

		res.status(200).json(products)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router
