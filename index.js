const express = require("express");
const app = express();
require('dotenv').config();
const main = require("./config/db")
const cookie_parser = require("cookie-parser")
const authRouter = require("./routes/userAuth")
const redisClient = require("./config/redis");
const problemRouter = require("./routes/problemCreator")
 
const PORT = process.env.PORT

app.use(express.json())
app.use(cookie_parser())
app.use("/user", authRouter)
app.use("/problem", problemRouter)

const InitializeConnection = async()=> {
  try {
    await Promise.all([main(),redisClient.connect()])
    console.log("DB Connected");

    app.listen(process.env.PORT, ()=> {
      console.log("Server is Listening at Port : " + process.env.PORT);
      
    })
    
  } catch (error) {
   console.log("Error Occurred: "+error)
  }
}

InitializeConnection();


// main()
// .then(async ()=> {
// app.listen(PORT, () => {
//     console.log("Server Listening at " + PORT);
//   });
// }).catch(err=> console.log("Error Occurred: "+err));


