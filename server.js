import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "NodeTest"
});


app.get('/', (req, res) => {
    const sql = "SELECT * FROM app_users";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

app.get('/roles', (req, res) => {
    const sql = "SELECT * FROM app_roles";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching roles:', err);
            return res.status(500).send('Error fetching roles');
        }
        res.json(results);
    });
});

app.post('/add-role', (req, res) => {
    const { roleName } = req.body;

    if (!roleName) {
        return res.status(400).send('Role name is required');
    }

    const query = 'INSERT INTO app_roles (Role) VALUES (?)';
    db.query(query, [roleName], (error, results) => {
        if (error) {
            console.error('Error adding role:', error);
            return res.status(500).send('Error adding role');
        }

        const newRoleQuery = 'SELECT * FROM app_roles WHERE ID = ?';
        db.query(newRoleQuery, [results.insertId], (err, roleResult) => {
            if (err) {
                console.error('Error fetching new role:', err);
                return res.status(500).send('Error fetching new role');
            }
            res.json(roleResult[0]);
        });
    });
});

app.put('/update-role/:id', (req, res) => {
    const userId = req.params.id;
    const newRoleId = req.body.RoleId;

    const query = 'UPDATE app_users SET Role = ? WHERE ID = ?';
    db.query(query, [newRoleId, userId], (error, results) => {
        if (error) {
            console.error('Error updating role:', error);
            return res.status(500).send('Error updating role');
        }
        res.send('Role updated successfully');
    });
});

app.get('/campuses', (req, res) => {
    const sql = "SELECT Campus, Image FROM app_campuses";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving data from database' });
        }

        const campuses = results.map(row => ({
            name: row.Campus,
            imageUrl: (row.Image && row.Image !== 'None') ? row.Image : 'https://via.placeholder.com/600x300?text=No+Image'
        }));

        res.json(campuses);
    });
});

app.get('/campuses/:name', (req, res) => {
    const campusName = req.params.name;
    const sql = "SELECT * FROM app_campuses WHERE Campus = ?";
    db.query(sql, [campusName], (err, result) => {
        if (err) return res.status(500).json({ message: "Error fetching campus details" });
        if (result.length === 0) return res.status(404).json({ message: "Campus not found" });
        return res.json(result[0]);
    });
});

app.post('/app_users', (req, res) => {
    const sql = "INSERT INTO app_users (Name, Email) VALUES (?)";
    const values = [
        req.body.Name,
        req.body.Email
    ];
    db.query(sql, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM app_users WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = 'UPDATE app_users SET `Name`=?, `Email`=? WHERE ID=?';
    const id = req.params.id;
    db.query(sql, [req.body.Name, req.body.Email, id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM app_users WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
    });
});

app.listen(8081, () => {
    console.log("listening 8081");
});
