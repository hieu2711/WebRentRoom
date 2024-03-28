import React, { useState, useEffect } from 'react'
// import { text } from '../../ultils/constant'
import { Province, ItemSideBar, RelatedPost } from '../../components'
import { List, Pagination } from './index'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { formatVietnameseToString } from '../../utils/Common/formatVNtoString'

const Rental = () => {
    const { prices, areas, categories } = useSelector(state => state.app)
    const [categoryCurrent, setCategoryCurrent] = useState({})
    const [categoryCode, setCategoryCode] = useState('none')
    const location = useLocation() // lấy được pathname
    useEffect(() => {
        const category = categories?.find(item => `/${formatVietnameseToString(item.value)}` === location.pathname)
        console.log(category)
        setCategoryCurrent(category)
        if (category) {
            setCategoryCode(category.code)
        }
    }, [location])

    return (
        <div className='w-full flex flex-col gap-3' >
            <div>
                <h1 className='text-[28px] text-center font-bold' >{categoryCurrent?.header}</h1>
                <p className='text-base text-gray-700'>{categoryCurrent?.subheader}</p>
            </div>
            <Province />
            <div className='w-full flex gap-4'>
                <div className='w-[70%]'>
                    <List categoryCode={categoryCode} />
                    <Pagination />
                </div>
                <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
                    <ItemSideBar isDouble={true} type='priceCode' content={prices} title='Xem theo giá' />
                    <ItemSideBar isDouble={true} type='areaCode' content={areas} title='Xem theo diện tích' />
                    <RelatedPost />
                </div>
            </div>

        </div>
    )
}

export default Rental