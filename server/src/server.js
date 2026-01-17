import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

connectDB()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`App listening on port http://localhost:${env.port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
    process.exit(1);
  });
