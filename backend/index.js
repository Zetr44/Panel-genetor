const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PTERO_URL = process.env.PTERO_URL;
const PTERO_KEY = process.env.PTERO_KEY;

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${PTERO_KEY}`
};

// 🔹 Endpoint buat akun
app.post("/create-user", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const response = await fetch(`${PTERO_URL}/api/application/users`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: "User",
        last_name: "Panel",
        password: password
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Endpoint buat server
app.post("/create-server", async (req, res) => {
  const { userId, serverName } = req.body;
  try {
    const response = await fetch(`${PTERO_URL}/api/application/servers`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: serverName,
        user: userId,
        egg: 15,
        docker_image: "ghcr.io/pterodactyl/yolks:nodejs_18",
        startup: "node server.js",
        limits: { memory: 512, disk: 5000, cpu: 100 },
        feature_limits: { databases: 1, allocations: 1, backups: 1 }
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("API Running on port 3000"));