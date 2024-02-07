const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult, check } = require('express-validator');
const TokenService = require('../service/token-service');
const tokenService = require('../service/token-service');
const Userdto = require('../dtos/user-dto');
const userDto = require('../dtos/user-dto');

class authController {
    async registration(req, res) {
       try {
            console.log(req.body);
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                console.log(errors);
                return res.status(400).json( {message:"Registration error",errors} );
            }
            const {u_name, u_surname, u_login, u_password} = req.body;
            const checkUser = await db.query(`SELECT COUNT(*) FROM users WHERE u_login = $1`,[u_login])
            console.log(checkUser.rows[0].count);
            if(checkUser.rows[0].count>0) {
                return res.status(400).json({message: `User ${u_login} just exists...`});
            }


            const p_salt = bcrypt.genSaltSync(7);
            const hashedPassword = bcrypt.hashSync(u_password, p_salt);
            const user = await db.query(`INSERT INTO users (u_name, u_surname, u_login, u_password, p_salt) 
                                         VALUES ($1, $2, $3, $4, $5) RETURNING *`
                                         ,[u_name, u_surname, u_login, hashedPassword, p_salt]);
            console.log('user was created');

            const uDto = new userDto(user.rows[0]);
            const tokens = tokenService.generateTokens({...uDto});
            const userInfo = {tokens, uDto};
            await tokenService.saveToken(user.rows[0].user_id, tokens.refreshToken,
                 {maxAge: 30*24*60*60*1000, httpOnly: true } );

            res.cookie('refreshToken', userInfo.refreshToken);
            return res.json( {message: `User ${u_login} was successfully created...`} );
       } catch (e) {
            console.log(e);
            res.status(400).json({message:'Registration error'});
       } 
    }

    async login(req, res) {
        try {

            const {u_login, u_password} = req.body;
            const checkUser = await db.query(`SELECT * FROM users WHERE u_login = $1`,[u_login]);

            console.log(checkUser);
            
            if(!checkUser.rows[0]) {
                return res.status(400).json({message: "Users not exists"});
            }
            const validPass = bcrypt.compareSync(u_password, checkUser.rows[0].u_password);
            if (!validPass) {
                return res.status(400).json({message: `Invalid password`});
            }
            const uDto = new userDto(checkUser.rows[0]);
            const tokens = tokenService.generateTokens({...uDto});
            const userInfo = {...tokens, uDto};
            await tokenService.saveToken(checkUser.rows[0].user_id, tokens.refreshToken,
                 {maxAge: 30*24*60*60*1000, httpOnly: true } );
            
            res.cookie('refreshToken', tokens.refreshToken);
            return res.json(userInfo);
        } catch (e) {
            console.log(e);
            res.status(400).json({message:'Login error'})
        }
    }

    async logout (req, res) {
        try {
            const { refreshToken } = req.cookies;
            console.log(refreshToken);
            const token = await tokenService.removeToken(refreshToken);        
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            console.log(e);
        }
    }

    async refresh (req, res) {
        try {
            const { refreshToken } = req.cookies;
            console.log(refreshToken);
            if (!refreshToken) {
                res.json('User undefined');
            }
            const userData = tokenService.validateRefreshToken(refreshToken);
            const userToken = await TokenService.findTokenUser(refreshToken);
            if(!userData || !userToken) {
                return res.json('Authorization error');
            }
            const user = await db.query(`SELECT * FROM users WHERE user_id = $1 LIMIT 1`,[userData.id]);
            const uDto = new userDto(user.rows[0]);
            const newTokens = tokenService.generateTokens({...uDto});
            await tokenService.saveToken(uDto.id, newTokens.refreshToken);
            res.cookie('refreshToken', newTokens.refreshToken);
            return res.json({...newTokens, uDto});
        } catch (e) {
            console.log(e);
        }
    }

    async getUsers(req, res) {
        try {
            const users = await db.query(`SELECT * FROM users`);
            console.log(req.cookies);
            return res.json(users);
        } catch (e) {
            console.log(e);
            res.status(400).json({message:'Regista'})
        }
    }
}

module.exports = new authController();