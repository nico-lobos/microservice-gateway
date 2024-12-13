const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.use("/auth", createProxyMiddleware({ target: "http://localhost:5001", changeOrigin: true }));
app.use("/products", createProxyMiddleware({ 
  target: "http://localhost:5002", 
  changeOrigin: true, 
  logLevel: "debug",
  onError: (err, req, res) => {
    console.error("Error en el proxy:", err.message);
    res.status(500).send("Error en el proxy");
  },
}));
app.use("/orders", createProxyMiddleware({ target: "http://localhost:5003", changeOrigin: true }));

app.listen(process.env.PORT, () => console.log(`API Gateway corriendo en puerto ${process.env.PORT}`));
