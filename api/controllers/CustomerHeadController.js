import { CustomerHead } from "../models/CustomerHeadModel.js"

export const CustomerHeadApi = async(req,res, next)=>{
    try {
        const { customerName, contactNumber, professionalFees, date , epfNumber,representativeName ,esicNumber,email  } = req.body;
        await CustomerHead.create({
            customerName,
            epfNumber,
            esicNumber,
            contactNumber,
            date,
            professionalFees,
            email,
            representativeName
          })
          res.status(200).json({ status: true , msg: "CustomerHead Created successfully" })

        } catch (error) {
            res.json({ status: false , msg: "Customer Name already used" });
     }
}

// get all customerName
export const allCustomerName = async(req,res, next)=>{
    try {
        const customerName= await CustomerHead.aggregate([
          {
            $group:{_id: "$customerName" }
          }
        ])
        res.json({ status: true , msg: customerName});
        } catch (error) {
            res.json({ status: true , msg: error.message });
     }
}