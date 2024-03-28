import React, { useCallback, useEffect, useRef } from "react";
import { Button } from "../../components";
import icons from "../../utils/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { path } from "../../utils/constant";
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
const { CiSquarePlus } = icons
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [searchPagrams] = useSearchParams()
    const headerRef = useRef()
    const { isLoggedIn } = useSelector(state => state.auth)
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, {state: { flag } });
    },[])

    useEffect(() => {
        headerRef.current.scrollIntoView({behavior: 'smooth',block: 'start'})
    },[searchPagrams.get('page')])
    return (
        <div ref={headerRef} className="w-3/5">
            <div className="w-full flex items-center justify-between">
                <Link to='/'>
                    <img src="https://phongtro123.com/images/logo-2021.png" alt="logo" className="w-[240px] h-[70px] object-contain"  />
                </Link>
                <div className="flex items-center gap-1">
                    {!isLoggedIn && <div className='flex items-center gap-1'>
                        <small>Phongtro123.com xin chào !</small>
                        <Button
                            text={'Đăng nhập'}
                            textColor='text-white'
                            bgColor='bg-[#3961fb]'
                            onClick={() => goLogin(false)}
                        />
                        <Button
                            text={'Đăng ký'}
                            textColor='text-white'
                            bgColor='bg-[#3961fb]'
                            onClick={() => goLogin(true)}
                        />
                    </div>}
                    {isLoggedIn && <div className='flex items-center gap-1'>
                        <small>Ten !</small>
                        <Button
                            text={'Đăng xuất'}
                            textColor='text-white'
                            bgColor='bg-red-700'
                            onClick={() => dispatch(actions.logout())}
                        />
                    </div>}
                    <Button text='Đăng tin mới' textColor='text-white' bgColor='bg-secondary2' IcAfter={CiSquarePlus}/>
                </div>
            </div>
        </div>

    )
}
export default Header;