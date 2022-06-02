// REQUIREMENTS
const express = require('express')
const router = express.Router()
const path = require('path')
const hbs = require('hbs')
const getContests = require('./utils/getContest')
const app = express();
const port = process.env.PORT || 3020;
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join('__dirname', '../templates/views');
const partialsPath = path.join('__dirname', '../templates/partials');


//SWagger Dependencies
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Creating a CRUD Rsponses
router.get('/howto', (req, res,) => {
  // res.json({ name: 'Vivek' })
  res.render('howto');       //---> For rendering how to page
});

router.post('/about', (req, res,) => {
  // res.json({ name: 'Vivek' })
  res.render('about');       // --> For rendering about page
});

router.put('/index', (req, res,) => {
  // res.json({ name: 'Vivek' })
  res.render('index');        //--> For rendering index page
});

router.delete('/404', (req, res,) => {
  // res.json({ name: 'Vivek' })
  res.render('404');          //--> For rendering 404 page
});

// Initializing Prefix to all nodes
app.use('/api', router);


// --> Setting up the query string to take in user handles and provide the list of contests
app.get('/contests', (req, res) => {
  if (!req.query.user1 || !req.query.user2) {
    return res.send({
      error: 'You must provide user handles!'
    });
  }

  let search = "";
  if (!req.query.search)
    search = "0";
  else
    search = req.query.search;

  getContests(req.query.user1, req.query.user2, search, (error, data) => {
    if (error) {
      return res.send({
        error
      });
    }

    res.send([data[0], data[1], data[2], data[3], data[4]]);
  });
});

// --> Setting up the get requests for pages
app.get, ('/', (req, res) => {
  res.render('index');
});

app.get('*', (req, res) => {
  res.render('404');
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

