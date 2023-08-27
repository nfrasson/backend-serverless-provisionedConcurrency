import mongoose from "mongoose";

function getMongoDbUrl() {
  let url = process.env.MONGODB_URI;

  url = url.replace(
    "<AWS_ACCESS_KEY>",
    encodeURIComponent(process.env.AWS_ACCESS_KEY_ID)
  );
  url = url.replace(
    "<AWS_SECRET_KEY>",
    encodeURIComponent(process.env.AWS_SECRET_ACCESS_KEY)
  );
  url = url.replace(
    "<SESSION_TOKEN>",
    encodeURIComponent(process.env.AWS_SESSION_TOKEN)
  );

  return url;
}

function registerModel(schema) {
  if (!schema) return;
  return mongoose.model(schema.name, schema.schema);
}

export default async (schema = null) => {
  if (mongoose.connection.readyState !== 1) {
    console.log("Creating new connection");

    const mongodbURI = getMongoDbUrl();

    console.time("DB Connection time");
    await mongoose.connect(mongodbURI, {
      dbName: "Learning",
      autoIndex: false,
      minPoolSize: 1,
      maxPoolSize: 5,
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.timeEnd("DB Connection time");
  }

  return registerModel(schema);
};
