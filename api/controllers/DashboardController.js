import { AccountingEntry } from "../models/AccountingEntryModel.js";
import { CustomerHead } from "../models/CustomerHeadModel.js";

// Credited Amount Sum
export const CreditTotal = async (req, res, next) => {
  const TotalData = await AccountingEntry.aggregate([
    {
      $group: {
        _id: { $sum: 1 },
        AmountCreditedTotal: { $sum: "$monthComplianceAmount" },
      },
    },
  ]);
  res.status(200).json(...TotalData );
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
                      "$monthComplianceAmount",
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
                  "$monthComplianceAmount",
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
                      "$monthComplianceAmount",
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
                  "$monthComplianceAmount",
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
