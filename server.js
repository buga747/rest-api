const mongoose = require("mongoose");

require("dotenv").config();
// C7UvPFUUlLVycqFl
const app = require("./app");
const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});

mongoose
  .connect(DB_HOST)
  .then(() => console.log(`Database connected successfully: ${PORT}`))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
