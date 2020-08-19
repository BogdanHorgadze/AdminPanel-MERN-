const config = require('config')

module.exports = function(email){
    return {
        to : email,
        from : 'bogdangorgadze1@gmail.com',
        subject: 'Аккаунт создан',
        html:`
            <h1>Аккаунт создан с email ${email}</h1>
        `
    }
}