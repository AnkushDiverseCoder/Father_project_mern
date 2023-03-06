import { AccountingEntry } from "../models/AccountingEntryModel.js";
import { CustomerHead } from "../models/CustomerHeadModel.js";

// Credited Amount Sum
export const CreditTotal = async (req, res, next) => {
  const TotalData = await AccountingEntry.aggregate([
    {
      $group: {
        _id: { $sum: 1 },
        AmountCreditedTotal: { $sum: {$toInt : "$monthComplianceAmount"} },
      },
    },
  ]);
  res.status(200).json(...TotalData);
};

// Debited Amount Sum
export const TotalDebit = async (req, res, next) => {
  const TotalData = await AccountingEntry.aggregate([
    {
      $group: {
        _id: { $sum: 1 },
        AmountDebitTotal: {
          $sum: {
            $add: [
              "$epfAmount",
              "$esicAmount",
              "$otherDebit",
              "$professionalFees",
            ],
          },
        },
      },
    },
  ]);
  res.status(200).json(...TotalData);
};

//  Excess Amount Sum
export const ExcessAmount = async (req, res, next) => {
  const TotalData = await AccountingEntry.aggregate([
    {
      $group: {
        _id: { $sum: 1 },
        AmountExcessTotal: {
          $sum: {
            $cond: [
              {
                $gte: [
                  {
                    $subtract: [
                      {$toInt : "$monthComplianceAmount"},
                      {
                        $sum: {
                          $add: [
                            "$epfAmount",
                            "$esicAmount",
                            "$otherDebit",
                            "$professionalFees",
                          ],
                        },
                      },
                    ],
                  },
                  0,
                ],
              },
              {
                $subtract: [
                  {$toInt : "$monthComplianceAmount"},
                  {
                    $sum: {
                      $add: [
                        "$epfAmount",
                        "$esicAmount",
                        "$otherDebit",
                        "$professionalFees",
                      ],
                    },
                  },
                ],
              },
              0,
            ],
          },
        },
      },
    },
  ]);

  res.status(200).json(...TotalData);
};
// Short Amount Sum
export const ShortAmount = async (req, res, next) => {
  const TotalData = await AccountingEntry.aggregate([
    {
      $group: {
        _id: { $sum: 1 },
        AmountShortTotal: {
          $sum: {
            $cond: [
              {
                $lt: [
                  {
                    $subtract: [
                      {$toInt : "$monthComplianceAmount"},
                      {
                        $sum: {
                          $add: [
                            "$epfAmount",
                            "$esicAmount",
                            "$otherDebit",
                            "$professionalFees",
                          ],
                        },
                      },
                    ],
                  },
                  0,
                ],
              },
              {
                $subtract: [
                  {$toInt : "$monthComplianceAmount"},
                  {
                    $sum: {
                      $add: [
                        "$epfAmount",
                        "$esicAmount",
                        "$otherDebit",
                        "$professionalFees",
                      ],
                    },
                  },
                ],
              },
              0,
            ],
          },
        },
      },
    },
  ]);
  res.status(200).json(...TotalData);
};
// Compilance = epf + esic  Amount Sum
export const compilanceAmount = async (req, res, next) => {
  const TotalData = await AccountingEntry.aggregate([
    {
      $group: {
        _id: { $sum: 1 },
        TotalCompliance: {
          $sum: {
            $add: ["$epfAmount", "$esicAmount"],
          },
        },
      },
    },
  ]);
  res.status(200).json(...TotalData);
};
// otherDebit  Amount Sum
export const otherDebit = async (req, res, next) => {
  const TotalData = await AccountingEntry.aggregate([
    {
      $group: {
        _id: { $sum: 1 },
        otherDebit: {
          $sum: {
            $add: ["$otherDebit"],
          },
        },
      },
    },
  ]);
  res.status(200).json(...TotalData);
};

// Second Row Data

export const ChartData = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const january = await AccountingEntry.aggregate([
      {
        $match: {
          monthComplianceDate: {
            $gte: new Date("2022-11-1"),
            $lte: new Date("2022-12-25"),
          },
        },
      },
    ]);

    res.status(200).json(january);
  } catch (error) {
    res.status(200).json(error);
  }
};
