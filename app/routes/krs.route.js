const express = require('express');
const router = express.Router();
const krs = require('../services/krs');

/** GET All KRS
 * Url : http://localhost:3000/krs
 * Method : GET
 */
router.get('/', async function(req, res, next) {
    try {
        res.status(200).json(await krs.getAll());
    } catch(err) {
        console.error(`Error while getting krs `, err.message);
        res.status(500).send({status: "Error",message: err.message});
    }
});

/** INSERT KRS
 * Url : http://localhost:3000/krs
 * Method : POST
 */
router.post('/', async function(req, res, next) {
    try {
        res.status(200).json(await krs.insert(req.body));
    } catch(err) {
        console.error(`Error while inserting krs `, err.message);
        res.status(500).send({status: "Error",message: err.message});
    }
})

/** UPDATE KRS
 * Url : http://localhost:3000/krs/:id
 * Method : PATCH
 */
router.patch('/:id', async function(req, res, next) {
    try {
        res.status(200).json(await krs.update(req.params.id,req.body));
    } catch(err) {
        console.error(`Error while updating krs`, err.message);
        res.status(500).send({status: "Error",message: err.message});
    }
})

/** DELETE KRS
 * Url : http://localhost:3000/krs?id=
 * Method : DELETE
 */
router.delete('/', async function(req, res, next) {
    try {
        res.status(200).json(await krs.remove(req.query.id));
    } catch(err) {
        console.error(`Error while deleting krs`, err.message);
        res.status(500).send({status: "Error",message: err.message});
    }
})

module.exports = router;