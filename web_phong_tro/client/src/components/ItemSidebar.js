import { memo } from "react";
import icons from "../utils/icons";
import { formatVietnameseToString } from '../../src/utils/Common/formatVNtoString'
import { Link } from "react-router-dom";

const {GrNext} = icons
function ItemSideBar( {title, content} ) {
    return ( 
        <div className="p-4 rounded-md bg-white w-full">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>          
            <div className="flex flex-col gap-2">
                {content?.length > 0 && content.map(item =>{
                    return (
                        <Link to={`${formatVietnameseToString(item.value)}`}
                         key={item.code} className="flex gap-2 items-center cursor-pointer hover:text-orange-600
                         border-b border-gray-500 pb-1 border-dotted ">
                            <GrNext size={10}/>
                            <p>{item.value}</p>
                        </Link>
                    )
                })}
            </div>

               </div>
     );
}

export default memo(ItemSideBar);