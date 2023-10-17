const express = require('express');
const router = express.Router();
//import express validator
const {body, validationResult } = require('express-validator');
// import database
const connection = require('../config/db');

router.get('/', function (req, res) {
    connection.query('SELECT * FROM jurusan ORDER BY id_j DESC', function (err, rows) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            console.log('Query result:', rows); // Log the query result for debugging
            return res.status(200).json({
                status: true,
                message: 'Data Jurusan',
                data: rows,
            });
        }
    });
});
router.post('/jurusan', [
    //validation
    body('nama_jurusan').notEmpty(),
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        nama_jurusan: req.body.nama_jurusan
    }
    connection.query('insert into jurusan set ?', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(201).json({
                status: true,
                message: 'Success..!',
                data: rows[0]
            })
        }
    })
})
router.get('/jurusan/:id', function (req, res) {
    let id = req.params.id;
    connection.query(`SELECT * FROM jurusan WHERE id_j = ${id}`, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        }
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Not Found',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Jurusan',
                data: rows[0]
            });
        }
    });
});

router.patch('/jurusan/:id', [
    body('nama_jurusan').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        nama_jurusan: req.body.nama_jurusan
    }
    connection.query(`update jurusan set ? where id_j = ${id}`, Data, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Success..!'
            })
        }
    })
})

router.delete('/jurusan/(:id)', function(req, res){
    let id = req.params.id;
    connection.query(`delete from jurusan where id_j = ${id}`, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data has ben delete !',
            })
        }
    })
})
module.exports = router;