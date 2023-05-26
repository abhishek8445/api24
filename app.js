 import express from 'express'
 import connection from './database/db_connetion.js';
 import router from './router/route.js';
 

  const app = express();
  const PORT = process.env.PORT||2001 ; 
  connection()
  
  app.use(express.json());
  app.use('/user/' , router)


  app.listen(PORT , ()=>{
     console.log(`Server run on http://localhost:${PORT}`);
  })

