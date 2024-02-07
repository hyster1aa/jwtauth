const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../db');
const { check } = require('express-validator');


class TokenService { 
    generateTokens(payload) {
        const accessToken = jwt.sign(payload,process.env.JWT_ACCESS_SECRET,{expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET,{expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await db.query(`SELECT * FROM tokenuser WHERE u_id = $1`, [userId]);
        
        if(tokenData.rows[0]) {
            console.log(refreshToken);
            return await db.query(`UPDATE tokenuser SET refreshtoken = $1 WHERE u_id = $2`,
                                   [refreshToken,userId]);
        }
        const token = await db.query(`INSERT INTO tokenuser (u_id, refreshtoken) 
                                      VALUES ($1, $2) RETURNING *`,[userId, refreshToken]);
        console.log("Ok!");
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await db.query(`DELETE FROM tokenuser WHERE refreshtoken = $1`,[refreshToken]);
        return tokenData;
    }

    validateAccessToken (token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            console.log(userData);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken (token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            console.log(userData);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async findTokenUser(refreshToken) {
        const tokenData = await db.query(`SELECT * FROM tokenuser WHERE refreshtoken = $1`,[refreshToken]);
        console.log(tokenData);
        return tokenData;
    }
}

module.exports = new TokenService();