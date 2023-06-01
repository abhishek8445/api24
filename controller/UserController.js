
import { DelteUserDetails, LoginService, UserDetails, UserGetPagination, createUser, getUser } from "../services/crudService.js";

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
   const requestData = await req.body
   try {
      const login_access = await LoginService(requestData)
      res.json({ status: true, message: "user login Successfully", login_access })
   }
   catch (err) {
      res.json({ status: false, errkor: err.keyValue, message: err.message })
   }
}

const UserProfile = async (req, res) => {
   try {
      res.json({ status: true, message: 'UserProfile  login Successfully' })
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
      res.json({ statue: true, message: "User Details find Successfully" })
   }
   catch (err) {
      res.json({ statue: false, error: err.keyValue, message: err.message })
   }
}

export { UserRegistraion, UserLogin, getUserData, DeleteUser, Pagination, UserProfile, UserAddress };












