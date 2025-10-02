const { initDB } = require("../db");

// Cadastro
async function signup(req, res) {
  const { name, email, password } = req.body;
  try {
    const conn = await initDB();

    // Exemplo simples: insere usuário
    await conn.execute(
      `INSERT INTO users (id, name, email, password, balance) 
       VALUES (users_seq.NEXTVAL, :name, :email, :password, 1000)`,
      [name, email, password],
      { autoCommit: true }
    );

    res.json({ success: true, message: "Usuário cadastrado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Login
async function login(req, res) {
  const { email, password } = req.body;
  try {
    const conn = await initDB();

    const result = await conn.execute(
      `SELECT id, name, email, balance FROM users 
       WHERE email = :email AND password = :password`,
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const [id, name, emailRes, balance] = result.rows[0];
    res.json({ id, name, email: emailRes, balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { signup, login };
