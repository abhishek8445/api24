import { createUser } from "../services/crudService.js"


const UserRegistraion = async (req, res) => {
   try {
      await createUser(req.body);

      res.json({ status: true, message: "User Register Successfully" })
   }
   catch (err) {
      res.json({ status: false, error: err.keyValue, message: err.message })
   }
}




export default UserRegistraion












