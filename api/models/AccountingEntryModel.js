import mongoose from "mongoose"

const AccountingEntrySchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  representativeName:{
    type: String,
    required: true
  },
  contactNumber:{
    type: Number,
    required: true
  },
  email: {
    type: String,
  },
  monthComplianceDate: {
    type: Date,
  },
  monthComplianceAmount: {
    type: Number,
  },
  epfAmount: {
    type: Number,
    required: true
  },
  esicAmount: {
    type: Number,
    required: true
  },
  otherDebit:{
    type: Number,
    required: true
  },
  professionalFees:{
    type: Number,
    required: true
  },
  remarks: {
    type: String,
    required: true
  },
  
}, { timestamps: true })

export const AccountingEntry = mongoose.model('AccountingEntry', AccountingEntrySchema)