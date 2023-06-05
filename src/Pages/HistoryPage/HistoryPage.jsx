import styled from "styled-components";
import { HabbitsContext, UserContext } from "../../constants/Contexts";
import Header from '../../components/Header';
import MenuFooter from "../../components/MenuFooter";
import { useContext, useEffect, useState } from "react";
import { updateHistoryHabits } from "../../constants/routes";

export default function HistoryPage() {
    const { todaysHabbits, _otherStates} = useContext(HabbitsContext);
    const { user, _setUser } = useContext(UserContext);

    const [historyHabits, setHistoryHabits] = useState(0);

    useEffect(() => {
        updateHistoryHabits(user, setHistoryHabits);
    }, [todaysHabbits])


    return (
        <>
            <Header />
            <TodaysHabbitsSC>
                <TextSC>
                    <h1>Histórico</h1>
                    <h2>Em breve você poderá ver o histórico dos seus hábitos aqui!</h2>
                </TextSC>
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

const TextSC = styled.div`
    width: 340px;
    text-align: left;
    margin-top: 30px;

    h1 {
        font-size: 23px;
        color: #126BA5;
    }

    h2 {
        font-size: 18px;
        color: #666666;
        margin-top: 15px;
        margin-bottom: 30px;
    }
`;