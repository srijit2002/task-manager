const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const PORT = process.env.PORT || 8000;
const router=require("./routes/routes");
const connectDatabase=require("./database/mongoose")
require("dotenv").config()
const server = http.createServer(app);


// Middlewares
app.use(cors({origin: "*",}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api/v1",router)


const connectToServerAndDatabase=async()=>{
  try {
    await connectDatabase(process.env.MONGO_URL)
    server.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
    
  } catch (error) {
    console.log(error);
  }
}
// Server listening
connectToServerAndDatabase()