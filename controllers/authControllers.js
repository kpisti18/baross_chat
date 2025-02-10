const bcrypt = require('bcryptjs');
const db = require('../models/db');

const saltRounds = 10;

const registerOrLogin = async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ error: 'Hibás név vagy jelszó' });
    }

    if (password.length < 4) {
        return res.status(400).json({ error: 'A jelszónak legalább 4 karakternek kell lennie' });
    }

    try {
        const [users] = await db.query('SELECT * FROM users WHERE name = ?', [name]);

        if (users.length > 0) {
            const user = users[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                return res.status(200).json({ message: 'Sikeres bejelentkezés', user_id: user.user_id });
            } else {
                return res.status(401).json({ error: 'Rossz a jelszó' });
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const [result] = await db.query('INSERT INTO users (name, password, is_admin) VALUES (?, ?, 0)', [name, hashedPassword]);

            return res.status(201).json({ message: 'Sikeres regisztráció és bejelentkezés', user_id: result.insertId });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Adatbázis hiba' });
    }
};

module.exports = { registerOrLogin };