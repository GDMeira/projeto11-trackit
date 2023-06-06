import styled from "styled-components";
import logo from '../assets/logo.svg';


export default function Brand() {
    return (
        <BrandSC>
            <img src={logo} alt="logo" />
        </BrandSC>
    )
}

const BrandSC = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 10vh;

    img {
        width: 50vw;
    }
`