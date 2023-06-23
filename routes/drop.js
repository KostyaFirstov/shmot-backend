const Drop = require('../models/Drop')
const {
	verifyToken,
	verifyTokenAndAuth,
	verifyTokenAndAdmin
} = require('./verifyToken')

const router = require('express').Router()

// CREATE

router.post('/', verifyTokenAndAdmin, async (req, res) => {
	const newDrop = new Drop(req.body)

	try {
		const savedDrop = await newDrop.save()
		res.status(200).json(savedDrop)
	} catch (error) {
		res.status(500).json(error)
	}
})

// UPDATE

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedDrop = await Drop.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		)

		res.status(200).json(updatedDrop)
	} catch (error) {
		res.status(500).json(error)
	}
})

// DELETE

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		await Drop.findByIdAndDelete(req.params.id)
		res.status(200).json('Дроп был удалён...')
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET DROP

router.get('/find/:id', async (req, res) => {
	try {
		const postId = req.params.id

		const drop = await Drop.findOneAndUpdate(
			{ _id: postId },
			{
				$inc: { viewsCount: 1 }
			},
			{
				returnDocument: 'after'
			}
		)
		res.status(200).json(drop)
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET ALL DROP

router.get('/', async (req, res) => {
	const qNew = req.query.new

	try {
		let drop

		if (qNew) {
			drop = await Drop.find().sort({ createdAt: -1 })
		} else {
			drop = await Drop.find()
		}

		res.status(200).json(drop)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router
