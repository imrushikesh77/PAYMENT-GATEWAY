const app = require("./app.js");
const dotenv = require("dotenv");
dotenv.config({path: "./.env"});
const PORT = process.env.PORT || 4000;
const connectDB = require("./connectDB.js");

connectDB().then(()=>{
    console.log("Database connected");
    app.listen(PORT, ()=>{
        console.log(`Server is listening on port ${PORT}`);
    })
}).catch((err)=>{
    console.log(err);
})



