const db = require('./db');
const helper = require('../helper');

async function getAll() {
    const result = await db.query(
        'SELECT * FROM krs', []
    );

    const data = helper.emptyOrRows(result);
    const status = "OK";
    const info = "Data Berhasil di Dapatkan";

    return {status, info, data};
}

async function insert(krs) {
    validateData(krs);
    const result = await db.query(
        `INSERT INTO krs (nim, kode_mata_kuliah) VALUES (?,?)`,
        [krs.nim, krs.kode_mata_kuliah]
    );

    let message = 'Error in creating KRS';
    let status = "Error";
    if (result.affectedRows) {
        status = "OK";
        message = 'KRS created successfully';
    }

    return {status, message};
}

async function update(id, krs) {
    validateData(krs);
    const result = await db.query(
        `UPDATE krs SET nim = ?, kode_mata_kuliah = ? WHERE id = ?`,
        [krs.nim, krs.kode_mata_kuliah, id]
    );

    let message = 'Error in updating KRS';
    let status = "Error";
    if (result.affectedRows) {
        status = "OK";
        message = 'KRS updated successfully';
    }

    return {status, message};
}

async function remove(id) {
    const result = await db.query(
        'DELETE FROM krs WHERE id = ?',
        [id]
    );

    let message = 'Error in deleting KRS';
    let status = "Error";
    if (result.affectedRows) {
        status = "OK";
        message = 'KRS deleted successfully';
    }

    return {status, message};
}

/** Function Validate Data Json */
function validateData(krs) {
    let message = [];

    if (!krs) {
        message.push('No object is provided');
    }

    if (!krs.nim) {
        message.push('Nim is empty');
    }

    if (!krs.kode_mata_kuliah) {
        message.push('Kode Mata Kuliah is empty');
    }

    if (message.length) {
        let error = new Error(message.join());
        error.statusCode = 400;

        throw error;
    }
}

module.exports = {
    getAll,
    insert,
    update,
    remove
}
