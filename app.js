const express = require('express'); // helps on serving
const chalk = require('chalk'); // log statements coloring
const debug = require('debug')('app');
const morgan = require('morgan'); // logging
const path = require('path'); // to help on relative/absolute paths

const app = express();

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
}];


const bookRouter = express.Router();
// const port = process.env.port || 3000;
const port = process.env.PORT || 3000;

app.listen(port, () => { // Arrow function as per ES Lint
  // console.log('Express app listening on port '+chalk.green('3000'));
  // console.log(`Express app listening on port ${chalk.green('3000')}`);
  debug(`NodeJS Express webapp listening on port ${chalk.green(port)}`);
});
// using middlewares
app.use(morgan('tiny')); // format called combined, tiny etc
app.use(express.static(path.join(__dirname, '/public/'))); // tells where to look for static files
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/'))); // looks for bootstrap css files in the folder
app.use('/js/', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js/'))); // looks for bootstrap js files in the folder
app.use('/js/', express.static(path.join(__dirname, '/node_modules/jquery/dist/'))); // looks for jquery dist files in the folder
app.set('views', './src/views');
// app.set('view engine', 'pug'); // pug templating  language
app.set('view engine', 'ejs'); // ejs templating just like jsp scriptlets

// app.get('/books',(req,res)=>{ res.send('Books page by Ivaan')});
// app.get('/authors',(req,res)=>{ res.send('Authors page by Ivaan')});

bookRouter.route('/')
  .get((req, res) => {
    // res.send('Hello Books.');
    res.render('books', {
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
bookRouter.route('/single')
  .get((req, res) => {
    res.send('Hello Single Book.');
  });

app.use('/books', bookRouter);
app.get('/', (req, res) => {
  // res.send('Hello from Express');
  // res.sendFile(path.join(__dirname, '/views/', '/index.html'));
  // res.render('index'); // render a view called index
  res.render('index', {
    title: 'My Book Library',
    list: ['a', 'b'],
    nav: [{
      name: 'Books',
      link: '/books',
    }, {
      name: 'Authors',
      link: '/authors',
    }],

  }); // render a view called index
});
