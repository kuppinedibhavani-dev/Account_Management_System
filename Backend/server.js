import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";



const app=express()

app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/account",accountRoutes)

app.get("/", (req, res) => {
  res.send("Account Management System API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});