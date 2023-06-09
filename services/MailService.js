
import nodemailer from "nodemailer"
import google from "googleapis"
import dotenv from "dotenv"
dotenv.config()


const SendMail = async (Email, url)=>{
    const MailTransporter =  nodemailer.createTransport({
     service:'gmail',
     auth:{
         user:process.env.USER_NAME ,
         pass:process.env.PASS_WORD 
     }
    
    });

    const MailDetails ={
     from :process.env.USER_NAME,
     to:Email,
     subject:"Test Mail",
     text: "Test a mail send a user by a nodemail ",
     html:`<button> ${url} </button>`
    }

  await  MailTransporter.sendMail(MailDetails), function (err , data ){
     if(err){
       throw  Error ('Email Failed')
     }
     else{
         console.log('data');
     }
    }
 }

 export default SendMail
