import '../styles/Header.scss'
import logo from '../images/logo_black.png'
import {useCookies} from "react-cookie";
import {useDispatch, useSelector} from "react-redux";
import {setShopCart} from "../Store";

export default function Header() {
    let [cookie, setCookie,removeCookie] = useCookies()
    let shopCart = useSelector((state) => state.shopCart)
    const dispatch = useDispatch()
    return (<>
        <div className="header">
            <img src={logo} alt="logo" className="logo"/>
            <p className="userNav" onClick={() => {
                document.querySelector('.material-symbols-outlined').classList.toggle('active')
                document.querySelector('.userNavMenu').classList.toggle('active')
            }}>
            <span className="userIntro">
            <b>{cookie.id}님</b>, 환영합니다
            </span>
                <span className="material-symbols-outlined">
                    arrow_drop_down_circle
            </span>
            </p>
        </div>
        <ul className="userNavMenu">
            <li>마이페이지</li>
            <li>주문내역</li>
            <li onClick={()=>{
                dispatch(setShopCart())
            }}>장바구니</li>
            <li onClick={()=>{
                removeCookie('id')
            }}>로그아웃</li>
        </ul>
        <p>스크롤</p>
    </>)

}