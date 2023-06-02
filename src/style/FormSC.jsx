import styled from "styled-components";

export const FormSC = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    input {
        border: 1px solid #D4D4D4;
        padding-left: 10px;
        font-size: 20px;
        height: 45px;
        width: 303px;
        margin: 3px 0;
        border-radius: 5px;
        color: ${props => props.disabled ? '#AFAFAF' : '#666666'};

        &::placeholder {
            color: #D4D4D4;
            
            font-size: 20px;
        };

        &:hover {
            box-shadow: 1px 2px 2px thistle;
        }

        &:focus {
            box-shadow: 1px 2px 2px thistle;
            border: inherit;
        }

        &:disabled {
            background-color: #F2F2F2;
        }
    }

    button {
        height: 45px;
        width: 303px;
        margin: 3px 0;
        border-radius: 5px;
        border: none;
        background-color: #52B6FF;
        color: #ffffff;
        font-size: 21px;

        &:disabled {
            opacity: 0.7;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;