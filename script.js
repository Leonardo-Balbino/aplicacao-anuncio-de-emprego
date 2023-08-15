const express    = require('express')
const exphbs     = require('express-handlebars')
const app        = express();
const path       = require('path')
const db         = require('./db/connection')
const bodyParser = require('body-parser')
const Job        = require('./models/Job')
const Sequelize  = require('sequelize')
const Op         = Sequelize.Op

const PORT = 3000;



app.listen(PORT, ()=>{
    console.log(`O Express está rodando na porta ${PORT}`)
})

// body Parse

app.use(bodyParser.urlencoded({ extended: false }))

// headle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//satatic folder
app.use(express.static(path.join(__dirname, 'public')))



// db connection
db
    .authenticate()
    .then(()=>{
        console.log("conectou ao banco com sucesso")
    })
    .catch(err =>{
        console.log('Ocorreu um erro ao se conectar', err)
    })


// routes

app.get('/', (req, res)=>{

    let search = req.query.job;
    let query  = '%'+search+'%'
    if(!search) {
        Job.findAll({order: [
            ['createdAT','DESC']
        ]})
        .then(jobs =>{
            
            res.render('index', {
                jobs
            })
        })
        .catch(err => console.log(err))
    } else {
        Job.findAll({
            where: {title: {[Op.like]: query}},
            order: [
            ['createdAT','DESC']
        ]})
        .then(jobs =>{
            
            res.render('index', {
                jobs, search
            })
        })
        .catch(err => console.log(err))
    }

    
    



})

// jobs routes
app.use('/jobs', require('./routes/jobs'))


