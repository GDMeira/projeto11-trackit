import { useContext, useEffect } from "react";
import styled from "styled-components";
import { HabbitsContext, UserContext } from "../../constants/Contexts";
import { updateTodaysHabbits } from "../../constants/routes";
import Header from '../../components/Header';
import TodaysHabbit from './TodaysHabbit';
import MenuFooter from "../../components/MenuFooter";
import Text from "./Text";
import { useNavigate } from "react-router-dom";

export default function TodaysPage() {
    const navigate = useNavigate();

    const { todaysHabbits, setTodaysHabbits, allHabbits, setAllHabbits } = useContext(HabbitsContext);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        updateTodaysHabbits(user, setTodaysHabbits)
            .then(response => {
                console.log(response);
            })
    }, []);

    return (
        <>
            <Header />
            <TodaysHabbitsSC>
                <Text />
                <ul>
                    {todaysHabbits.map(habbit => <TodaysHabbit key={habbit.id} habbit={habbit} />)}
                </ul>
            </TodaysHabbitsSC>
            <MenuFooter />
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