import { CustomerHead } from "../models/CustomerHeadModel.js";
import { NewDsc } from "../models/DscModel.js";

export const NewDscApi = async (req, res, next) => {
  try {
    
      await NewDsc.create(req.body);
      res
        .status(200)
        .json({ status: true, msg: "NewDscApi Created successfully" });
    
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
};

export const ExistingDscApi = async (req, res, next) => {
  try {
  
      const findUser = await CustomerHead.findOne({ customerName:req.body.customerName });
      const contact = findUser.contactNumber
      console.log(contact)
      await NewDsc.create({
        ...req.body,
        contactNumber:contact
      });
      res
        .status(200)
        .json({ status: true, msg: "NewDscApi Created successfully" });
    
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
};

// get all NewDscData
export const allNewDscData = async (req, res, next) => {
  try {
    const NewDscData = await NewDsc.find({});
    res.json({ status: true, msg: NewDscData });
  } catch (error) {
    res.json({ status: true, msg: error.message });
  }
};

// delete customerData
export const DeleteNewDscData = async (req, res, next) => {
  try {
    await NewDsc.findByIdAndDelete(req.params.id);
    res.json({ status: true, msg: "deleted Successfully" });
  } catch (error) {
    res.json({ status: true, msg: error.message });
  }
};
