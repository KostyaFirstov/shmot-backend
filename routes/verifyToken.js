const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization

	if (authHeader) {
		const token = authHeader.split(' ')[1]
		jwt.verify(token, process.env.JWT_SEC, (err, user) => {
			if (err) {
				res.status(403).json('Token is not valid!')
			} else {
				req.user = user
				next()
			}
		})
	} else {
		return res.status(401).json('Доступ запрещён')
	}
}

const verifyTokenAndAuth = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next()
		} else {
			res.status(403).json('Доступ запрещён')
		}
	})
}

const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next()
		} else {
			res.status(403).json('Доступ запрещён')
		}
	})
}

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin }
