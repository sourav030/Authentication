const mongoose=require('mongoose');


const connection=()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log('db connection successfull');
    })
    .catch((err)=>{
        console.log('Db connection fail');
    })
}
module.exports=connection;