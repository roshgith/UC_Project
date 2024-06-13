import express from 'express';
import mysql from 'mysql';
import cors from 'cors';



const app = express()

app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'root',
    database: 'NodeTest'

})

app.get('/', (re, res)=> {
    return res.json("From Backend Sidee");
})

app.get('/user_info', (req, res)=> {
    const sql = "SELECT * FROM UserInfo";
    db.query(sql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.listen(8081, ()=>{
    console.log("listening 8081");
})



