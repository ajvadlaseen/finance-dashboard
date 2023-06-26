import mongoose, { mongo } from 'mongoose'
import { loadType } from 'mongoose-currency'

const Schema = mongoose.Schema
loadType(mongoose)

const monthSchema = new Schema(
  {
    month: String,
    revenue: {
      type: mongoose.Types.Currency,
      currency: 'INR',
      get: (c) => c / 100,
    },
    expenses: {
      type: mongoose.Types.Currency,
      currency: 'INR',
      get: (c) => c / 100,
    },
    operationalExpenses: {
      type: mongoose.Types.Currency,
      currency: 'INR',
      get: (c) => c / 100,
    },
    nonOperattionalExpenses: {
      type: mongoose.Types.Currency,
      currency: 'INR',
      get: (c) => c / 100,
    },
  },
  { toJSON: { getters: true } }
)
const daySchema = new Schema(
  {
    date: String,
    revenue: {
      type: mongoose.Types.Currency,
      currency: 'INR',
      get: (c) => c / 100,
    },
    expenses: {
      type: mongoose.Types.Currency,
      currency: 'INR',
      get: (c) => c / 100,
    },
  },
  { toJSON: { getters: true } }
)

const KPISchema = new Schema(
  {
    totalProfit: {
      type: mongoose.Types.Currency,
      currency: 'INR',
      get: (c) => c / 100,
    },
    totalRevenue: {
      type: mongoose.Types.Currency,
      currency: 'INR',
      get: (c) => c / 100,
    },
    totalExpenses: {
      type: mongoose.Types.Currency,
      currency: 'INR',
      get: (c) => c / 100,
    },
    expensesBycategory: {
      type: Map,
      of: {
        type: mongoose.Types.Currency,
        currency: 'INR',
        get: (c) => c / 100,
      },
    },
    monthlyData: [monthSchema],
    dailyData: [daySchema],
  },
  { timestamps: true, toJSON: { getters: true } }
)

const KPI = mongoose.model('KPI', KPISchema)

export default KPI