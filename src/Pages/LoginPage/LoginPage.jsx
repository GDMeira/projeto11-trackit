import styled from "styled-components";
import { useContext } from 'react';
import { UserContext } from '../../constants/Contexts';
import { Link, useLocation } from "react-router-dom";
import { Pages } from "../../constants/routes";
import Brand from "../../components/Brand";
import LoginForms from "./LoginForms";

export default function LoginPage() {
    const {user, setUser} = useContext(UserContext);

    return (
        <LoginSC>
            <Brand />
            <LoginForms />
            <Link to={Pages.signIn} >
                Não tem uma conta? Cadastre-se!
            </Link>
        </LoginSC>
    )
}

const LoginSC = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    a {
        margin-top: 25px;
        text-decoration: underline;
        color: #52B6FF;
        cursor: pointer;
    }
`;