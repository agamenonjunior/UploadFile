const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const app = express()
const path = require('path')
app.use(bodyParser.urlencoded({extended:true}))


//armazenando no disco
const armazenamento = multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null, true)
    },
    filename:(req,file,callBack)=>{
        //Nome do arquivo + data agora + extensao 
        let a = file.fieldname+'-'+Date.now()+path.extname(file.originalname)
        callBack(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
        console.log( a)
    }
})

const upload = multer({armazenamento})
//rota padrao
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

//rota reposável pelo upload do arquivo
app.post('/upload', upload.single('arquivo'),(req, res, next)=>{
    const file = req.file
    res.send(file)
    if (!file) {
        const error = new Error('Favor selecionar um arquivo')
        error.httpStatusCode = 400
        return next(error)
    }else{
        console.log("Ok")
    }
})


app.listen(3000,'127.0.0.1',()=>{
    console.log('server running...')
})