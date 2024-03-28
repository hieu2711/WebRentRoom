import * as postServices from '../services/post'
export const getPost = async (req,res) => {
    try {
        const response = await postServices.postServices()
        return res.status(200).json(response);
        
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Lỗi ở post controller: " + error.message
        });
    }
}
export const getPostLimit = async (req,res) => {
    const {offset, ...query} = req.query
    try {
        const response = await postServices.getPostLimitServices(offset,query)
        return res.status(200).json(response);
        
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Lỗi ở post controller: " + error.message
        });
    }
}

export const getNewPosts = async (req, res) => {
    try {
        const response = await postServices.getNewPostService()
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller: ' + error
        })
    }
}
export const apiGetNewPosts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/post/new-post`,
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})