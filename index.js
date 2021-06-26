const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const programstudiRouter = require('./app/routes/program_studi.route');
const mahasiswaRouter = require('./app/routes/mahasiswa.route');
const matakuliahRouter = require('./app/routes/mata_kuliah.route');
const krsRouter = require('./app/routes/krs.route');

// parse request of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// simple route
app.get('/', (req, rest) => {
    rest.json({message: "Test Back End Express JS & MySQL"});
});

// routes
app.use('/program_studi', programstudiRouter);
app.use('/mahasiswa', mahasiswaRouter);
app.use('/mata_kuliah', matakuliahRouter);
app.use('/krs', krsRouter);

/* Error handler middleware */
// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     console.error(err.message, err.stack);
//     res.status(statusCode).json({'message': err.message});
  
  
//     return;
// });

// set port, listen for request
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
