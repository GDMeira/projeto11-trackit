import styled from "styled-components";
import { Link } from "react-router-dom";
import { Pages } from "../../constants/routes";
import Brand from "../../components/Brand";
import SignInForms from "./SignInForms";

export default function SignInPage() {
    return (
        <SignInSC>
            <Brand/>
            <SignInForms />
            <Link to={Pages.login} data-test='login-link'>
                Já tem uma conta? Faça login!
            </Link>
        </SignInSC>
    )
}

const SignInSC = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    a {
        font-size: 14px;
        margin-top: 25px;
        text-decoration: underline;
        color: #52B6FF;
        cursor: pointer;
    }
`;