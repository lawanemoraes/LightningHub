const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

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

app.post("/api/veiculos", async (req, res) => {
    try {
        const { marca, modelo, placa, ano, tipo, status } = req.body;

        const result = await pool.query(
            `INSERT INTO veiculos (marca, modelo, placa, ano, tipo, status)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [marca, modelo, placa, ano, tipo, status]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Erro ao cadastrar veículo:", error.message);
        res.status(500).json({ erro: "Erro ao cadastrar veículo" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});