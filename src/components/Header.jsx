import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../constants/Contexts";


export default function Header() {
    const {user, _setUser} = useContext(UserContext);

    return (
        <HeaderSC>
            <h1>TrackIt</h1>
            <img src={user.image} alt="user image" data-test='avatar'/>
        </HeaderSC>
    )
}

const HeaderSC = styled.header.attrs(() => ({'data-test':'header'}))`
    width: 100%;
    height: 10vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4.5vw;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    h1 {
        font-family: 'Playball', cursive;
        font-size: clamp(2rem, 3rem, 7vh);
        color: #fff;
    }

    img {
        width: 7vh;
        height: 7vh;
        border-radius: 50%;
    }
`;