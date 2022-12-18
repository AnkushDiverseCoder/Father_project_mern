import { CustomerHead } from "../models/CustomerHeadModel.js"

export const CustomerHeadApi = async(req,res, next)=>{
    try {
        const { customerName, contactNumber, date , epfNumber,representativeName ,esicNumber,email,remarks  } = req.body;
        await CustomerHead.create({
            customerName,
            epfNumber,
            esicNumber,
            contactNumber,
            date,
            email,
            representativeName,
            remarks
          })
          res.status(200).json({ status: true , msg: "CustomerHead Created successfully" })

        } catch (error) {
            res.json({ status: false , msg: error.message });
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
// get one customerData
export const customerData = async(req,res, next)=>{
    try {

        const customerData= await CustomerHead.findOne({customerName:req.params.id})

        res.json({ status: true , msg: customerData });
        } catch (error) {
            res.json({ status: true , msg: error.message });
     }
}

// Update customerData
export const UpdateCustomerData = async(req,res, next)=>{
    try {
        await CustomerHead.findByIdAndUpdate(req.params.id,req.body,{new:true})

        res.json({ status: true , msg: "Updated SuccessFully" });
        
      } catch (error) {
            res.json({ status: true , msg: error.message });
     }
}

// delete customerData
export const DeleteCustomerData = async(req,res, next)=>{
    try {

        await CustomerHead.findByIdAndDelete(req.params.id)
        res.json({ status: true , msg: "deleted Successfully" })

        } catch (error) {
            res.json({ status: true , msg: error.message });
     }
}