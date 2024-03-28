import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
require('dotenv').config()
import { v4 } from 'uuid'

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const registerService = ({phone,password,name}) => new Promise(async (resolve, reject) =>{
    try {
        const response = await db.User.findOrCreate({
            where: {phone},
            defaults:{
                id: v4(),
                phone,
                name,
                password: hashPassword(password),
                zalo: 'adadada'
            }
        })
        const token = response[1] && jwt.sign({id: response[0].id, phone: response[0].phone},process.env.SECRET_KEY,{expiresIn:'2d'})
        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Register is successfully!' : 'Phone number has been already used',
            token: token || null
        })
    } catch (error) {
        reject(error)
    }
}) 

export const loginService = ({phone,password}) => new Promise(async (resolve, reject) =>{
    try {
        const response = await db.User.findOne({
            where: {phone},
            raw: true
        })
        const isCorrectPassword = response && bcrypt.compareSync(password,response.password)
        const token = isCorrectPassword && jwt.sign({id: response.id, phone: response.phone},process.env.SECRET_KEY,{expiresIn:'2d'})
        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Login is successfully!' : response ? 'Password is not correct':'Phone number not found',
            token: token || null
        })
    } catch (error) {
        reject(error)
    }
}) 