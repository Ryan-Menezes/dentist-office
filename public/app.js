const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')

// App config
const app = express()

const hbs = handlebars.create({
    defaultLayout: 'painel',
    helpers: {
        dateFormat: function(date, locale = 'pt-BR'){
            return date.toLocaleString(locale)
        }
    }
})

app.set('port', process.env.PORT || 3000)
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '..', 'app', 'views'))
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.static(path.join(__dirname, 'public')))

// Routes config
app.use('/', require('../routes/auth/login'))

// Start Server
app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`)
})