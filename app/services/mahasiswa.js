const db = require('../services/db');
const helper = require('../helper');

/** Function Get All Data Mahasiswa From Database */
async function getAll() {
    const rows = await db.query(
        'SELECT * FROM mahasiswa',[]
    );
    
    const data = helper.emptyOrRows(rows);
    const status = "OK";
    const info = "Data Berhasil di Dapatkan";

    return {status, info, data};
}

/** Function number of credits each student  */
async function listCredit() {
    const rows = await db.query(
        `SELECT nim, mahasiswa.nama, COALESCE((SELECT sum(sks) FROM mata_kuliah
        INNER JOIN krs ON mata_kuliah.kode = krs.kode_mata_kuliah
        WHERE nim = mahasiswa.nim),0) as sks,
        program_studi.nama as program_studi
        FROM mahasiswa
        INNER JOIN program_studi ON program_studi.kode = mahasiswa.kode_program_studi`,[]
    );
    
    const data = helper.emptyOrRows(rows);
    const status = "OK";
    const info = "Data Berhasil di Dapatkan";

    return {status, info, data};
}

/** Function Insert Data Mahasiswa to Database */
async function create(mahasiswa) {
    validateData(mahasiswa);
    const result = await db.query(
        `INSERT INTO mahasiswa 
        (nim, nama, tgl_lahir, tempat_lahir, tahun_masuk, kode_program_studi)
        VALUES (?,?,?,?,?,?)`,
        [mahasiswa.nim, mahasiswa.nama, mahasiswa.tgl_lahir,
        mahasiswa.tempat_lahir, mahasiswa.tahun_masuk, mahasiswa.kode_program_studi]
    );

    let message = 'Error in creating Mahasiswa';
    let status = "Error";
    if (result.affectedRows) {
        status = "OK";
        message = 'Mahasiswa created successfully';
    }

    return {status, message};
}

/** Function Update Data Mahasiswa to Database */
async function update(nim, mahasiswa) {
    validateData(mahasiswa);
    const result = await db.query(
        `UPDATE mahasiswa SET nim = ?, nama = ?, tgl_lahir = ?, tempat_lahir = ?,
        tahun_masuk = ?, kode_program_studi = ?
        WHERE nim = ?`,
        [mahasiswa.nim, mahasiswa.nama, mahasiswa.tgl_lahir, mahasiswa.tempat_lahir,
        mahasiswa.tahun_masuk, mahasiswa.kode_program_studi, nim]
    );

    let message = 'Error in updating Mahasiswa';
    let status = "Error";

    if (result.affectedRows) {
        status = "OK";
        message = 'Mahasiswa updated successfully';
    }

    return {status, message};
}

/** Function Delete Data Mahasiswa to Database */
async function remove(nim) {
    const result = await db.query(
        'DELETE FROM mahasiswa WHERE nim = ?',
        [nim]
    );
    
    let message = 'Error in deleting Mahasiswa';
    let status = "Error";

    if (result.affectedRows) {
        status = "OK";
        message = 'Mahasiswa deleted successfully';
    }

    return {status, message};
}

/** Function Validate Data Json */
function validateData(mahasiswa) {
    let message = [];

    // console.log(mahasiswa);

    if (!mahasiswa) {
        message.push('No object is provided');
    }

    if (!mahasiswa.nim) {
        message.push('Nim is empty');
    }

    if (!mahasiswa.nama) {
        message.push('Nama is empty');
    }

    if (!mahasiswa.tgl_lahir) {
        message.push('Tanggal Lahir is empty');
    }

    if (!mahasiswa.tempat_lahir) {
        message.push('Tempat Lahir is empty');
    }

    if (!mahasiswa.tahun_masuk) {
        message.push('Tahun Masuk is empty');
    }

    if (!mahasiswa.kode_program_studi) {
        message.push('Kode Program Studi is empty');
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
    remove,
    listCredit
}