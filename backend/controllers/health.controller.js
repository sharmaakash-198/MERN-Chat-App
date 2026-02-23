// backend/controllers/health.controller.js

import mongoose from "mongoose";

export const pingDb = async (req, res) => {
  try {
    // light operation – just checks connection
    await mongoose.connection.db.admin().ping();

    console.log("DB health check passed");

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("DB health check failed:", error.message);
    res.status(500).json({ ok: false, error: "DB not reachable" });
  }
};