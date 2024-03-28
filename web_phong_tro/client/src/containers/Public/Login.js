import React, {useEffect, useState} from "react";
import { InputForm , Button} from "../../components";
import {  useNavigate, useLocation } from "react-router-dom";
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'

const Login = () => {
    const location = useLocation(); //object này lấy được trạng thái của flag rồi gán vô state bên dưới
    const [isRegister,setIsRegister] = useState(location.state?.flag)
    const [invalidFields, setInvalidFields] = useState([])
    const { isLoggedIn,msg,update } = useSelector(state => state.auth) //kiểm tra nếu đăng nhập hay đăng kí thành công redirect về home
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [payload,setPayload] = useState({
        phone: '',
        password: '',
        name: '',
    })

    useEffect(() =>{
        setIsRegister(location.state?.flag)
    },[location.state?.flag])

    useEffect(() => {
        isLoggedIn && navigate('/')
    }, [isLoggedIn])

    useEffect(() => {
        Swal.fire('Oops!',msg,'error')
    },[msg,update])
    const handleSubmit = async () => {
        let finalPayload = isRegister ? payload : {
            phone: payload.phone,
            password: payload.password
        }
        let invalids = validate(finalPayload)
        if (invalids === 0) isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))
    }

    const validate = (payload) => {
        let invalids = 0
        let fields = Object.entries(payload) //chuyển obj thành mảng
        fields.forEach(item => {
            if (item[1] === '') {
                setInvalidFields(prev => [...prev, {
                    name: item[0],
                    message: 'Bạn không được bỏ trống trường này.'
                }])
                invalids++
            }
        })
        fields.forEach(item => {
            switch (item[0]) {
                case 'password':
                    if (item[1].length < 6) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Mật khẩu phải có tối thiểu 6 kí tự.'
                        }])
                        invalids++
                    }
                    break;
                case 'phone':
                    if (!+item[1]) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Số điện thoại không hợp lệ.'
                        }])
                        invalids++
                    }
                    break

                default:
                    break;
            }
        })
        return invalids
    }

    return (
        <div className=" w-full flex justify-center items-center">
            <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shawdow-sm">
            <h3 className="font-semibold text-2xl">  {isRegister ? 'Đăng kí tài khoản' : 'Đăng nhập'}</h3>
            <div className="w-full mb-3 flex-col gap-5 mt-3">
            {isRegister && <InputForm  setInvalidFields={setInvalidFields} invalidFields={invalidFields} label={'Họ tên'} value={payload.name} setValue={setPayload} keyPayload={'name'} />}
                <InputForm type='number' setInvalidFields={setInvalidFields} invalidFields={invalidFields} label={'Số điện thoại'} value={payload.phone} setValue={setPayload} keyPayload={'phone'} />
                <InputForm type='password' setInvalidFields={setInvalidFields} invalidFields={invalidFields} label={'Mật khẩu'} value={payload.password} setValue={setPayload} keyPayload={'password'} />
            </div>
            <div className="mt-5">
                <Button text={isRegister ? 'Đăng kí' : 'Đăng nhập'} bgColor={'bg-secondary1'}
                 textColor={'text-white'} fullWidth onClick={handleSubmit}/>
            </div>
            <div className="mt-6 flex items-center justify-between ">
               {isRegister ? <small>Bạn đã có tài khoản? <span className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => {
                    setIsRegister(false)
                    setPayload({
                        phone: '',
                        password: '',
                        name: ''
                    })
                }}>Đăng nhập ngay</span></small> 
               : 
               <>
                <small className="text-[blue] hover:text-[red] cursor-pointer">Bạn quên mật khẩu?</small>
                <small onClick={() => {
                            setIsRegister(false)
                            setPayload({
                                phone: '',
                                password: '',
                                name: ''
                            })
                        }} className="text-[blue] hover:text-[red] cursor-pointer">Tạo tài khoản mới</small>
               </>}
            </div>
        </div>
        </div>
    )
}
export default Login;