import { BankingEntry } from "../models/BankingEntryModel.js";

export const BankingEntryApi = async (req, res, next) => {
  try {
    const { customerName, date, creditAmount, narration } = req.body;

    const duplicateFind = await BankingEntry.findOne({
      customerName,
      date,
      creditAmount,
      narration,
    });

    if (!duplicateFind) {
      await BankingEntry.create({
        customerName,
        date,
        creditAmount,
        narration,
      });
    } else {
      return res
        .status(200)
        .json({
          status: false,
          msg: `Duplicate Entry Found In ${customerName}, Verify Before Submit `,
        });
    }

    res.status(200).json({
      status: true,
      msg: "Entry Done Successfully",
    });
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
};
