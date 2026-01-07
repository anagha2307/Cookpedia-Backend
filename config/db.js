const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTION;
mongoose.connect(connectionString).then(res => {
    console.log('Database connection successful');   
}).catch(err =>{
    console.log('Database connection failed');   
    console.log(err);  
})
