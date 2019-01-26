const express = require('express');
const mongoClient = require('mongodb').MongoClient; // object destructuring as a new standard


const adminRouter = express.Router();
const debug = require('debug')('app:adminRoutes'); // passing the app as parameter

let books = [{
  isbn: '9781593275846',
  title: 'ELoquent JavaScript, Second Edition',
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
  title: 'GIT Pocket Guide',
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
  title: 'LEarning JavaScript Design Patterns',
  subtitle: 'A JavaScript and jQuery Developer\'s Guide',
  author: 'Addy Osmani',
  published: '2012-07-01T00:00:00.000Z',
  publisher: 'O\'Reilly Media\'',
  pages: 254,
  description: 'With Learning JavaScript Design Patterns, you\'ll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.',
  website: 'http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/',
},
];


function adRouter(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      let client;
      const url = 'mongodb://localhost:27017';
      // Database Name
      const dbName = 'bookLibrary';

      // IFFY ((){}())
      (async function mongo() {
        try {
          client = await mongoClient.connect(url);
          debug('------connected to mongodb');
          const dbC = client.db(dbName);
          // res.send('----inserting books');
          const col = await dbC.collection('books').insertMany(books);
          const booksCol = col.find().toArray();
          // res.json(response);
          // res.send('---inserted books');

          res.render(
            'bookListView', {
              nav,
              title: 'My Book Library',
              books: booksCol,
            },
          );
        } catch (error) {
          debug('error connecting to mongodb ', error);
          debug(error.stack);
        }
        client.close();
      }());
      // debug(res);
    });
  return adminRouter;
}
module.exports = adRouter;
