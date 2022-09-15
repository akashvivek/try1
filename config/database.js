const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // // useCreateIndex: true,
      // useNewUrlParser:true,
      // // useCreateIndex:true,
      // useUnifiedTopology:true,
    })
    .then((data) => {
      console.log(`Databe COnnected with server ${data.connection.host}`);
    })
    // .catch((err) => {
    //   console.log(err);
    // }); //as we  have managed catch block by writing unhandled rejection code

};

// mongoURI =  "mongodb+srv://username:password@devconnector.jpokp.mongodb.net/dbname?retryWrites=true&w=majority" 

// mongoose .connect(mongoURI, { useNewUrlParser: true }) .then(() => console.log("MongoDB connected")) .catch((err) => console.log(err));


// const connectDatabase = () => {
//   const uri = "mongodb+srv://admin:Apiero@123@cluster0.iquu5wp.mongodb.net/Apiero?retryWrites=true&w=majority";
//   mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       // useCreateIndex: true,
//     })
//     .then((data) => {
//       console.log(`Databe COnnected with server `);
//     })
//     // .catch((err) => {
//     //   console.log(err);
//     // }); //as we  have managed catch block by writing unhandled rejection code

// };



// const connectDatabase = () => {
// const uri = "mongodb+srv://admin:Apiero@123@cluster0.iquu5wp.mongodb.net/Apiero?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log(`Databe COnnected with serve`);
//   // perform actions on the collection object
//   client.close();
// });}

module.exports = connectDatabase;
