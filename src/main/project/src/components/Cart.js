import '../styles/Cart.scss'
import {useDispatch, useSelector} from "react-redux";

export default function Cart(){
    let shopCart = useSelector((state) => state.shopCart)
    const dispatch = useDispatch()
    return(
        <div className="cartPage">

        </div>
    )
}