import dotenv from "dotenv";
import { initDb } from "src/initDb";
import { initRoutes } from "src/initRoutes";

async function init() {
  try {
    dotenv.config();

    if (!process.env.PORT) {
      throw new Error("PORT is missing!");
    }

    const db = await initDb();

    initRoutes(db);
  } catch (err) {
    console.log(err);
  }
}

init();
