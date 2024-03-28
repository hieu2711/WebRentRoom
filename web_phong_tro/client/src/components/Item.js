import { memo, useState } from "react";
import icons from '../utils/icons'
import { useNavigate, Link } from "react-router-dom";
import { formatVietnameseToString } from "../utils/Common/formatVNtoString";

const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill } = icons
const index = [0,1,2,3]
function Item({images,user,title,star,description,attributes,address, id}) {
    const [isHoverHeart,setIsHoverHeart] = useState(false)
    const navigate = useNavigate()
    const handleStar = (star) =>{
        let stars = []
        for(let i = 1; i<= +star;i++){
            stars.push( <GrStar size={20} className="star-item" color="yellow"/>)
        }
        return stars
    }
    return ( 
        <div className="w-full flex py-4"> 
            <Link to={`chi-tiet/${formatVietnameseToString(title)}/${id}`} className="w-2/5 flex flex-wrap gap-[3px] items-center relative cursor-pointer">
            {images.length > 0 && images.slice(0, 4).map((image, index) => (
                <img key={index} src={image} className="w-[47%] h-[120px] object-cover" alt="" />
            ))}

                    <span className="bg-overlay-30 text-white px-2 rounded-md absolute left-2 bottom-4">{images.length} ảnh</span>
                    <span className="text-red absolute right-5 bottom-2" onMouseEnter={() => setIsHoverHeart(true)}
                    onMouseLeave={() => setIsHoverHeart(false)}>
                          {isHoverHeart ? <RiHeartFill size={26} color='red' /> : <RiHeartLine size={26}  />}
                    </span>
            </Link>
            <div className="w-3/5">
                <div className="flex justify-between gap-4">
                    <div className="text-red-600 font-medium" >
                            {handleStar(star).length > 0 && handleStar(+star).map((star, number) =>{
                                return (
                                    <span key={number}>{star}</span>
                                )
                            })}
                        {title}
                    </div>
                    <div className='w-[10%] flex justify-end'>
                        <BsBookmarkStarFill size={24} color='red' />
                    </div>
                </div>
                <div className="my-2 flex items-center justify-around">
                        <span className="font-bold text-green-600 text-sm ">{attributes?.price}</span>
                        <span className="text-sm">{attributes?.acreage}</span>
                </div>
                <span  className="text-sm font-bold">{address}</span>
                <p className="text-gray-500 w-full h-[100px] text-ellipsis overflow-scroll text-[12px]">{description}</p>
                <div className="flex items-center my-3 justify-between">
                    <div className="flex items-center">
                        <img src="https://lnsel.com/wp-content/uploads/2018/12/anon-avatar-300x300.png" alt="avatar" 
                        className="w-[30px] h-3[30px] object-cover mr-2" />
                        <p className="text-[11px] font-bold">{user?.name}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <button type="button" className="bg-blue-700 text-white p-1.5 rounded-md">Gọi {user.phone}</button>
                        <button type="button" className="text-blue-700 p-1.5 rounded-md border border-blue-700 ">Nhắn Zalo</button>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default memo(Item);