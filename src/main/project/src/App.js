import './App.scss';
import {useEffect, useState} from "react";
import Intro from "./components/Intro";
import Header from "./components/Header";
import {useCookies} from "react-cookie";
import Pages from "./components/Pages";
import {useDispatch, useSelector} from "react-redux";
import Shop from "./components/Shop";
import Cart from "./components/Cart";

function App() {
    let [cookie] = useCookies()
    let shopView = useSelector((state) => state.shopView)
    let shopCart = useSelector((state) => state.shopCart)
    const dispatch = useDispatch()
    let [shopType, setShopType] = useState()
    return (
        <div className="App">
            <Intro></Intro>
            {
                cookie.id && <Header></Header>
            }
            {
                cookie.id && <Pages setShopType={setShopType}></Pages>
            }
            {
                shopView && <Shop shopType={shopType} setShopType={setShopType}></Shop>
            }
            {
                shopCart && <Cart></Cart>
            }
        </div>
    )
}

export default App;
