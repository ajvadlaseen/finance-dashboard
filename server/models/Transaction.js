import mongoose, { Schema } from 'mongoose'
import { loadType } from 'mongoose-currency'

loadType(mongoose)

const TransactionSchema = new Schema(
  {
    buyer: String,
    amount: {
      type: mongoose.Types.Currency,
      currency: 'INR',
      get: (c) => c / 100,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
)

const Transaction = mongoose.model('Transaction', TransactionSchema)

export default Transaction
