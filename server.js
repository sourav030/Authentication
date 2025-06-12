const express=require('express');
const cors=require('cors')
const app=express();
const route=require("./route/AuthRoute");
const connection=require("./DataBase/dbConnection")
require('dotenv').config({ path: 'config.env' });

app.use(express.json());
app.use(cors())
app.use("/api/v1",route)
PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`app listen of ${PORT}`)
    connection()
})