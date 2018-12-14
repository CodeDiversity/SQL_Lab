const express = require('express');
const server = express();

server.use(express.json());
const PORT = 5000;

server.post('/crayons', (req,res) => {

});

server.get('/crayons', (req,res) => {

});

server.get('/crayons:id', (req,res) => {

});

server.delete('/crayons:id', (req, res) => {

});

server.put('/crayons:id',(req,res) => {

});

server.listen(port,console.log(`server is listening on port ${port}`))