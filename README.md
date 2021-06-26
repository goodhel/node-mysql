## Project setup
```
npm install
```

Then, edit `app/config.js` with correct DB credentials.
Or use env.

### Schema DB
```
Schema db dapat dilihat di schema.sql
```

### Run
```
npm start
```

## List API

List REST API

### Program Studi
```
Get All Program Studi
Method: GET
Url: http://localhost:3000/program_studi

Insert Program Studi
Method: POST
Url: http://localhost:3000/program_studi
Param: 
{
    "kode": "PS1",
    "nama": "Program Studi 1"
}

Update Program Studi
Method: PATCH
Url: http://localhost:3000/program_studi/:kode
Param:
{
    "kode": "PS1",
    "nama": "Program Studi 1 edited"
}

Delete Program Studi
Method: DELETE
Url: http://localhost:3000/program_studi?kode=
```

### Mahasiswa
```
 All Mahasiswa
Method: GET
Url: http://localhost:3000/mahasiswa

Get Credit All Mahasiswa
Method: GET
Url: http://localhost:3000/mahasiswa/sks

Insert Mahasiswa
Method: POST
Url: http://localhost:3000/mahasiswa
Param: 
{
    "nim": "I0716002",
    "nama": "Joko",
    "tgl_lahir": "1998-05-20T03:11:05.000Z",
    "tempat_lahir": "Jakarta",
    "tahun_masuk": "2016",
    "kode_program_studi": "PS1"
}

Update Mahasiswa
Method: PATCH
Url: http://localhost:3000/mahasiswa/:nim
Param:
{
    "nim": "I0716002",
    "nama": "Joko Edited",
    "tgl_lahir": "1998-05-20T03:11:05.000Z",
    "tempat_lahir": "Jakarta",
    "tahun_masuk": "2016",
    "kode_program_studi": "PS1"
}

Delete Mahasiswa
Method: DELETE
Url: http://localhost:3000/mahasiswa?nim=
```

### Mata Kuliah
```
Get All Mata Kuliah
Method: GET
Url: http://localhost:3000/mata_kuliah

List Mata Kuliah Pada Setiap Program Studi
Method: GET
Url: http://localhost:3000/mata_kuliah/prodi

List Mata Kuliah By Program Studi
Method: GET
Url: http://localhost:3000/mata_kuliah/:kode_prodi

Insert Mata Kuliah
Method: POST
Url: http://localhost:3000/mata_kuliah
Param: 
{
    "kode": "MK4",
    "nama": "Matkul 4",
    "sks": 2,
    "kode_program_studi": "PS1"
}

Update Mata Kuliah
Method: PATCH
Url: http://localhost:3000/mata_kuliah/:kode
Param:
{
    "kode": "MK4",
    "nama": "Matkul 4",
    "sks": 3,
    "kode_program_studi": "PS1"
}

Delete Mata Kuliah
Method: DELETE
Url: http://localhost:3000/mata_kuliah?kode=
```

### Program Studi
```
Get All Program Studi
Method: GET
Url: http://localhost:3000/krs

Insert Program Studi
Method: POST
Url: http://localhost:3000/krs
Param: 
{
    "nim": "I0716002",
    "kode_mata_kuliah": "MK4"
}

Update Program Studi
Method: PATCH
Url: http://localhost:3000/krs/:id
Param:
{
    "nim": "I0716002",
    "kode_mata_kuliah": "MK5"
}

Delete Program Studi
Method: DELETE
Url: http://localhost:3000/krs?id=
```