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
      remarks,
    } = req.body;

    const customerHeadData = await CustomerHead.findOne({ customerName });

    await AccountingEntry.create({
      customerName,
      monthComplianceDate,
      monthComplianceAmount,
      epfAmount,
      esicAmount,
      otherDebit,
      remarks,
      email: customerHeadData.email,
      contactNumber: customerHeadData.contactNumber,
      professionalFees: customerHeadData.professionalFees,
      representativeName: customerHeadData.representativeName,
    });
  
    res
      .status(200)
      .json({
        status: true,
        msg: "AccountingEntry Created successfully,Whatsapp Send Successfully",
      });
  } catch (error) {
    res.json({ status: true, msg: error.message });
  }
};
