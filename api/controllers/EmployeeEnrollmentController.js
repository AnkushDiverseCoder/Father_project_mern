import { EmployeeEnrollment } from "../models/EmployeeEnrollmentModel.js";

export const createEmployeeEnrollment = async (req, res, next) => {
  try {
    const {
      customerName,
      joiningDate,
      enrollmentDate,
      EmployeeName,
      fatherName,
      esicIpNumber,
      Uan,
      remarks,
    } = req.body;

    const duplicateFind = await EmployeeEnrollment.findOne({
      EmployeeName,
      Uan,
      esicIpNumber,
    });

    if (!duplicateFind) {
      await EmployeeEnrollment.create({
        customerName,
        joiningDate,
        enrollmentDate,
        EmployeeName,
        fatherName,
        esicIpNumber,
        Uan,
        remarks,
      });
    } else {
      return res.status(200).json({
        status: false,
        msg: `Duplicate Entry Found In ${EmployeeName}, Verify Before Submit `,
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


// IndividualReport
export const IndividualReportController = async (req, res) => {
  try {
    const data = await EmployeeEnrollment.find({
      customerName: req.body.customerName,
    });

    res.status(200).json({ status: true, msg: data});
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
};

// monthlyReport
export const monthlyReportController = async (req, res) => {
  try {
    const data = await EmployeeEnrollment.find({
      enrollmentDate: {
        $gte: new Date(req.body.startDateFormated),
        $lte: new Date(req.body.endDateFormated),
      },
    });
  
    res.status(200).json({ status: true, msg: data});
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
};

// remove Entry
export const removeEntry = async (req, res, next) => {
  try {
    await EmployeeEnrollment.findByIdAndDelete(req.params.id).then(
      res.status(200).json({ status: true, msg: "deleted Successfully" })
    );
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
};