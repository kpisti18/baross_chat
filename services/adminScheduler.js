const db = require('../models/db');

const assignRandomAdmin = async () => {
    try {
        console.log('🔄 Új admin kiválasztása folyamatban...');

        await db.query('UPDATE users SET is_admin = 0');

        const [users] = await db.query('SELECT user_id FROM users ORDER BY RAND() LIMIT 1');

        if (users.length === 0) {
            console.log('⚠️ Nincs elérhető felhasználó az adatbázisban.');
            return;
        }

        const randomUserId = users[0].user_id;

        await db.query('UPDATE users SET is_admin = 1 WHERE user_id = ?', [randomUserId]);
        console.log(`✅ Felhasználó ${randomUserId} most admin lett!`);

        setTimeout(async () => {
            await db.query('UPDATE users SET is_admin = 0 WHERE user_id = ?', [randomUserId]);
            console.log(`❌ Felhasználó ${randomUserId} admin jogai visszavonva.`);
        }, 60000);

    } catch (err) {
        console.error('❌ Hiba történt:', err);
    }
};

setInterval(assignRandomAdmin, 60000);