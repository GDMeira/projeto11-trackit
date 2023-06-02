import { useContext, useEffect } from "react";
import styled from "styled-components";
import { HabbitsContext, UserContext } from "../../constants/Contexts";
import axios from "axios";
import { BASE_URL, HeaderConfig, Pages } from "../../constants/routes";
import { ListHabbits } from "../../constants/routes";
import Header from '../../components/Header';
import { useNavigate } from "react-router-dom";
import NewHabbit from "./NewHabbit";
import Habbit from './Habbit';
import MenuFooter from "../../components/MenuFooter";

export default function HabbitsPage() {
    const navigate = useNavigate();
    const { todaysHabbits, setTodaysHabbits, allHabbits, setAllHabbits } = useContext(HabbitsContext);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        axios.get(BASE_URL + ListHabbits, HeaderConfig(user.token))
            .then(response => {
                console.log(response.data);

                if (response.data.length !== allHabbits.length) {
                    setAllHabbits(response.data);
                }
            })
            .catch(error => {
                alert(error.response.data.message);
                navigate(Pages.login);
            });
    }, [allHabbits])

    function content() {
        if (allHabbits.length > 0) {
            return <>
                {allHabbits.map(habbit => <Habbit key={habbit.id} habbit={habbit}/>)}
            </>
        } else {
            return <p>
                Você não tem nenhum hábito cadastrado ainda. 
                Adicione um hábito para começar a trackear!
            </p>
        }
    }

    return (
        <>
            <Header />
            <HabbitsSC>
                <NewHabbit/>
                {content()}
            </HabbitsSC>
            <MenuFooter/>
        </>
    )
}

const HabbitsSC = styled.main`
    margin: 70px 0;
    min-height: calc(667px - 140px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #E5E5E5;

    p {
        width: 340px;
        font-size: 18px;
        color: #666666;
    }
`;