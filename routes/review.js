const Review = require('../models/Review')
const {
	verifyToken,
	verifyTokenAndAuth,
	verifyTokenAndAdmin
} = require('./verifyToken')

const router = require('express').Router()

// CREATE

router.post('/', verifyTokenAndAdmin, async (req, res) => {
	const newReview = new Review(req.body)

	try {
		const savedReview = await newReview.save()
		res.status(200).json(savedReview)
	} catch (error) {
		res.status(500).json(error)
	}
})

// UPDATE

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedReview = await Review.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		)

		res.status(200).json(updatedReview)
	} catch (error) {
		res.status(500).json(error)
	}
})

// DELETE

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		await Review.findByIdAndDelete(req.params.id)
		res.status(200).json('Обзор был удалён...')
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET REVIEW

router.get('/:title', async (req, res) => {
	try {
		const postTitle = req.params.title

		const review = await Review.findOneAndUpdate(
			{ title: postTitle },
			{
				$inc: { viewsCount: 1 }
			},
			{
				returnDocument: 'after'
			}
		)

		res.status(200).json(review)
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET ALL REVIEWS

router.get('/', async (req, res) => {
	const qNew = req.query.new
	const qTags = req.query.tags
	const qPopular = req.query.popular

	try {
		let review

		if (qTags) {
			review = await Review.find({ tags: qTags })
		} else if (qNew) {
			review = await Review.find().sort({ createdAt: -1 })
		} else if (qPopular) {
			review = await Review.find().sort({ viewsCount: -1 })
		} else if (qTags && qNew) {
			review = await Review.find({ tags: qTags }).sort({ createdAt: -1 })
		} else {
			review = await Review.find()
		}

		res.status(200).json(review)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router
