const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/travendus";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = await initData.data.map((obj)=>({...obj, owner: "652ea4e63d77180db1a46c12"}));
  initData.data = await initData.data.map((e)=> ({...e, category: "Rooms"}));
  await Listing.insertMany(initData.data);
  console.log(initData);
  console.log("data was initialized");
};

initDB();