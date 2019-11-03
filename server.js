const Express = require('express')
const bodyParser = require('body-parser')

const Pool = require('pg').Pool
const app = Express()
const port = 3000

const db = new Pool({
    user: 'oiqcuocuhpeuco',
    host: 'ec2-174-129-233-123.compute-1.amazonaws.com',
    database: 'dbnmmdk5blufj6',
    password: '9409491209166055a51aa29ec80fd583fa3c830164994d3cb60807cd1ed424da',
    port: 5432,
    ssl: true
})


app.use(bodyParser())
// get seluruh pegawai
app.get('/',async(req, res)=>{
    const resData = await db.query('select * from users')
    res.json(resData.rows)
})
// get pegawai by id
app.get('/:id',async(req, res)=>{
    const id = req.params.id
    const resData = await db.query(`select * from users where id=${id}`)
    res.json(resData.rows)
})
// menambah data pegawai
app.post('/',async(req,res) => {
    try {
        const {nama, umur, alamat} = req.body
        await db.query(`insert into users(nama, umur, alamat)
         values('${nama}', ${umur}, '${alamat}')`)
        console.log(req.body)
        res.json(req.body)
    } catch (error) {
        console.log(error)
        res.json('error')
    }
})
// edit by id
app.put('/:id',async(req,res)=>{
    const {nama, umur, alamat} = req.body
    const id = req.params.id
    await db.query(`update users set nama = '${nama}', umur = ${umur}, alamat = '${alamat}' where id = ${id}`)
    res.json('data berhasil diubah')
})
// delete by id
app.delete('/:id',async(req,res)=>{
    const id = req.params.id
    await db.query(`DELETE FROM users WHERE id = ${id}`)
    res.json('Data terhapus')
})

app.listen(port, ()=>console.log('localhost:3000'))
