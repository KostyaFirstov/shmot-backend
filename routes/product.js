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
		res.status(200).json('Товар был удалён...')
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET PRODUCT

router.get('/:title', async (req, res) => {
	try {
		const product = await Product.find({ title: req.params.title })
		res.status(200).json(product)
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET ALL PRODUCTS

router.get('/', async (req, res) => {
	const qSort = req.query.sort
	const qCategory = req.query.category
	const qBrand = req.query.brand
	const qGender = req.query.gender
	const qSearch = req.query.search

	try {
		let products

		if (qGender && qCategory && qBrand && qSort) {
			let sortValue
			if (qSort === 'new') {
				sortValue = { createdAt: -1 }
			} else if (qSort === '-new') {
				sortValue = { createdAt: 1 }
			} else if (qSort === 'price') {
				sortValue = { price: -1 }
			} else if (qSort === '-price') {
				sortValue = { price: 1 }
			} else if (qSort === 'popular') {
				sortValue = { popular: -1 }
			} else if (qSort === '-popular') {
				sortValue = { popular: 1 }
			}

			products = await Product.find({
				categories: {
					$in: [qCategory]
				},
				brand: qBrand,
				gender: {
					$in: [qGender]
				}
			}).sort(sortValue)
		} else if (qGender && qBrand && qSort) {
			let sortValue
			if (qSort === 'new') {
				sortValue = { createdAt: -1 }
			} else if (qSort === '-new') {
				sortValue = { createdAt: 1 }
			} else if (qSort === 'price') {
				sortValue = { price: -1 }
			} else if (qSort === '-price') {
				sortValue = { price: 1 }
			} else if (qSort === 'popular') {
				sortValue = { popular: -1 }
			} else if (qSort === '-popular') {
				sortValue = { popular: 1 }
			}

			products = await Product.find({
				brand: qBrand,
				gender: {
					$in: [qGender]
				}
			}).sort(sortValue)
		} else if (qGender && qCategory && qSort) {
			let sortValue
			if (qSort === 'new') {
				sortValue = { createdAt: -1 }
			} else if (qSort === '-new') {
				sortValue = { createdAt: 1 }
			} else if (qSort === 'price') {
				sortValue = { price: -1 }
			} else if (qSort === '-price') {
				sortValue = { price: 1 }
			} else if (qSort === 'popular') {
				sortValue = { popular: -1 }
			} else if (qSort === '-popular') {
				sortValue = { popular: 1 }
			}

			products = await Product.find({
				categories: {
					$in: [qCategory]
				},
				gender: {
					$in: [qGender]
				}
			}).sort(sortValue)
		} else if (qBrand && qCategory && qSort) {
			let sortValue
			if (qSort === 'new') {
				sortValue = { createdAt: -1 }
			} else if (qSort === '-new') {
				sortValue = { createdAt: 1 }
			} else if (qSort === 'price') {
				sortValue = { price: -1 }
			} else if (qSort === '-price') {
				sortValue = { price: 1 }
			} else if (qSort === 'popular') {
				sortValue = { popular: -1 }
			} else if (qSort === '-popular') {
				sortValue = { popular: 1 }
			}

			products = await Product.find({
				categories: {
					$in: [qCategory]
				},
				brand: qBrand
			}).sort(sortValue)
		} else if (qGender && qSort) {
			let sortValue
			if (qSort === 'new') {
				sortValue = { createdAt: -1 }
			} else if (qSort === '-new') {
				sortValue = { createdAt: 1 }
			} else if (qSort === 'price') {
				sortValue = { price: -1 }
			} else if (qSort === '-price') {
				sortValue = { price: 1 }
			} else if (qSort === 'popular') {
				sortValue = { popular: -1 }
			} else if (qSort === '-popular') {
				sortValue = { popular: 1 }
			}

			products = await Product.find({
				gender: {
					$in: [qGender]
				}
			}).sort(sortValue)
		} else if (qBrand && qSort) {
			let sortValue
			if (qSort === 'new') {
				sortValue = { createdAt: -1 }
			} else if (qSort === '-new') {
				sortValue = { createdAt: 1 }
			} else if (qSort === 'price') {
				sortValue = { price: -1 }
			} else if (qSort === '-price') {
				sortValue = { price: 1 }
			} else if (qSort === 'popular') {
				sortValue = { popular: -1 }
			} else if (qSort === '-popular') {
				sortValue = { popular: 1 }
			}

			products = await Product.find({
				brand: qBrand
			}).sort(sortValue)
		} else if (qCategory && qSort) {
			let sortValue
			if (qSort === 'new') {
				sortValue = { createdAt: -1 }
			} else if (qSort === '-new') {
				sortValue = { createdAt: 1 }
			} else if (qSort === 'price') {
				sortValue = { price: -1 }
			} else if (qSort === '-price') {
				sortValue = { price: 1 }
			} else if (qSort === 'popular') {
				sortValue = { popular: -1 }
			} else if (qSort === '-popular') {
				sortValue = { popular: 1 }
			}

			products = await Product.find({
				categories: {
					$in: [qCategory]
				}
			}).sort(sortValue)
		} else if (qGender && qCategory && qBrand) {
			products = await Product.find({
				categories: {
					$in: [qCategory]
				},
				brand: qBrand,
				gender: {
					$in: [qGender]
				}
			})
		} else if (qGender && qCategory) {
			products = await Product.find({
				categories: {
					$in: [qCategory]
				},
				gender: {
					$in: [qGender]
				}
			})
		} else if (qGender && qBrand) {
			products = await Product.find({
				brand: qBrand,
				gender: {
					$in: [qGender]
				}
			})
		} else if (qCategory && qBrand) {
			products = await Product.find({
				categories: {
					$in: [qCategory]
				},
				brand: qBrand
			})
		} else if (qSort) {
			let sortValue
			if (qSort === 'new') {
				sortValue = { createdAt: -1 }
			} else if (qSort === '-new') {
				sortValue = { createdAt: 1 }
			} else if (qSort === 'price') {
				sortValue = { price: -1 }
			} else if (qSort === '-price') {
				sortValue = { price: 1 }
			} else if (qSort === 'popular') {
				sortValue = { popular: -1 }
			} else if (qSort === '-popular') {
				sortValue = { popular: 1 }
			}

			products = await Product.find().sort(sortValue)
		} else if (qGender) {
			products = await Product.find({
				gender: {
					$in: [qGender]
				}
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
		} else if (qSearch) {
			products = await Product.find({
				$or: [
					{ title: { $regex: qSearch } },
					{ brand: { $regex: qSearch } },
					{ desc: { $regex: qSearch } },
					{ gender: { $regex: qSearch } },
					{
						categories: {
							$in: [qSearch]
						}
					}
				]
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
