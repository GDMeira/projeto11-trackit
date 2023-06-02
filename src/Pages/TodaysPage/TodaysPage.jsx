import { useContext, useEffect } from "react";
import styled from "styled-components";
import { HabbitsContext, UserContext } from "../../constants/Contexts";
import axios from "axios";
import { BASE_URL, HeaderConfig, Pages } from "../../constants/routes";
import { ListTodaysHabbits } from "../../constants/routes";
import Header from '../../components/Header';
import { useNavigate } from "react-router-dom";
import TodaysHabbit from './TodaysHabbit';
import MenuFooter from "../../components/MenuFooter";
import Text from "./Text";

export default function TodaysPage() {
    const navigate = useNavigate();
    const { todaysHabbits, setTodaysHabbits, allHabbits, setAllHabbits } = useContext(HabbitsContext);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        axios.get(BASE_URL + ListTodaysHabbits, HeaderConfig(user.token))
            .then(response => {
                console.log(response.data);
                
                if (todaysHabbits.length !== response.data.length) {
                    setTodaysHabbits(response.data);
                }
            })
            .catch(error => {
                alert(error.response.data.message);
                navigate(Pages.login);
            });
    }, [todaysHabbits]);

    return (
        <>
            <Header />
            <TodaysHabbitsSC>
                <Text/>
                {todaysHabbits.map(habbit => <TodaysHabbit key={habbit.id} habbit={habbit}/>)}
            </TodaysHabbitsSC>
            <MenuFooter/>
        </>
    )
}

const TodaysHabbitsSC = styled.main`
    margin: 70px 0;
    min-height: calc(667px - 140px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #E5E5E5;
`;