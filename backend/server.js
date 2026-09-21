const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(cors());

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("LightningHub API funcionando!");
});

app.get("/api/veiculos", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM veiculos");
        res.json(result.rows);
    } catch (error) {
        console.error("Erro ao buscar veículos:", error.message);
        res.status(500).json({ erro: "Erro ao buscar veículos" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});