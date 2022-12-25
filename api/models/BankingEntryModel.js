import mongoose from "mongoose"

const BankingEntrySchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true
  },
  creditAmount: {
    type: Number,
    required: true
  },
  narration:{
    type: String,
    required: true
  }
  
}, { timestamps: true })

export const BankingEntry = mongoose.model('BankingEntry', BankingEntrySchema)