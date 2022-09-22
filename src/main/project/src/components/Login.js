import '../styles/Login.scss'
import {useDispatch, useSelector} from "react-redux";
import {setIsLogin} from "../Store";
import {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";

export default function Login(){
    let isLogin = useSelector((state) => state.isLogin)
    const dispatch = useDispatch()
    let [flag,setFlag] = useState([false,false])
    let [cookie,setCookie,removeCookie] = useCookies()
    let [loginTry,setLoginTry] = useState(false)


    useEffect(()=>{
        const btnLogin = document.querySelector('.btnLogin')
        !flag.includes(false) ? btnLogin.classList.add('active') : btnLogin.classList.remove('active')
    },[flag])

    return(
        <div className="loginPage">
            <form action="" id="loginForm">
                <div className="formHeader">
                    LOGIN
                </div>
                <div className="formBody">
                    <input type="text" placeholder="아이디를 입력하세요" onKeyUp={(e)=>{
                        let copy = [...flag]
                        copy[0] = e.target.value === "" ? false : true
                        setFlag(copy)
                    }}/>
                    <input type="password" placeholder="비밀번호를 입력하세요" onKeyUp={(e)=>{
                        let copy = [...flag]
                        copy[1] = e.target.value === "" ? false : true
                        setFlag(copy)
                    }}/>
                    {
                        (!cookie.id && loginTry) && <p className="pwMsg">입력한 정보를 확인하세요</p>
                    }
                </div>
                <div className="formFooter">
                    <div className="btnLogin btn" onClick={(e)=>{
                        e.target.classList.contains('active') &&
                            axios.post("/login",{
                                "id" : document.querySelectorAll('.formBody>input')[0].value,
                                "pw" : document.querySelectorAll('.formBody>input')[1].value
                            }).then((data)=>{
                                data.data !="" && setCookie("id",data.data)
                                data.data !="" && dispatch(setIsLogin())
                            })
                        setLoginTry(true)
                    }}>로그인</div>
                    <div className="btnCancel btn" onClick={()=>{
                        dispatch(setIsLogin())
                    }}>닫 기</div>
                </div>
            </form>
        </div>
    )
}