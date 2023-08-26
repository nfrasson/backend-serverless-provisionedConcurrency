import mongoose from "mongoose";

function registerModel(schema) {
  if (!schema) return;
  return mongoose.model(schema.name, schema.schema);
}

export default async (schema = null) => {
  if (mongoose.connection.readyState !== 1) {
    console.log("Creating new connection");

    console.time("Connection time");
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Learning",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.timeEnd("Connection time");
  }

  return registerModel(schema);
};
