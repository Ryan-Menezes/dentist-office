const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')

// App config
const app = express()

const hbs = handlebars.create({
    defaultLayout: 'painel',
    helpers: {
        config: function(value){
            try{
                const parts = value.split('.')
                if(!parts.length){
                    return null
                }
                
                const config = require(`../config/${parts[0]}`)
                parts.shift()

                let result = config
                parts.forEach((value) => {
                    result = result[value]
                })

                return result
            }catch(e){
                return null
            }
        },
        url: function(){
            return `http://localhost:${app.get('port')}`
        },
        dateFormat: function(date, locale = 'pt-BR'){
            return date.toLocaleString(locale)
        }
    }
})

app.set('port', process.env.PORT || 3000)
app.use(express.static(path.join(__dirname, '..', 'public')))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '..', 'app', 'views'))
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// Routes config
app.use('/', require('../routes/auth/login'))

// Start Server
app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`)
})