import mongoose from "mongoose"

const CustomerHeadSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    unique: true
  },
  epfNumber: {
    type: String,
  },
  esicNumber: {
    type: Number,
  },
  contactNumber: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  professionalFees: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required:true
  },
  representativeName:{
    type: String,
    required: true
  }
  
}, { timestamps: true })

export const CustomerHead = mongoose.model('CustomerHead', CustomerHeadSchema)