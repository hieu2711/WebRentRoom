import { useSelector } from "react-redux";
import { PageNumber } from "../../components";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { useEffect, useState } from "react";

function Pagination({ number }) {
    const {count, posts} = useSelector(state => state.post)
    const [arrPage,setArrPage] = useState([])
    const [currentPage,setCurrentpage] = useState(+number || 1)
    const [isHideEnd,setisHideEnd] = useState(false)
    const [isHideStart,setisHideStart] = useState(false)

    useEffect(() =>{
        let maxPage = Math.floor(count / posts.length) 
        let end = (currentPage + 1) > maxPage ? maxPage : (currentPage + 1)
        let start = (currentPage - 1) <= 0 ? 1 : (currentPage - 1)
        let temp= []
        for(let i = start;i<= end;i++){
            temp.push(i)
            setArrPage(temp)
            if(currentPage + 1 >= maxPage) {
                setisHideEnd(true)
            }else{
                setisHideEnd(false)
            }
            if(currentPage <= 2) {
                setisHideStart(true)
            }else{
                setisHideStart(false)
            }
        }
    }, [count, posts,currentPage])
    return ( 
        <div className="flex items-center justify-center gap-2 py-5">
            {!isHideStart && <PageNumber icon={<GrLinkPrevious/>} setCurrentpage={setCurrentpage} number={1} />}
            {!isHideStart && <PageNumber number={'...'}  />}
            {arrPage.length > 0 && arrPage.map(item => {
                return(
                    <PageNumber key={item} number={item}
                     setCurrentpage={setCurrentpage}
                     currentPage={currentPage}/>
                )
            })}
            {!isHideEnd && <PageNumber number={'...'} />}
            {!isHideEnd && <PageNumber icon={<GrLinkNext/>}  setCurrentpage={setCurrentpage} number={Math.floor(count/posts.length)}  type='end'/>}
            
        </div>
     );
}

export default Pagination;