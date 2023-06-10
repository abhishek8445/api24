import { UserModel } from "../../model/UserSchema.js";

const  VerifyMail = async (req, res) => {
    const user = await UserModel.findOne({_id:req.params.id})
    if(!user){                                         
      res.json({status:false , message:"Invalid link"} )
    }
else{
    const Verify  =   await UserModel.updateOne({_id:req.params.id },{isVerified:true});
    if(Verify.modifiedCount == 0){
        res.json({status:false ,  message:"User already Verified "})
    }
    else{
        res.json({status:true , message:" User Verified  Succesfully"})
    }
}
}


export default VerifyMail ;
