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
    type: String,
  },
  contactNumber: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  email: {
    type: String,
  },
  representativeName:{
    type: String,
    required: true
  },
  remarks:{
    type: String,
  },
  epfUserId:{
    type: String,
  },
  esiUserId:{
    type: String,
  },
  lwfUserId:{
    type: String,
  },
  gstUserId:{
    type: String,
  },
  shramSuvidaUserId:{
    type: String,
  },
  additionalUserId:{
    type: String,
  },
  epfPassword:{
    type: String,
  },
  esiPassword:{
    type: String,
  },
  lwfPassword:{
    type: String,
  },
  gstPassword:{
    type: String,
  },
  shramSuvidaPassword:{
    type: String,
  },
  additionalPassword:{
    type: String,
  }
  
}, { timestamps: true })

export const CustomerHead = mongoose.model('CustomerHead', CustomerHeadSchema)