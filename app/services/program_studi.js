const db = require('../services/db');
const helper = require('../helper');

/** Function Get All Data Program Studi From Database */
async function getAll() {
    const rows = await db.query(
        'SELECT * FROM program_studi',[]
    );
    // console.log(rows);
    const data = helper.emptyOrRows(rows);
    const status = "OK";
    const info = "Data Berhasil di Dapatkan";

    return {status, info, data};
}

/** Function Insert Data Program Studi to Database */
async function create(programStudi) {
    validateData(programStudi);
    const result = await db.query(
        'INSERT INTO program_studi (kode, nama) VALUES (?,?)',
        [programStudi.kode, programStudi.nama]
    );

    let message = 'Error in creating Program Studi';
    let status = "Error";
    if (result.affectedRows) {
        status = "OK";
        message = 'Program Studi created successfully';
    }

    return {status, message};
}

/** Function Update Data Program Studi to Database */
async function update(kode, programStudi) {
    validateData(programStudi);
    const result = await db.query(
        'UPDATE program_studi SET kode = ?, nama = ? WHERE kode = ?',
        [programStudi.kode, programStudi.nama, kode]
    );

    let message = 'Error in updating Program Studi';
    let status = "Error";
    if (result.affectedRows) {
        status = "OK";
        message = 'Program Studi updated successfully';
    }

    return {status, message};
}

/** Function Delete Data Program Studi to Database */
async function remove(kode) {
    const result = await db.query(
        'DELETE FROM program_studi WHERE kode = ?',
        [kode]
    );
    
    let message = 'Error in deleting Program Studi';
    let status = "Error";
    if (result.affectedRows) {
        status = "OK";
        message = 'Program Studi deleted successfully';
    }

    return {status, message};
}

/** Function Validate Data Json */
function validateData(programStudi) {
    let message = [];

    if (!programStudi) {
        message.push('No object is provided');
    }

    if (!programStudi.kode) {
        message.push('Kode is empty');
    }

    if (!programStudi.nama) {
        message.push('Nama is empty');
    }

    if (message.length) {
        let error = new Error(message.join());
        error.statusCode = 400;

        throw error;
    }
}

module.exports = {
    getAll,
    create,
    update,
    remove
}