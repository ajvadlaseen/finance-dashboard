import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import kpiRoutes from './routes/kpi.js'
import productRoutes from './routes/product.js'
import transactionRoutes from './routes/transaction.js'

// Config
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined'))
app.use(cors())

app.use('/kpi', kpiRoutes)
app.use('/product', productRoutes)
app.use('/transaction', transactionRoutes)

// Mongoose Config

const PORT = process.env.PORT || 4000

mongoose
  .connect(process.env.MONGO_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(async () => {
    console.log('Database Connected')
    app.listen(PORT, () => console.log('Server started on', PORT))
  })
  .catch((error) => console.log('Failed to connect to database'))
