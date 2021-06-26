const db = require('../services/db');
const helper = require('../helper');

/** Function Get All Data Mata Kuliah From Database */
async function getAll() {
    const rows = await db.query(
        'SELECT * FROM mata_kuliah',[]
    );
    // console.log(rows);
    const data = helper.emptyOrRows(rows);
    const status = "OK";
    const info = "Data Berhasil di Dapatkan";

    return {status, info, data};
}

/** Function List Mata Kuliah Pada Setiap Program Studi */
async function listMatkul() {
    const prodis = await db.query(
        'SELECT kode, nama FROM program_studi',[]
    );
    const data_prodi = helper.emptyOrRows(prodis);
    
    let data = [];
    for (const prodi of data_prodi) {
        const rows = await db.query(
            'SELECT * FROM mata_kuliah WHERE kode_program_studi = ?',[prodi.kode]
        );
        const matkul = helper.emptyOrRows(rows);
        let arr = {
            kode: prodi.kode,
            nama: prodi.nama,
            matkul: matkul
        };
        data.push(arr);
    }
    const status = "OK";
    const info = "Data Berhasil di Dapatkan";

    return {status, info, data};
}

/** Function List Mata Kuliah By Program Studi */
async function listByprodi(prodi) {
    const rows = await db.query(
        'SELECT * FROM mata_kuliah WHERE kode_program_studi = ?',[prodi]
    );
    const data = helper.emptyOrRows(rows);
    const status = "OK";
    const info = "Data Berhasil di Dapatkan";

    return {status, info, data};
}

/** Function Insert Data Mata Kuliah to Database */
async function create(mataKuliah) {
    validateData(mataKuliah);
    const result = await db.query(
        `INSERT INTO mata_kuliah 
        (kode, nama, sks, kode_program_studi)
        VALUES (?,?,?,?)`,
        [mataKuliah.kode, mataKuliah.nama, mataKuliah.sks, mataKuliah.kode_program_studi]
    );

    let message = 'Error in creating Mata Kuliah';
    let status = "Error";
    if (result.affectedRows) {
        status = "OK";
        message = 'Mata Kuliah created successfully';
    }

    return {status,message};
}

/** Function Update Data Mata Kuliah to Database */
async function update(kode, mataKuliah) {
    validateData(mataKuliah);
    const result = await db.query(
        `UPDATE mata_kuliah SET kode = ?, nama = ?, sks = ?, kode_program_studi = ?
        WHERE kode = ?`,
        [mataKuliah.kode, mataKuliah.nama, mataKuliah.sks, mataKuliah.kode_program_studi, kode]
    );

    let message = 'Error in updating Mata Kuliah';
    let status = "Error";
    if (result.affectedRows) {
        status = "OK";
        message = 'Mata Kuliah updated successfully';
    }

    return {status, message};
}

/** Function Delete Data Mata Kuliah to Database */
async function remove(kode) {
    const result = await db.query(
        'DELETE FROM mata_kuliah WHERE kode = ?',
        [kode]
    );
    
    let message = 'Error in deleting Mata Kuliah';
    let status = "Error";
    if (result.affectedRows) {
        status = "OK";
        message = 'Mata Kuliah deleted successfully';
    }

    return {status, message};
}

/** Function Validate Data Json */
function validateData(mataKuliah) {
    let message = [];

    if (!mataKuliah) {
        message.push('No object is provided');
    }

    if (!mataKuliah.kode) {
        message.push('Kode is empty');
    }

    if (!mataKuliah.nama) {
        message.push('Nama is empty');
    }

    if (!mataKuliah.sks) {
        message.push('SKS is empty');
    }

    if (!mataKuliah.kode_program_studi) {
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
    listMatkul,
    listByprodi
}