let msyql = require('mysql'); // import library mysql
// membuat varibale connection yang isinya konfihurasi dari koneksi database msyql
let connection = msyql.createConnection({
    host:   'localhost',
    user:   'root',
    password:   '',
    database:   'db_01_express'
});

//membuat kondisi untuk melihat apakah koneksi berjalan atau tidak
connection.connect(function (error) {
    if(!!error){
        console.log(error)
    }else{
        console.log('Koneksi berhasil');
    }
})
// kita export module connection agar bisa digunakan di file lain
module.exports = connection;