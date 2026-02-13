import mongoose from "mongoose";
import ENVIRONMENT from "./environment.js";


let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}
async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(ENVIRONMENT.MONGO_DB_CONNECTION_STRING).then((mongoose) => {
      return mongoose
    })
  }
  try {
    cached.conn = await cached.promise;
    console.log("Conectado a la base de datos");
  } catch (error) {
    cached.promise = null;
    console.log("Error al conectar a la base de datos", error);
  }
  return cached.conn
}

export default connectDB