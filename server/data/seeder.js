import dotenv from 'dotenv'
import mongoose from 'mongoose'
import KPI from '../models/KPI.js'
import { kpis } from './data.js'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config({ path: '../.env' })

mongoose
  .connect(process.env.MONGO_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(async () => {
    // await mongoose.connection.db.dropDatabase()
    console.log('Database Connected')
    await KPI.insertMany(kpis)
    console.log('Data Imported')
    process.exit(0)
  })
  .catch((error) => {
    console.log('Failed to connect to database', error.message)
    process.exit()
  })
