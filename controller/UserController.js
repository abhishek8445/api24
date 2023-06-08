
import { DelteUserDetails, UserDetails, UserGetPagination, LoginService, createUser, getUser, AddressDelete, UserForgotPwd, ResetPwd  ,UploadCloudinary} from "../services/crudService.js";


const UserRegistraion = async (req, res) => {
   try {
      await createUser(req.body);
      res.json({ status: true, message: "User Register Successfully" })
   }
   catch (err) {
      res.json({ status: false, error: err.keyValue, message: err.message })
   }
}

const UserLogin = async (req, res) => {
   const requestData = req.body
   const data = await LoginService(requestData)
   try {
      res.json({ status: true, message: "user login Successfully", data })
   }
   catch (err) {
      res.json({ status: false, error: err.keyValue, message: err.message })
   }
}

const getUserData = async (req, res) => { 
   try {
      const user_id = req.user;
      const UserDetails = await getUser(user_id)
      res.json({ status: true, message: 'Get data successfull', UserDetails })
   }
   catch (err) {
      res.json({ status: false, error: err.keyValue, message: err.message })
   }
}

const DeleteUser = async (req, res) => {
   try {
      const GetUserName = await req.params.username
      await DelteUserDetails(GetUserName)
      res.json({ status: true, message: 'User Deleted Successfully' })
   }
   catch (err) {
      res.json({ status: false, error: err.keyValue, message: err.message })
   }
}

const Pagination = async (req, res) => {
   try {
      const page = req.params.page
      const limit = req.query.limit
      const offset = page * limit - limit
      const Data = await UserGetPagination(offset, limit)
      res.json({ status: true, message: 'User Pagination Successfully ', Data })
   }
   catch (err) {
      res.json({ status: false, error: err.keyValue, message: err.message })
   }
}

const UserAddress = async (req, res) => {
   try {
      const BodyData = req.body
      await UserDetails({ ...BodyData, user_id: req.user })
      res.json({ statue: true, message: "User Details Saved Successfully" })
   }
   catch (err) {
      res.json({ statue: false, error: err.keyValue, message: err.message })
   }
}

const UserAddressDelete = async (req, res) => {
   try {
      const BodyID = req.body
      await AddressDelete(BodyID)
      res.json({ statue: true, message: "Adress Deleted  Successfully" })
   }
   catch (err) {
      res.json({ statue: false, error: err.keyValue, message: err.message })
   }
}

const ForgotPwd = async (req, res) => {
   try {
      const GetEmailByBody = req.body.email
      const RetutrnPwdToken = await UserForgotPwd(GetEmailByBody);
      res.json({ status: true, message: "Verify User Successfully By Email", RetutrnPwdToken })
   }
   catch (err) {
      res.json({ status: false, error: err.keyValue, message: err.message })
   }
}

const VerifyPwd = async (req, res) => {
   try {
      const SendToken =  req.token.pwd_token
      const SendPwd = req.body
      await ResetPwd({...SendPwd , SendToken})
      res.json({ status: true, message: "Password Reset SuccessFully" })
   }
   catch (err) {
      res.json({ status: false, error: err.keyValue, message: err.message })

   }
}

const UploadProfile = async (req, res) => {
   console.log(req.file);
   try {
      res.json({ status: true, message: "Profile Image Upload Successfully" })
   } 
   catch (err) { 
      res.json({ status: false, error: err.keyValue, message: err.message })
   }
}

const UploadOnline = async (req ,res )=>{
try{
    const FilePath =  req.file.path
   const data =   await UploadCloudinary(FilePath)
   res.json({status:true , message:"Upload Online Successfully",data })
}
catch(err){
   res.json({status:false ,error:err.keyValue , message:err.message})
}
}

export { UserRegistraion, UserLogin, getUserData, DeleteUser, Pagination, UserAddress, UserAddressDelete, ForgotPwd, VerifyPwd, UploadProfile ,UploadOnline };













