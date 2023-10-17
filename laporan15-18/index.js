const express = require('express')
const app = express() 
const port = 3000 
const cors = require('cors')
app.use(cors())


const bodyPs = require('body-parser'); 
app.use(bodyPs.urlencoded({ extended: false}));
app.use(bodyPs.json());


const mhsRouter = require('./routes/mahasiswa');
app.use(mhsRouter);

const jurusanRouter = require('./routes/jurusan');
app.use( jurusanRouter);


app.listen(port, () => {
   
    console.log(`aplikasi berjalan di http:://localhost:${port}`)
})