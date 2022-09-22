import '../styles/Pages.scss';
import {useEffect, useState} from "react";
import banner from '../images/banner.png'
import bannerSuit from '../images/banner_suit.png'
import bannerOuter from '../images/banner_outer.png'
import bannerTop from '../images/banner_top.png'
import bannerBottom from '../images/banner_bottom.png'
import bannerShoes from '../images/banner_shoes.png'
import {useDispatch, useSelector} from "react-redux";
import {setShopView} from "../Store";

export default function Pages(props) {
    const bannerList = [bannerShoes, banner, bannerSuit, bannerOuter, bannerTop, bannerBottom, bannerShoes, banner]
    const [circlePtr, setCirclePtr] = useState(-45)
    const [pagePtr, setPagePtr] = useState(1)
    const [pageAbout, setPageAbout] = useState(false)
    let shopView = useSelector((state) => state.shopView)
    const dispatch = useDispatch()

    const aboutIntro = ['none','SemiColon','Suit','Outer','Top','Bottom','Shoes','ETC']
    const aboutMsg = ['none','스크롤하며 이동하세요','남성의 자존심','양보할 수 없는 멋','자연스러운 멋','편안한 멋','뚜벅뚜벅','ETC']

    useEffect(() => {
        const menuViewer = document.querySelector('.menuViewer')
        menuViewer.style.transform = `rotate(${circlePtr}deg)`

        if (circlePtr % 360 === -315) {
            menuViewer.style.transition = `0s`
            setCirclePtr((Math.trunc(circlePtr / 360)) * 360 - 405)
            setPagePtr(1)
            setTimeout(() => {
                menuViewer.style.transition = `1s`
            }, 100)
        } else if (circlePtr % 360 === 0) {
            menuViewer.style.transition = `0s`
            setCirclePtr((Math.trunc(circlePtr / 360)) * 360 - 270)
            setPagePtr(6)
            setTimeout(() => {
                menuViewer.style.transition = `1s`
            }, 100)
        }
    }, [circlePtr])

    useEffect(() => {
        const menuPages = document.querySelectorAll('.menuPage')
        pagePtr > 7 && setPagePtr(0)
        pagePtr < 0 && setPagePtr(7)
        const pages = document.querySelectorAll('.menuPage')
        pages.forEach((page, index) => {
            index === pagePtr ? page.classList.add('active') : page.classList.remove('active')
        })
    })


    document.addEventListener('wheel', (e) => {
        if (e.deltaY >= 0) {
            setCirclePtr(circlePtr - 45)
            setPagePtr(pagePtr + 1)
        } else {
            setCirclePtr(circlePtr + 45)
            setPagePtr(pagePtr - 1)
        }
    })
    return (<div className="pageCircle">
        <div className="menuViewer">
            {
                [0, 1, 2, 3, 4, 5, 6, 7].map((page, index) => {
                    return (
                        <div className="menuPage" key={index} style={{"backgroundImage": `url(${bannerList[index]})`}}
                             onMouseEnter={() => {
                                 setPageAbout(true)
                             }}
                             onMouseLeave={() => {
                                 setPageAbout(false)
                             }}>
                            {
                                (pageAbout && pagePtr === index) &&
                                <div className="menuPageAbout" onClick={()=>{
                                    dispatch(setShopView())
                                    props.setShopType(index)
                                }
                                }>
                                    <>
                                        <p className="aboutIntro">{aboutIntro[index]}</p>
                                        <p className="aboutMsg">{aboutMsg[index]}</p>
                                    </>
                                </div>
                            }
                        </div>
                    )
                })
            }
        </div>
    </div>);
}