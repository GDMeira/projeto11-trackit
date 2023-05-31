import styled from "styled-components";
import logo from '../assets/logo.png';


export default function Brand() {
    return (
        <BrandSC>
            <img src={logo} alt="logo" />
            <h1>TrackIt</h1>
        </BrandSC>
    )
}

const BrandSC = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    img {
        margin-top: 60px;
    }

    h1 {
        font-family: 'Playball', cursive;
        font-size: 70px;
        color: #126BA5;
        margin-bottom: 30px;
    }
`