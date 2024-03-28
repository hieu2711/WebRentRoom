import { useEffect,useRef } from "react";
import { Button, Item } from "../../components";
import { getPosts,getPostsLimit } from "../../store/actions/post"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


function List({ number }) {
    const dispatch = useDispatch()
    const { posts, count } = useSelector(state => state.post)
    const listRef = useRef()

    useEffect(() =>{
        let offset = number ? +number - 1 : 0
        dispatch(getPostsLimit({offset}))

    },[number])
    return ( 
        <div ref={listRef} className="w-full p-2 bg-white shadow-md rounded-md px-4">
            <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
                <span>Cập nhật: 12:05 3/2/2024</span>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <span>Sắp xếp:</span>
                <Button bgColor='bg-gray-200' text='Mặc định' />
                <Button bgColor='bg-gray-200' text='Mới nhất' />
            </div>
            <div className="items">
                {posts?.length > 0 && posts.map(item =>{
                    return (
                        <Item key={item.id}
                         address={item?.address} attributes={item?.attributes}
                         description = {JSON.parse(item?.description)} images={JSON.parse(item?.images?.image)}
                         star={+item?.star} title={item?.title}
                         user={item?.user}
                         id={item?.id}
                         />
                    )
                })}
            </div>
        </div>
     );
}

export default List;