const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const app = express()
const path = require('path')

app.use(bodyParser.urlencoded({extended:true}))



const armazenamento = multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,'')
    },
    filename:(req,file,callBack)=>{
        //Nome do arquivo + data agora + extensao 
        callBack(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({armazenamento})

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post('/upload', upload.single('arquivo'),(req, res, next)=>{
    const file = req.file
    res.send(file)
    if (!file) {
        const error = new Error('Favor selecionar um arquivo')
        error.httpStatusCode = 400
        return next(error)
    }
    

})


app.listen(3000,'127.0.0.1',()=>{
    console.log('server running...')
})