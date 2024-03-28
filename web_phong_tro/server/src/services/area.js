import db from '../models'

// GET ALL Area
export const getAreaSerivce = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Area.findAll({
            raw: true,
            attributes: ['code', 'value', 'order']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get area.',
            response
        })
    } catch (error) {
        reject(error)
    }
})