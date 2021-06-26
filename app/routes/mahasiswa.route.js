const express = require('express');
const router = express.Router();
const mahasiswa = require('../services/mahasiswa');

/** GET All Mahasiswa
 * Url : http://localhost:3000/mahasiswa
 * Method : GET
 */
router.get('/', async function(req, res, next) {
    try {
        res.status(200).json(await mahasiswa.getAll());
    } catch(err) {
        console.error(`Error while getting mahasiswa `, err.message);
        res.status(500).send({status: "Error",message: err.message});
        // next(err);
    }
});

/** GET Number Credit Mahasiswa
 * Url : http://localhost:3000/mahasiswa/sks
 * Method : GET
 */
 router.get('/sks', async function(req, res, next) {
    try {
        res.status(200).json(await mahasiswa.listCredit());
    } catch(err) {
        console.error(`Error while getting mahasiswa `, err.message);
        res.status(500).send({status: "Error",message: err.message});
        // next(err);
    }
});

/** Insert Mahasiswa
 * Url : http://localhost:3000/mahasiswa
 * Method : POST
 */
router.post('/', async function(req, res, next) {
    try {
        res.status(200).json(await mahasiswa.create(req.body));
    } catch(err) {
        console.error(`Error while creating mahasiswa `, err.message);
        res.status(500).send({status: "Error",message: err.message});
    }
});

/** Update Mahasiswa
 * Url : http://localhost:3000/mahasiswa/:nim
 * Method : PATCH
 */
 router.patch('/:nim', async function(req, res, next) {
    try {
        res.status(200).json(await mahasiswa.update(req.params.nim, req.body));
    } catch(err) {
        console.error(`Error while creating mahasiswa `, err.message);
        res.status(500).send({status: "Error",message: err.message});
    }
});


/** Delete Mahasiswa
 * Url : http://localhost:3000/mahasiswa?nim=
 * Method : DELETE
 */
router.delete('/', async function(req,res, next) {
    try {
        res.status(200).json(await mahasiswa.remove(req.query.nim));
    } catch(err) {
        console.error(`Error while creating mahasiswa `, err.message);
        res.status(500).send({status: "Error",message: err.message});
    }
});


module.exports = router;