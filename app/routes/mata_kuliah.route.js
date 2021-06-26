const express = require('express');
const router = express.Router();
const mataKuliah = require('../services/mata_kuliah');

/** GET All Mata Kuliah
 * Url : http://localhost:3000/mata_kuliah
 * Method : GET
 */
router.get('/', async function(req, res, next) {
    try {
        res.status(200).json(await mataKuliah.getAll());
    } catch(err) {
        console.error(`Error while getting mata kuliah `, err.message);
        res.status(500).send({status: "Error",message: err.message});
        // next(err);
    }
});

/** GET List Mata Kuliah pada setiap Program Studi
 * Url : http://localhost:3000/mata_kuliah/prodi
 * Method : GET
 */
 router.get('/prodi', async function(req, res, next) {
    try {
        res.status(200).json(await mataKuliah.listMatkul());
    } catch(err) {
        console.error(`Error while getting list mata kuliah by program studi `, err.message);
        res.status(500).send({status: "Error",message: err.message});
        // next(err);
    }
});

/** GET List Mata Kuliah by Program Studi
 * Url : http://localhost:3000/mata_kuliah/:kode_prodi
 * Method : GET
 */
 router.get('/:kode_prodi', async function(req, res, next) {
    try {
        res.status(200).json(await mataKuliah.listByprodi(req.params.kode_prodi));
    } catch(err) {
        console.error(`Error while getting list mata kuliah by program studi `, err.message);
        res.status(500).send({status: "Error",message: err.message});
        // next(err);
    }
});

/** Insert Mata Kuliah
 * Url : http://localhost:3000/mata_kuliah
 * Method : POST
 */
router.post('/', async function(req, res, next) {
    try {
        res.status(200).json(await mataKuliah.create(req.body));
    } catch(err) {
        console.error(`Error while creating mata kuliah `, err.message);
        res.status(500).send({status: "Error",message: err.message});
    }
});

/** Update Mata Kuliah
 * Url : http://localhost:3000/mata_kuliah/:kode
 * Method : PATCH
 */
 router.patch('/:kode', async function(req, res, next) {
    try {
        res.status(200).json(await mataKuliah.update(req.params.kode, req.body));
    } catch(err) {
        console.error(`Error while creating mata kuliah `, err.message);
        res.status(500).send({status: "Error",message: err.message});
    }
});


/** Delete Mata Kuliah
 * Url : http://localhost:3000/mata_kuliah?kode=
 * Method : DELETE
 */
router.delete('/', async function(req,res, next) {
    try {
        res.status(200).json(await mataKuliah.remove(req.query.kode));
    } catch(err) {
        console.error(`Error while creating mata kuliah `, err.message);
        res.status(500).send({status: "Error",message: err.message});
    }
});


module.exports = router;