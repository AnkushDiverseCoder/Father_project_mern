import { AccountingEntry } from "../models/AccountingEntryModel.js";
import { CustomerHead } from "../models/CustomerHeadModel.js";

export const AccountingEntryApi = async (req, res, next) => {
  try {
    const {
      customerName,
      monthComplianceDate,
      monthComplianceAmount,
      epfAmount,
      esicAmount,
      otherDebit,
      professionalFees,
      remarks,
      sendEmailCheck
    } = req.body;

    const customerHeadData = await CustomerHead.findOne({ customerName });
    
    
    const duplicateFind = await AccountingEntry.findOne({ customerName,monthComplianceDate,monthComplianceAmount,epfAmount,esicAmount });
    if(!duplicateFind){
      await AccountingEntry.create({
        customerName,
        monthComplianceDate,
        monthComplianceAmount,
        epfAmount,
        esicAmount,
        otherDebit,
        remarks,
        email: customerHeadData.email ? customerHeadData.email : "",
        contactNumber: customerHeadData.contactNumber,
        professionalFees,
        representativeName: customerHeadData.representativeName,
      });
    }else{
      return res.status(200).json({ status: false, msg: "Duplicate Entry Found In same Customer Name , Verify Before Submit " });
    }

    if(sendEmailCheck){
    res.status(200).json({
      status: true,
      msg: "Email Send Successfully",
    })
  }else{
    res.status(200).json({
      status: true,
      msg: "Entry Done Successfully",
    })
  }
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
};

// get all customerName
export const getEmail = async (req, res, next) => {
  const customerHeadData = await CustomerHead.findOne({ customerName:req.body.customerName });
  res.status(200).json({
    email: customerHeadData?.email ? customerHeadData.email : "",
  });
};

