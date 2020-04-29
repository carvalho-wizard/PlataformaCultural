const { authSecret } = require('../.env')
const jwt = require('jwt-simple') // Constrói Tokens
const bcrypt = require('bcrypt-nodejs') // Constrói a autênticação


module.exports = app => {
    const signin = async(req, res) => {
        try {
            if (!req.body.email || !req.body.password) {
                return res.status().send("Informe usário e senha")
            }
    
            const user = await app.db('users')
                .where({ email: req.body.email })
                .first()
    
            if (!user) return res.status(400).send("Usuário não encontrado!")

            const cryptPass = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    
            const isMatch = bcrypt.compareSync(req.body.password, cryptPass)
            if (!isMatch) return res.status(401).send("email ou senha inválida.")
    
            const now = Math.floor(Date.now() / 1000)
            const payload = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                categoryId: user.categoryId,
                isAdmin: user.isAdmin,
                isValid: user.isValid,
                iat: now,
                exp: now + (60 * 60 * 24 * 3)
            }
    
            res.json({
                ...payload,
                token: jwt.encode(payload, authSecret)
            })
        } catch (e) {
            console.error(e)
        }
    }

    const validateToken = async(req, res) => {
        const userData = req.body || null
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (e) {
            // Problemas com token
            console.error(e)
        }

        res.send(false)
    }

    return { signin, validateToken }
}