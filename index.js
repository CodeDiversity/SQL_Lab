const express = require('express');
const server = express();
const knex = require('knex');
const dbConfig = (require('./knexfile'))
server.use(express.json());
const port = 5000;
const db = knex(dbConfig.development);

server.post('/crayons', (req, res) => {
  const crayon = req.body;
  db('crayons').insert(crayon)
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch( err => {res.status(500).json({ err: 'failed to insert crayon' })});
  // INSERT INTO crayons (color,percent_used) VALUES('red', .9)
});

server.get('/crayons', (req, res) => {
  db('crayons')
    .then(rows => {
      res.json(rows)
    })
    .catch(err => res.status(500).json({ err: "failed to get crayons" }))

});

server.get('/crayons/:id', (req, res) => {
  const { id } = req.params;
  db('crayons').where('id', id)
    .then(rows => {
      res.json(rows)
    })
    .catch(err => {
      res.status(500).json({ err: "error getting your crayon" })
    })
});

server.delete('/crayons/:id', (req, res) => {
  const { id } = req.params;
  db('crayons')
    .where('id', id)
    .del()
    .then(count => {
      res.json(count)
      .catch(err => {
        res.status(500).json({err: 'cannot delete that crayon'})
      })
    })
});

server.put('/crayons/:id', (req, res) => {
  const { id } = req.params;
  const crayon = req.body;
  db('crayons').where('id', id).update(crayon)
    .then(rowCount => {
      res.status(200).json(rowCount)
    })
    .catch(err => {res.status(500).json({ err: "trouble updating you're crayon" })})
});

server.listen(port, console.log(`server is listening on port ${port}`))