const express = require('express');
// Route REST API untuk data siswa
const router = express.Router();

const siswaController = require('../controller/siswacontroller');

router.get('/', siswaController.getAllSiswa);

router.get('/:id', siswaController.getSiswaById);

router.post('/', siswaController.createSiswa);

router.put('/:id', siswaController.updateSiswa);

router.delete('/:id', siswaController.deleteSiswa);

module.exports = router;
