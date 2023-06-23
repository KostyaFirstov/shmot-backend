const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

// REGISTER
router.post('/register/', async (req, res) => {
	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: CryptoJS.AES.encrypt(
			req.body.password,
			process.env.PASS_SEC
		).toString()
	})

	try {
		const savedUser = await newUser.save()
		const { password, ...others } = savedUser._doc
		res.status(201).json(others)
	} catch (error) {
		res.status(500).json(error)
	}
})

// LOGIN
router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email })
		if (!user) {
			res.status(401).json('Неправильный логин или пароль')
			return
		}

		const hashedPassword = CryptoJS.AES.decrypt(
			user.password,
			process.env.PASS_SEC
		)
		const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

		if (originalPassword !== req.body.password) {
			res.status(401).json('Неправильный логин или пароль')
			return
		}

		const accessToken = jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin
			},
			process.env.JWT_SEC,
			{ expiresIn: '30d' }
		)

		const { password, ...others } = user._doc

		res.status(200).json({ ...others, accessToken })
	} catch (error) {
		res.status(500).json(error)
	}
})

// AUTH ME

router.post('/me', async (req, res) => {
	try {
		const user = await User.findById(req.userId)

		if (!user) {
			return res.status(404).json({
				message: 'Пользователь не найден'
			})
		}

		const { passwordHash, ...userData } = user._doc

		res.json(userData)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Нет доступа'
		})
	}
})

module.exports = router
