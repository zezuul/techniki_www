const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3000;

const db = new sqlite3.Database('database.db');

app.use(express.static('public')); // Folder z plikami statycznymi (CSS, obrazy, itp.)
app.use(express.urlencoded({ extended: true })); // Middleware do analizy danych formularza

app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY, firstName TEXT, lastName TEXT, address TEXT, phone TEXT, email TEXT)");
  });

app.get('/', (req, res) => {
    db.all('SELECT * FROM addresses', (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.render('index.html', { addresses: rows });
      }
    });
  });

  app.post('/add', (req, res) => {
    const { firstName, lastName, address, phone, email } = req.body;
    db.run('INSERT INTO addresses (firstName, lastName, address, phone, email) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, address, phone, email],
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.redirect('/');
        }
      }
    );
  });
  
  app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM addresses WHERE id = ?', [id], (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.render('edit.html', { address: row });
      }
    });
  });
  
  app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, address, phone, email } = req.body;
    db.run('UPDATE addresses SET firstName=?, lastName=?, address=?, phone=?, email=? WHERE id=?',
      [firstName, lastName, address, phone, email, id],
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.redirect('/');
        }
      }
    );
  });
  
  app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM addresses WHERE id = ?', [id], (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect('/');
      }
    });
  });
  