import mongoose from "mongoose";

const NewDscSchema = new mongoose.Schema({
    customerName: {
      type: String,
      // Manual Entry
    },
    panNumber: {
      type: String,

    },
    contactNumber: {
      type: String,

    },
    dateOfGeneration:{
        // active date Manual Entry
        type: String,
    },
    validTillDate:{
        // 2Years
        type: Date,
    },
    amount:{
        type: String,
        required: true,
    },
    receivedAmount:{
        type: String,
        required: true,
    },
    receivedDate:{
        type: Date,
        required: true,
    },
    renewalDate:{
      type: Date,
      required: true,
  },
    closingBalance:{
        type: String,
        required: true,
    },
    remarks:{
        type: Date,
        required: true,
    },

    
  });

export const NewDsc = mongoose.model("NewDsc", NewDscSchema)