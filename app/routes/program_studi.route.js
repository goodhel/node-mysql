const express = require('express');
const router = express.Router();
const programStudi = require('../services/program_studi');

/** GET All Program Studi
 * Url : http://localhost:3000/program_studi
 * Method : GET
 */
router.get('/', async function(req, res, next) {
    try {
        res.status(200).json(await programStudi.getAll());
    } catch(err) {
        console.error(`Error while getting program studi `, err.message);
        res.status(500).send({status: "Error",message: err.message});
        // next(err);
    }
});

/** Insert Program Studi
 * Url : http://localhost:3000/program_studi
 * Method : POST
 */
router.post('/', async function(req, res, next) {
    try {
        res.status(200).json(await programStudi.create(req.body));
    } catch(err) {
        console.error(`Error while creating program studi `, err.message);
        res.status(500).send({status: "Error",message: err.message});
    }
});

/** Update Program Studi
 * Url : http://localhost:3000/program_studi/:kode
 * Method : PATCH
 */
 router.patch('/:kode', async function(req, res, next) {
    try {
        res.status(200).json(await programStudi.update(req.params.kode, req.body));
    } catch(err) {
        console.error(`Error while creating program studi `, err.message);
        res.status(500).send({status: "Error",message: err.message});
    }
});


/** Delete Program Studi
 * Url : http://localhost:3000/program_studi?kode=
 * Method : DELETE
 */
router.delete('/', async function(req,res, next) {
    try {
        res.status(200).json(await programStudi.remove(req.query.kode));
    } catch(err) {
        console.error(`Error while creating program studi `, err.message);
        res.status(500).send({status: "Error",message: err.message});
    }
});


module.exports = router;