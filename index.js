const express = require('express')
const app = express()
const mongoose = require('mongoose')
const multer = require('multer')
const dotenv = require('dotenv')
const cors = require('cors')

const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const brandRoute = require('./routes/brand')
const reviewRoute = require('./routes/review')
const dropRoute = require('./routes/drop')
const requestRoute = require('./routes/request')
const categoryRoute = require('./routes/category')
const { verifyTokenAndAdmin } = require('./routes/verifyToken')

dotenv.config()

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	}
})

const upload = multer({ storage })

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log('DBConnection SuccessFull!'))
	.catch(err => console.log(err))

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/carts', cartRoute)
app.use('/api/orders', orderRoute)
app.use('/api/reviews', reviewRoute)
app.use('/api/drops', dropRoute)
app.use('/api/requests', requestRoute)
app.use('/api/categories', categoryRoute)
app.use('/api/brands', brandRoute)
app.use('/api/products', productRoute)

app.post('/upload', verifyTokenAndAdmin, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`
	})
})

app.listen(process.env.PORT || 5000, () => {
	console.log('Backend server is running!')
})
