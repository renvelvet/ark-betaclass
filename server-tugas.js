const Express = require('express')
const bodyParser = require('body-parser')

const Pool = require('pg').Pool
const app = Express()
const port = 3000

const db = new Pool({
    user: 'lasti',
    host: '103.122.5.98',
    database: 'lastidb',
    password: '',
    port: 51751,
    ssl: false
})


app.use(bodyParser())
// get seluruh pegawai
app.get('/pegawai',async(req, res)=>{
    const resData = await db.query('select * from pegawai')
    res.json(resData.rows)
})
// get pegawai by id
app.get('/pegawai/:id',async(req, res)=>{
    const id = req.params.id
    const resData = await db.query(`select * from pegawai where id=${id}`)
    res.json(resData.rows)
})
// menambah data pegawai
app.post('/pegawai',async(req,res) => {
    try {
        const {nama, alamat, jabatan, kontak, email, gaji, status} = req.body
        await db.query(`insert into pegawai(nama, alamat, jabatan, kontak, email, gaji, status)
         values('${nama}', '${alamat}', '${jabatan}', '${kontak}', '${email}', ${gaji}, ${status})`)
        console.log(req.body)
        res.json(req.body)
    } catch (error) {
        console.log(error)
        res.json('error')
    }
  
})
// edit jabatan pegawai
app.put('/pegawai',async(req,res)=>{
    const {nama, alamat, jabatan} = req.body
    const id = req.params.id
    
     await db.query(`update pegawai set jabatan = '${jabatan}' where jabatan = '${jabatan}'`)
    res.json('data berhasil diubah')
})
// delete data pegawai by id
app.delete('/pegawai/:id',async(req,res)=>{
    const id = req.params.id
    await db.query(`DELETE FROM pegawai WHERE id = ${id}`)
    res.json('Data terhapus')
})

app.listen(port, ()=>console.log('localhost:3000'))
