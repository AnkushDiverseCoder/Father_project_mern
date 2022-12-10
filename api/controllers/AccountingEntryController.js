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
      email: customerHeadData.email ? customerHeadData.email : "",
      contactNumber: customerHeadData.contactNumber,
      professionalFees,
      representativeName: customerHeadData.representativeName,
    });
  
    res
      .status(200)
      .json({
        status: true,
        msg: "AccountingEntry Created successfully,Email Send Successfully",
        email: customerHeadData.email
      });
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
};
