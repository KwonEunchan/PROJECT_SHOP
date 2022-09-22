import '../styles/Shop.scss'
import {useDispatch, useSelector} from "react-redux";
import {setShopView} from "../Store";
import item from "../images/item.png"
import {useEffect, useState} from "react";
import axios from "axios";


export default function Shop(props) {
    let shopView = useSelector((state) => state.shopView)
    const shopCategory = [
        {
            "type": "DUMMY",
            "category": ["DUMMY"],
        },
        {
            "type": "NOTICE",
            "category": ["안내"],
        },
        {
            "type": "SUIT",
            "category": ["수트"]
        },
        {
            "type": "OUTER",
            "category": ["패딩", "코트", "자켓", "가디건"]
        },
        {
            "type": "TOP",
            "category": ["맨투맨", "셔츠", "니트"]
        },
        {
            "type": "BOTTOM",
            "category": ["청바지", "슬랙스"]
        },
        {
            "type": "SHOES",
            "category": ["운동화", "로퍼", "슬리퍼"]
        }
    ]

    const dispatch = useDispatch()
    const [categoryPtr, setCategoryPtr] = useState(0)
    const [itemInfo, setItemInfo] = useState([])

    useEffect(() => {
        const categories = document.querySelectorAll('.subCategory')
        categories.forEach((c, index) => {
            index === categoryPtr ? c.classList.add('focus') : c.classList.remove('focus')
        })

        axios.get("http://localhost:8002/showItems", {
            params: {
                sub: shopCategory[props.shopType].category[categoryPtr]
            }
        })
            .then((data) => {
                data.data ? setItemInfo(data.data) : setItemInfo([])
            })
    }, [categoryPtr])

    useEffect(()=>{
        itemInfo.forEach((item,index)=>{
            item.quantity <= 0 ? document.querySelectorAll('.item')[index].classList.add('soldOut') :
                document.querySelectorAll('.item')[index].classList.remove('soldOut')
        })
    },[itemInfo])

    return (
        <div className="shopPage" onWheel={(e) => {
            e.stopPropagation()
        }}>
            <div className="shopBox">
                <h1 className="shopTitle">{shopCategory[props.shopType].type}</h1>
                <h1 className="category">
                    {
                        shopCategory[props.shopType].category.map((c, index) => {
                            return (<div key={c} className="subCategory" onClick={(e) => {
                                setCategoryPtr(index)
                            }}>{c}</div>)
                        })
                    }
                </h1>
                <div className="shopBody">
                    {
                        itemInfo.length != 0 ? itemInfo.map((item)=>{
                            return(
                                <div key={item.code} className="item">
                                    <img src={item.img} alt="item"/>
                                    <h1 className="itemName">{item.name}</h1>
                                    <h1 className="itemPrice">{parseInt(item.price).toLocaleString('ko-KR')}</h1>
                                    <div className="btnBox">
                                        <div className="btn btnBuy">구매</div>
                                        <div className="btn btnCart">찜</div>
                                    </div>
                                </div>
                            )
                        }) : <h1 className="shopAlert">상품을 준비 중입니다.</h1>
                    }
                </div>
                <div className="btnCancel" onClick={() => {
                    dispatch(setShopView())
                    props.setShopType(null)
                }}>닫 기
                </div>
            </div>
        </div>
    )
}