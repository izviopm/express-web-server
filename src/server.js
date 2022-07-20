const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { findContact, loadContact, addContact } = require('../utils/contacts');

const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts); // third party middleware
app.use(express.static('public')); // built-in middleware
app.use(express.urlencoded({ extended: true }));

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

// Halaman form tambah data contact
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'Form Tambah Data Contact',
    layout: 'layouts/main-layout',
  });
});

// proses data contact
app.post('/contact', (req, res) => {
  addContact(req.body);
  res.redirect('/contact');
});

// Halaman detail contact
app.get('/contact/:name', (req, res) => {
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
