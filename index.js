//config inicial
const express = require("express");
const app = express();
require('dotenv').config()
const mongoose = require("mongoose");
const cors = require('cors');

//formar de ler JSON / Middleware 
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

app.get("/", (req, res)=>{

    res.json({teste: "teste"})

})


/* 
npm install cors
permitir acesso a API com CORS 
*/
app.use((req, res, next) => {

	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");

	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    
    //Quais cabeçalhos HTTP podem ser usados ​​durante a solicitação real.
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    app.use(cors());
    next();
});

//rotas da API

const VideoRoute = require("./router/VideoRoutes")
app.use("/videos", VideoRoute)

//credencial do banco de dados
const PASSWORD = process.env.DB_PASSWORD
const USER = process.env.DB_USER

//conecta ao banco
mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.dq179.mongodb.net/te?retryWrites=true&w=majority`)
.then(()=>{

    //entragar uma porta
    app.listen(process.env.PORT || 8080);
    console.log("Conectado ao MongoDB!");
})
.catch(error => console.log("Error:",error))