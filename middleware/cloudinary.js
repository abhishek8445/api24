import cloudinary from "cloudinary"
import dotenv from "dotenv"
dotenv.config()

const UseCloudinary = cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CLIENT_API,
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET
   })
   export default UseCloudinary