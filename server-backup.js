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
  
let data = [
    {
        id:1572072711104,
        nama:'Ali',
        umur:21,
        alamat:'Bandung'
    },
    {
        id:1572072711105,
        nama:'Al',
        umur:21,
        alamat:'Bandung'
    }
]

app.use(bodyParser())
app.get('/',async(req, res)=>{
    const resData = await db.query('select * from users')
    res.json(resData.rows)
})
app.get('/:id',(req, res)=>{
    const id = req.params.id
    const obj = data.find(item=>item.id == id)
    console.log(req.params)
    res.json(obj)
})
// menambah data
app.post('/',(req,res) => {
    const {nama, umur, alamat} = req.body
    const id = Number(new Date)
    console.log(req.body)
    data.push({id, nama, umur, alamat})
    res.json('Data berhasil ditambah')
})
// edit data
app.put('/:id',(req,res)=>{
    const {nama, umur, alamat} = req.body
    const id = req.params.id
    const index = data.findIndex(item=>item.id == id)
    if(nama === undefined) {
        data[index] = {...data[index], umur, alamat}
    } else {
        data[index] = {...data[index], nama, umur, alamat}
    }
    res.json('data berhasil diubah')
})
// delete data
app.delete('/:id',(req,res)=>{
    const id = req.params.id
    const newData = data.filter(item => item.id != id)
    data = newData
    console.log(newData)
    res.json('Data terhapus')
})

app.listen(port, ()=>console.log('localhost:3000'))
