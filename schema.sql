CREATE DATABASE kampus;

CREATE TABLE program_studi(
	kode VARCHAR(10) PRIMARY KEY,
	nama VARCHAR(200) NOT NULL
)ENGINE=INNODB CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE mahasiswa(
	nim VARCHAR(20) PRIMARY KEY NOT NULL,
	nama VARCHAR(255) NOT NULL,
	tgl_lahir timestamp NOT NULL,
	tempat_lahir VARCHAR(150) NOT NULL,
	tahun_masuk VARCHAR(5) NOT NULL,
	kode_program_studi VARCHAR(10) NOT NULL,
	FOREIGN KEY(kode_program_studi) REFERENCES program_studi(kode) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE=INNODB CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE mata_kuliah(
	kode VARCHAR(10) PRIMARY KEY,
	nama VARCHAR(200) NOT NULL,
	sks int(10) NOT NULL,
	kode_program_studi VARCHAR(10) NOT NULL,
	FOREIGN KEY(kode_program_studi) REFERENCES program_studi(kode) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE=INNODB CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE krs(
	id int(10) PRIMARY KEY AUTO_INCREMENT,
	nim VARCHAR(20) NOT NULL,
	kode_mata_kuliah VARCHAR(10) NOT NULL,
	FOREIGN KEY(nim) REFERENCES mahasiswa(nim) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(kode_mata_kuliah) REFERENCES mata_kuliah(kode) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE=INNODB CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



INSERT INTO program_studi VALUES
('PS1', 'Program Studi 1'),
('PS2', 'Program Studi 2'),
('PS3', 'Program Studi 3');


INSERT INTO mahasiswa VALUES 
('I0716001', 'Adrian', '1999-06-15T03:11:05.000Z','Yogyakarta','2016','PS3'),
('I0716002', 'Joko', '1998-05-20T03:11:05.000Z','Jakarta','2016','PS1'),
('I0716003', 'Anwar', '1998-03-13T03:11:05.000Z','Bandung','2017','PS2');

INSERT INTO mata_kuliah VALUES
('MK1','Matkul 1',2, 'PS3'),
('MK2','Matkul 2',3, 'PS3'),
('MK3','Matkul 3',2, 'PS3'),
('MK4','Matkul 4',2, 'PS1'),
('MK5','Matkul 5',2, 'PS2');


INSERT INTO krs (nim,kode_mata_kuliah) VALUES
('I0716001','MK1'),
('I0716001','MK2'),
('I0716003','MK5'),
('I0716002','MK4');