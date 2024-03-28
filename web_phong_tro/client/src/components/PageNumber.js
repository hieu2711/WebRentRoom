import { memo } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const notActive = 'px-4 py-3 bg-white hover:bg-gray-300  rounded-md cursor-pointer'
const active ='px-4 py-3 bg-[#E13427] text-white hover:opacity-90  rounded-md cursor-pointer'
function PageNumber({number, currentPage, icon,setCurrentpage, type}) {
    const navigate = useNavigate()
    const handlerChangePage = () =>{
        if(!(number === '...')){
            setCurrentpage(+number)
        navigate({
            pathname:"/",
            search: createSearchParams({
                page:number
            }).toString()
        });
        }
    }
    return ( 
        <div className={+number === +currentPage ? active : notActive}
            onClick={handlerChangePage}
        >
            {icon || number}
        </div>
     );
}

export default memo(PageNumber);