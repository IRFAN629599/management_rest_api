// Controller untuk CRUD data siswa
const db = require('../config/db');

exports.getAllSiswa = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM siswa ORDER BY id DESC'
        );

        res.json({
            status: true,
            message: 'Data siswa berhasil diambil',
            data: rows
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: false,
            message: 'Gagal mengambil data siswa'
        });
    }
};


exports.getSiswaById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.query(
            'SELECT * FROM siswa WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'Siswa tidak ditemukan'
            });
        }

        res.json({
            status: true,
            message: 'Data siswa ditemukan',
            data: rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: false,
            message: 'Gagal mengambil data siswa'
        });
    }
};


exports.createSiswa = async (req, res) => {
    try {
        const {
            nis,
            nama,
            kelas,
            jurusan,
            alamat
        } = req.body;

        if (!nis || !nama || !kelas || !jurusan || !alamat) {
            return res.status(400).json({
                status: false,
                message: 'Semua field wajib diisi'
            });
        }

        const [result] = await db.query(
            `INSERT INTO siswa
            (nis, nama, kelas, jurusan, alamat)
            VALUES (?, ?, ?, ?, ?)`,
            [
                nis,
                nama,
                kelas,
                jurusan,
                alamat
            ]
        );

        const [rows] = await db.query(
            'SELECT * FROM siswa WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json({
            status: true,
            message: 'Siswa berhasil ditambahkan',
            data: rows[0]
        });

    } catch (error) {
        console.error(error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: false,
                message: 'NIS sudah digunakan'
            });
        }

        res.status(500).json({
            status: false,
            message: 'Gagal menambahkan siswa'
        });
    }
};


exports.updateSiswa = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nis,
            nama,
            kelas,
            jurusan,
            alamat
        } = req.body;

        if (!nis || !nama || !kelas || !jurusan || !alamat) {
            return res.status(400).json({
                status: false,
                message: 'Semua field wajib diisi'
            });
        }

        const [result] = await db.query(
            `UPDATE siswa
             SET nis = ?,
                 nama = ?,
                 kelas = ?,
                 jurusan = ?,
                 alamat = ?
             WHERE id = ?`,
            [
                nis,
                nama,
                kelas,
                jurusan,
                alamat,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: false,
                message: 'Siswa tidak ditemukan'
            });
        }

        const [rows] = await db.query(
            'SELECT * FROM siswa WHERE id = ?',
            [id]
        );

        res.json({
            status: true,
            message: 'Siswa berhasil diperbarui',
            data: rows[0]
        });

    } catch (error) {
        console.error(error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                status: false,
                message: 'NIS sudah digunakan'
            });
        }

        res.status(500).json({
            status: false,
            message: 'Gagal memperbarui siswa'
        });
    }
};


exports.deleteSiswa = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            'DELETE FROM siswa WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: false,
                message: 'Siswa tidak ditemukan'
            });
        }

        res.json({
            status: true,
            message: 'Siswa berhasil dihapus'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: false,
            message: 'Gagal menghapus siswa'
        });
    }
};
