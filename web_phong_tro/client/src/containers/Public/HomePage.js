import React, { useEffect } from 'react'
import {text} from '../../utils/constant'
import Province from '../../components/Province'
import List from './List'
import Pagination from './Pagination'
import { useSearchParams } from 'react-router-dom'
import { ItemSideBar, RelatedPost } from '../../components'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'


const Homepage = () => {
    const [params] = useSearchParams()
    const {categories, prices, areas} = useSelector(state => state.app)
    const dispatch =useDispatch()

    useEffect(() =>{
        dispatch(actions.getPrices())
        dispatch(actions.getAreas())
        dispatch(actions.getProvinces())
    },[])
    return ( 
        <div className=' w-full flex flex-col gap-3'>
            <div>
                <h1 className='text-[28px] font-bold text-center' >{text.HOME_TITLE}</h1>
                <p className='text-base text-gray-700'>{text.HOME_DESCRIPTION}</p>
            </div>
            <Province/>
            <div className='w-[100%] flex gap-4'>
                <div className='w-[70%]'>
                <List number={params.get('page')}/>
                <Pagination number={params.get('page')}/>
                </div>
                <div className='w-[30%] border-green-500 flex flex-col gap-4 justify-start items-center'>
                    <ItemSideBar content={categories} title="Danh sách cho thuê" />
                    <ItemSideBar content={prices}  title="Xem theo giá"/>
                    <ItemSideBar content={areas} title="Xem theo diện tích"/>
                    <RelatedPost />
                </div>
            </div>
        </div>
    )
}

export default Homepage