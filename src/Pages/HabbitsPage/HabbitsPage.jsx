import { useContext, useEffect, useState } from "react";
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
    const { habbits, setHabbits } = useContext(HabbitsContext);
    const [states, setStates] = useState({ habbitsNumber: 0 });
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        axios.get(BASE_URL + ListHabbits, HeaderConfig(user.token))
            .then(response => {
                console.log(response.data);
                setStates({ ...states, habbitsNumber: response.data.length });
            })
            .catch(error => {
                alert(error.response.data.message);
                navigate(Pages.login);
            });
    }, [habbits])

    return (
        <>
            <Header />
            <HabbitsSC>
                <NewHabbit/>
                {habbits.map(habbit => <Habbit key={habbit.id} habbit={habbit}/>)}
                <MenuFooter/>
            </HabbitsSC>
        </>
    )
}

const HabbitsSC = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;