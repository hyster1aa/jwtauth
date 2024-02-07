const tokenService = require("../service/token-service");

module.exports = function (req, res, next) { //next - вызывает следующий в цепочке middleware
    try {
        const authorizationHeader = req.headers.authorization;
        console.log(authorizationHeader);
        if(!authorizationHeader) {
            return res.json('login error');
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return res.json('login error');
        }

        const userdata = tokenService.validateAccessToken(accessToken);
        console.log(userdata);
        if(!userdata) {
            return res.json('undefinded user');
        }

        req.user = userdata;
        next();
    } catch (e) {
        console.log(e);
    }
}