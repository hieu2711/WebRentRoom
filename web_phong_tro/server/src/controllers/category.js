import * as getCategoriesService from '../services/category'
export const getCategories = async (req,res) => {
    try {
        const response = await getCategoriesService.getCategoriesService()
        return res.status(200).json(response);
        
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Lỗi ở category controller: " + error.message
        });
    }
}