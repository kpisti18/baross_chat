const db = require('../models/db');

const getAllMessages = async (req, res) => {
    try {
        const [messages] = await db.query('SELECT * FROM messages');
        return res.status(200).json(messages);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Adatbázis hiba' });
    }
};

const sendMessage = async (req, res) => {
    const { user_id } = req.params;
    const { message } = req.body;
    console.log(user_id, message);
    
    if (!message) {
        return res.status(400).json({ error: 'Az üzenet nem lehet üres' });
    }

    try {
        const [result] = await db.query('INSERT INTO messages (message_id, user_id, message) VALUES (NULL, ?, ?)', [user_id, message]);
        return res.status(201).json({ message: 'Üzenet sikeresen elküldve', message_id: result.insertId });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Adatbázis hiba' });
    }
};

const deleteMessage = async (req, res) => {
    const { user_id, message_id } = req.params;

    try {
        const [adminCheck] = await db.query('SELECT is_admin FROM users WHERE user_id = ?', [user_id]);
        if (!adminCheck.length || !adminCheck[0].is_admin) {
            return res.status(403).json({ error: 'Nincs jogosultságod az üzenet törlésére' });
        }

        const [result] = await db.query('DELETE FROM messages WHERE message_id = ?', [message_id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Az üzenet nem található' });
        }

        return res.status(200).json({ message: 'Üzenet sikeresen törölve' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Adatbázis hiba' });
    }
};

const modifyMessage = async (req, res) => {
    const { user_id, message_id } = req.params;
    const { new_message } = req.body;

    if (!new_message) {
        return res.status(400).json({ error: 'Hiányzó új üzenet' });
    }

    try {
        const [adminCheck] = await db.query('SELECT is_admin FROM users WHERE user_id = ?', [user_id]);
        if (!adminCheck.length || !adminCheck[0].is_admin) {
            return res.status(403).json({ error: 'Nincs jogosultságod az üzenet módosítására' });
        }

        const [result] = await db.query('UPDATE messages SET message = ? WHERE message_id = ?', [new_message, message_id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Az üzenet nem található' });
        }

        return res.status(200).json({ message: 'Üzenet sikeresen módosítva' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Adatbázis hiba' });
    }
};

module.exports = { getAllMessages, sendMessage, deleteMessage, modifyMessage };