import { MongoClient } from "mongodb";

const DATABASE_NAME = "user-api";

export async function initDb() {
  const url = process.env.MONGO_URL;

  if (!url) {
    throw new Error("MONGO_URL is missing!");
  }

  const mongoClient = new MongoClient(url!);

  await mongoClient.connect();

  const db = mongoClient.db(DATABASE_NAME);

  return db;
}
