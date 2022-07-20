const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { findContact, loadContact } = require('../utils/contacts');

const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts); // third party middleware
app.use(express.static('public')); // built-in middleware

app.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama: 'Izvio Prijaya Mumin',
      email: 'izvioprijaya@gmail.com',
    },
    {
      nama: 'Alif Muhammad Nuha',
      email: 'alif748@gmail.com',
    },
    {
      nama: 'Egan Kusmaya Putra',
      email: 'egn234@gmail.com',
    },
  ];
  res.render('index', {
    layout: 'layouts/main-layout',
    nama: 'Izvio Prijaya Mumin',
    title: 'Halaman Home',
    mahasiswa,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'Halaman About',
  });
});

app.get('/contact', (req, res) => {
  const contacts = loadContact();
  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'Halaman Contact',
    contacts,
  });
});

app.get('/contact/:nama', (req, res) => {
  const contact = findContact(req.params.name);

  res.render('detail', {
    layout: 'layouts/main-layout',
    title: 'Detail Contact',
    contact,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
