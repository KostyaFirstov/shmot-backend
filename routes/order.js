const Order = require('../models/Order')
const {
	verifyToken,
	verifyTokenAndAuth,
	verifyTokenAndAdmin
} = require('./verifyToken')

const router = require('express').Router()

// CREATE

router.post('/', verifyToken, async (req, res) => {
	const newOrder = new Order(req.body)

	try {
		const savedOrder = await newOrder.save()
		res.status(200).json(savedOrder)
	} catch (error) {
		res.status(500).json(error)
	}
})

// UPDATE

router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedOrder = await Order.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		)

		res.status(200).json(updatedOrder)
	} catch (error) {
		res.status(500).json(error)
	}
})

// DELETE

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.id)
		res.status(200).json('Заказ был удалён')
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET USER ORDERS

router.get('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		const orders = await Order.find({ userId: req.params.id })

		res.status(200).json(orders)
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET ALL ORDERDS

router.get('/', verifyTokenAndAdmin, async (req, res) => {
	const qNew = req.query.new

	try {
		let orders
		if (qNew) {
			orders = await Order.find().sort({ createdAt: -1 })
		} else {
			orders = await Order.find()
		}
		res.status(200).json(orders)
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET MONTHLY INCOME

router.get('/income', verifyTokenAndAdmin, async (req, res) => {
	const date = new Date()
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

	try {
		const income = await Order.aggregate([
			{ $match: { createdAt: { $gte: lastYear } } },
			{ $project: { month: { $month: '$createdAt' }, sales: '$price' } },
			{
				$group: {
					_id: '$month',
					total: { $sum: '$sales' }
				}
			}
		]).sort({ _id: 1 })

		res.status(200).json(income)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router
