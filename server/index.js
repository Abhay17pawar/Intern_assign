const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use("/api", authRoutes); 
app.use("/api", userRoutes); 

pool.connect()
    .then(() => {
        console.log("server connected to postgreSQL! ")
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
