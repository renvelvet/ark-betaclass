const Express = require('express')
const bodyParser = require('body-parser')
const app = Express()
const port = 3000

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
app.get('/',(req, res)=>{
    res.json(data)
})
app.get('/:id',(req, res)=>{
    const id = req.params.id
    const obj = data.find(item=>item.id == id)
    console.log(req.params)
    res.json(obj)
})
app.post('/',(req,res) => {
    const {nama, umur, alamat} = req.body
    const id = Number(new Date)
    console.log(req.body)
    data.push({id, nama, umur, alamat})
    res.json('Data berhasil ditambah')
})
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
app.delete('/:id',(req,res)=>{
    const id = req.params.id
    const newData = data.filter(item => item.id != id)
    data = newData
    console.log(newData)
    res.json('Data terhapus')
})

app.listen(port, ()=>console.log('localhost:3000'))
