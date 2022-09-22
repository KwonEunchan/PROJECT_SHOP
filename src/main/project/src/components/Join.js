import '../styles/Join.scss'
import {useDispatch, useSelector} from "react-redux";
import {setIsJoin} from "../Store";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Join() {
    let isJoin = useSelector((state) => state.isJoin)
    const dispatch = useDispatch()
    let [flag, setFlag] = useState([false, false, false, false])
    let [pw, setPw] = useState("")
    let [pwChk, setPwChk] = useState("")

    useEffect(() => {
        const btnJoin = document.querySelector('.btnJoin')
        !flag.includes(false) ? btnJoin.classList.add('active') : btnJoin.classList.remove('active')
    }, [flag])

    useEffect(()=>{
        if(pw != document.querySelectorAll('.formBody>input')[3].value){
            setPwChk(!pwChk)
        }
    },[])

    return (
        <div className="joinPage">
            <form action="" id="joinForm">
                <div className="formHeader">
                    JOIN
                </div>
                <div className="formBody">
                    <input type="text" placeholder="이름를 입력하세요" onKeyUp={(e) => {
                        let copy = [...flag]
                        copy[0] = e.target.value == "" ? false : true
                        setFlag(copy)
                    }}/>
                    <input type="text" placeholder="아이디를 입력하세요" onKeyUp={(e) => {
                        let copy = [...flag]
                        copy[1] = e.target.value == "" ? false : true
                        setFlag(copy)
                    }}/>
                    <input type="password" placeholder="비밀번호를 입력하세요" onKeyUp={(e) => {
                        let copy = [...flag]
                        copy[2] = e.target.value == "" ? false : true
                        setFlag(copy)
                        setPw(e.target.value)
                    }}/>
                    <input type="password" placeholder="비밀번호를 다시 입력하세요" onKeyUp={(e) => {
                        let copy = [...flag]
                        copy[3] = (e.target.value == "" || e.target.value != pw) ? false : true
                        setFlag(copy)
                        setPwChk(e.target.value)
                    }}/>
                    {
                        !(pw===pwChk || pwChk=="") && <p className="pwMsg">비밀번호를 확인하세요</p>
                    }
                </div>
                <div className="formFooter">
                    <div className="btnJoin btn" onClick={(e) => {
                        e.target.classList.contains('active') &&
                        axios.post("/join", {
                            "name": document.querySelectorAll('.formBody>input')[0].value,
                            "id": document.querySelectorAll('.formBody>input')[1].value,
                            "pw": document.querySelectorAll('.formBody>input')[2].value
                        }).then((data) => {
                            data.data && dispatch(setIsJoin())
                        })
                    }}>회원가입
                    </div>
                    <div className="btnCancel btn" onClick={() => {
                        dispatch(setIsJoin())
                    }}>닫 기
                    </div>
                </div>

            </form>
        </div>
    )
}