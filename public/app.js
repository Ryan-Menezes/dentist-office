const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const { Role, Permission } = require('../app/models/index')

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
        },
        roleExists: function(roles, role){
            if(!Array.isArray(roles)){
                roles = []
            }

            return Boolean(roles.find(r => r.dataValues.id == role.id))
        },
        permissionExists: function(permissions, permission){
            if(!Array.isArray(permissions)){
                permissions = []
            }

            return Boolean(permissions.find(p => p.dataValues.id == permission.id))
        },
        equals: function(v1, v2){
            return v1 == v2
        },
        can: async function(auth, permission){
            if(!Array.isArray(auth.roles)){
                return false
            }

            for(const role of auth.roles){
                if(role){
                    try{
                        const permissions = await Permission.findAll({
                            where: {
                                name: permission
                            },
                            include: {
                                required: true,
                                model: Role,
                                as: 'roles',
                                through: {
                                    where: {
                                        roleId: role.id,
                                    }
                                }
                            }
                        })

                        return Boolean(permissions.length)
                    }catch(e){
                        return false
                    }
                }
            }

            return false
        }
    }
})

app.set('port', process.env.PORT || 3000)
app.use(express.static(path.join(__dirname, '..', 'public')))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '..', 'app', 'views'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// Routes config
app.use('/', require('../routes/auth/login'))
app.use(require('../app/middlewares/auth'))
// app.use(require('../app/middlewares/permission'))
app.use('/painel', require('../routes/panel/index'))
app.use('/painel/usuarios', require('../routes/panel/users'))
app.use('/painel/consultas', require('../routes/panel/queries'))
app.use('/painel/funcoes', require('../routes/panel/roles'))
app.use('/painel/permissoes', require('../routes/panel/permissions'))

// Error 404
app.use(function (req, res, next) {
    res.status(404).render('error', {
        layout: false,
        error: 404
    })
})

// Start Server
app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`)
})