const Request = require('../models/Request')
const {
	verifyToken,
	verifyTokenAndAuth,
	verifyTokenAndAdmin
} = require('./verifyToken')

const router = require('express').Router()

// CREATE

router.post('/', async (req, res) => {
	try {
		const findRequest = await Request.find({ text: req.body.text })

		let newRequest

		if (findRequest.length === 0) {
			newRequest = new Request(req.body)
			const savedRequest = await newRequest.save()
			res.status(200).json(savedRequest)
		} else {
			newRequest = await Request.findOneAndUpdate(
				{ text: req.body.text },
				{
					$inc: { popular: 1 }
				},
				{
					returnDocument: 'after'
				}
			)

			res.status(200).json(newRequest)
		}
	} catch (error) {
		res.status(500).json(error)
	}
})

// UPDATE

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedRequest = await Request.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		)

		res.status(200).json(updatedRequest)
	} catch (error) {
		res.status(500).json(error)
	}
})

// DELETE

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		await Request.findByIdAndDelete(req.params.id)
		res.status(200).json('Запрос был удалён...')
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET REQUEST

router.get('/find/:id', async (req, res) => {
	try {
		const postId = req.params.id

		const request = await Request.findOneAndUpdate(
			{ _id: postId },
			{
				$inc: { popular: 1 }
			},
			{
				returnDocument: 'after'
			}
		)
		res.status(200).json(request)
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET ALL REQUEST

router.get('/', async (req, res) => {
	const qAll = req.query.all
	try {
		let request

		if (qAll) {
			request = await Request.find().sort({ popular: -1 })
		} else {
			request = await Request.find({ isApproved: true })
				.sort({ popular: -1 })
				.limit(4)
		}

		res.status(200).json(request)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router
