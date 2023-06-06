import styled from "styled-components";

export const FormSC = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    input {
        border: 1px solid #D4D4D4;
        padding-left: 10px;
        font-size: clamp(1.5rem, 3vw, 2.5rem);
        height: 7vh;
        min-height: 45px;
        width: 80vw;
        min-width: 303px;
        margin: 0.5vh 0;
        border-radius: 5px;
        color: ${props => props.disabled ? '#AFAFAF' : '#666666'};

        &::placeholder {
            color: #D4D4D4;
            
            font-size: clamp(1.5rem, 3vw, 2.5rem);
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
        height: 7vh;
        min-height: 45px;
        width: 80vw;
        min-width: 303px;
        margin: 0.5vh 0;
        border-radius: 5px;
        border: none;
        background-color: #52B6FF;
        color: #ffffff;
        font-size: clamp(1.5rem, 5vw, 2.5rem);

        &:disabled {
            opacity: 0.7;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;