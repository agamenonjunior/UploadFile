const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const app = express()
const path = require('path')

app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

const armazenamento = multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,'/upload')
    },
    filename:(req,file,callBack)=>{
        //Nome do arquivo + data agora + extensao 
        callBack(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})

app.listen(3000,'127.0.0.1',()=>{
    console.log('server running...')
})