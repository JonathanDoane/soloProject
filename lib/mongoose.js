import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to the database");
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGODB_URI;
    return mongoose.connect(uri)
      .then(() => {
        console.log("Connected to the database");
      })
      .catch((error) => {
        console.log("Failed to connect to the database:", error);
      });
  }
}