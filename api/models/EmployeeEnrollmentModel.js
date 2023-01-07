import mongoose from "mongoose"

const EmployeeEnrollmentSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
},
EmployeeName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  Uan: {
    type: Number,
  },
  esicIpNumber: {
    type: Number,
  },
  joiningDate: {
    type: Date,
    required: true
  },
  enrollmentDate: {
    type: Date,
    required: true
  },
  remarks:{
    type: String,
  }
  
}, { timestamps: true })

export const EmployeeEnrollment = mongoose.model('EmployeeEnrollment', EmployeeEnrollmentSchema)