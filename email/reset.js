const config = require('config')

module.exports = function(email,token){
    return {
        to : email,
        from : 'bogdangorgadze1@gmail.com',
        subject: 'Восстановление доступа',
        html:`
            <h1>Вы забыли пароль ?</h1>
            <p><a href="${config.get('baseUrl')}/auth/password/${token}">ссылка на восстановление</a></p>
        `
    }
}