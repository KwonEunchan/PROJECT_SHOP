import logo from '../images/logo.png';
import '../styles/Intro.scss'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setIsLogin, setIsJoin} from "../Store";
import Login from './Login'
import Join from './Join'
import {useCookies} from "react-cookie";

export default function Intro() {
    const subText = "패션의 마무리, 세미콜론"
    let [subTextState, setSubTextState] = useState([])
    let ptr = -10
    const copy = []
    let isLogin = useSelector((state) => state.isLogin)
    let isJoin = useSelector((state) => state.isJoin)
    const dispatch = useDispatch()
    let [cookie, setCookie,removeCookie] = useCookies()

    useEffect(() => {
        const subTextTyping = setInterval(() => {
            if (ptr >= subText.length) {
                clearInterval(subTextTyping)
            } else {
                copy.push(subText[ptr])
                setSubTextState(copy.join(""))
                ptr++
            }
        }, 150)
    }, []);

    useEffect(() => {
        const intro = document.querySelector('.intro')
        cookie.id ? intro.classList.add('logon') : intro.classList.remove('logon')
    }, [cookie])


    return (
        <div className="intro">
            {isLogin && <Login></Login>}
            {isJoin && <Join></Join>}
            <img className="logo" src={logo} alt=""/>
            <h1 className="subText">{
                subTextState
            }</h1>
            <div className="btnBox">
                <div className="btn btnLogin" onClick={() => {
                    dispatch(setIsLogin())
                }}>
                    로그인
                </div>
                <div className="btn btnJoin " onClick={() => {
                    dispatch(setIsJoin())
                }}>
                    회원가입
                </div>
            </div>
        </div>
    )
}