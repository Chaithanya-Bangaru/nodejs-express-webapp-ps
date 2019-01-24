const express = require('express');
// const app = express();
const bookRouter = express.Router();

const books = [{
  isbn: '9781593275846',
  title: 'Eloquent JavaScript, Second Edition',
  genre: 'Historical Fiction',
  read: false,
  subtitle: 'A Modern Introduction to Programming',
  author: 'Marijn Haverbeke',
  published: '2014-12-14T00:00:00.000Z',
  publisher: 'No Starch Press',
  pages: 472,
  description: 'JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.',
 },
 {
  isbn: '9781449325862',
  title: 'Git Pocket Guide',
  subtitle: 'A Working Introduction',
  author: 'Richard E. Silverman',
  published: '2013-08-02T00:00:00.000Z',
  publisher: 'O\'Reilly Media\'',
  pages: 234,
  description: 'This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git experience.',
  website: 'http://chimera.labs.oreilly.com/books/1230000000561/index.html',
 },
 {
  isbn: '9781449331818',
  title: 'Learning JavaScript Design Patterns',
  subtitle: 'A JavaScript and jQuery Developer\'s Guide',
  author: 'Addy Osmani',
  published: '2012-07-01T00:00:00.000Z',
  publisher: 'O\'Reilly Media\'',
  pages: 254,
  description: 'With Learning JavaScript Design Patterns, you\'ll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.',
  website: 'http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/',
 }
];

bookRouter.route('/')
 .get((req, res) => {
  // res.send('Hello Books.');
  res.render('booksListView', {
   title: 'My Book Library',
   list: ['a', 'b'],
   nav: [{
    name: 'Books',
    link: '/books',
   }, {
    name: 'Authors',
    link: '/authors',
   }],
   books,

  });
 });


bookRouter.route('/:id')
 .get((req, res) => {
  // const id = req.params.id;
  // object destructuring notation means looks for the id param in the object called req.params
  const { id } = req.params;
  res.render('bookView', {
   title: 'My Book Library',
   nav: [{
    name: 'Books',
    link: '/books',
   }, {
    name: 'Authors',
    link: '/authors',
   }],
   book: books[id],

  });
 });

module.exports = bookRouter;