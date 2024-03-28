import db from "../models";

//GET ALL POST

export const postServices = () => new Promise(async(resolve,reject) =>{
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
            ], //chọc vô để lấy data bên bảng khác bằng khóa ngoại
            attributes: ['id', 'title', 'star', 'address', 'description'] //lấy những cái mình cần trong bảng post
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Posts Failed',
            response
        })
    } catch (error) {
        reject(error)
    }
})


export const getPostLimitServices = (offset, ...query) => new Promise(async(resolve,reject) =>{
    try {
        const response = await db.Post.findAndCountAll({
            where:query,
            raw: true,
            nest: true,
            offset: offset * +process.env.limit || 0,
            limit: +process.env.limit, // chuyển thành kiểu int
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
            ], //chọc vô để lấy data bên bảng khác bằng khóa ngoại
            attributes: ['id', 'title', 'star', 'address', 'description'] //lấy những cái mình cần trong bảng post
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Posts Failed',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const getNewPostService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            offset: 0,
            order: [['createdAt', 'DESC']], //chỗ lọc theo ngày 
            limit: +process.env.LIMIT,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
            ],
            attributes: ['id', 'title', 'star', 'createdAt']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Getting posts is failed.',
            response
        })

    } catch (error) {
        reject(error)
    }
})