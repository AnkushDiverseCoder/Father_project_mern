import { AccountingEntry } from "../models/AccountingEntryModel.js";
import { BankingEntry } from "../models/BankingEntryModel.js";

// monthlyReport
export const CustomerReportController = async (req, res) => {
  try {
    const data = await AccountingEntry.aggregate([
      {
        $match: {
          monthComplianceDate: {
            $gte: new Date(req.body.startDateFormated),
            $lte: new Date(req.body.endDateFormated),
          },
        },
      },
      {
        $group: {
          _id: "$customerName",
          AmountCreditedTotal: { $sum: {$toInt : "$monthComplianceAmount"} },
          epfAmount: { $sum: "$epfAmount" },
          esicAmount: { $sum: "$esicAmount" },
          otherDebit: { $sum: "$otherDebit" },
          professionalFees: { $sum: "$professionalFees" },
        },
      },
    ]);
    const TotalData = await AccountingEntry.aggregate([
      {
        $match: {
          monthComplianceDate: {
            $gte: new Date(req.body.startDateFormated),
            $lte: new Date(req.body.endDateFormated),
          },
        },
      },
      {
        $group: {
          _id: { $sum: 1 },
          AmountCreditedTotal: { $sum: {$toInt : "$monthComplianceAmount"} },
          epfTotal: { $sum: "$epfAmount" },
          esicTotal: { $sum: "$esicAmount" },
          otherTotal: { $sum: "$otherDebit" },
          professionalFeesTotal: { $sum: "$professionalFees" },
        },
      },
    ]);

    res.status(200).json({ status: true, msg: data , TotalData: TotalData});
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
};

// monthlyReport
export const monthlyReportController = async (req, res) => {
  try {
    const data = await AccountingEntry.find({
      monthComplianceDate: {
        $gte: new Date(req.body.startDateFormated),
        $lte: new Date(req.body.endDateFormated),
      },
    });
    const TotalData = await AccountingEntry.aggregate([
      {
        $match: {
          monthComplianceDate: {
            $gte: new Date(req.body.startDateFormated),
            $lte: new Date(req.body.endDateFormated),
          },
        },
      },
      {
        $group: {
          _id: { $sum: 1 },
          AmountCreditedTotal: { $sum: {$toInt : "$monthComplianceAmount"} },
          epfTotal: { $sum: "$epfAmount" },
          esicTotal: { $sum: "$esicAmount" },
          otherTotal: { $sum: "$otherDebit" },
          professionalFeesTotal: { $sum: "$professionalFees" },
        },
      },
    ]);

    res.status(200).json({ status: true, msg: data , TotalData: TotalData});
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
};

// IndividualReport
export const IndividualReportController = async (req, res) => {
  try {
    const data = await AccountingEntry.find({
      customerName: req.body.customerName,
    });

    const TotalData = await AccountingEntry.aggregate([
        {
          $match: {customerName: req.body.customerName}
        },
        {
          $group: {
            _id: { $sum: 1 },
            AmountCreditedTotal: { $sum:{$toInt : "$monthComplianceAmount"} },
            epfTotal: { $sum: "$epfAmount" },
            esicTotal: { $sum: "$esicAmount" },
            otherTotal: { $sum: "$otherDebit" },
            professionalFeesTotal: { $sum: "$professionalFees" },
          },
        },
      ]);
    

    res.status(200).json({ status: true, msg: data ,TotalData});
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
};

// BankingReport
export const BankingReportController = async (req, res) => {
  try {
    const data = await BankingEntry.find({
      date: {
        $gte: new Date(req.body.startDateFormated),
        $lte: new Date(req.body.endDateFormated),
      },
    });
    const TotalData = await BankingEntry.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(req.body.startDateFormated),
            $lte: new Date(req.body.endDateFormated),
          },
        },
      },
      {
        $group: {
          _id: { $sum: 1 },
          AmountCreditedTotal: { $sum: {$toInt : "$creditAmount"} },
        },
      },
    ]);

    res.status(200).json({ status: true, msg: data , TotalData: TotalData});
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
};

// remove Entry
export const removeEntry = async (req, res, next) => {
  try {
    await AccountingEntry.findByIdAndDelete(req.params.id).then(
      res.status(200).json({ status: true, msg: "deleted Successfully" })
    );
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
};
// remove Entry
export const bankRemoveEntry = async (req, res, next) => {
  try {
    await BankingEntry.findByIdAndDelete(req.params.id).then(
      res.status(200).json({ status: true, msg: "deleted Successfully" })
    );
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
};
