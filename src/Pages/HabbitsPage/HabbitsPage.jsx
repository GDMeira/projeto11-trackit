import { useContext, useEffect } from "react";
import styled from "styled-components";
import { HabbitsContext, UserContext } from "../../constants/Contexts";
import { updateAllHabbits } from "../../constants/routes";
import Header from '../../components/Header';
import { useNavigate } from "react-router-dom";
import NewHabbit from "./NewHabbit";
import Habbit from './Habbit';
import MenuFooter from "../../components/MenuFooter";
import { PageSC } from "../../style/PageSC";

//TODO: implementar PageSC

export default function HabbitsPage() {
    const navigate = useNavigate();
    const { todaysHabbits, setTodaysHabbits, allHabbits, setAllHabbits } = useContext(HabbitsContext);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        updateAllHabbits(user, setAllHabbits, setTodaysHabbits)
            .then(resp => {
                if (resp !== 'stay') {
                    navigate(resp);
                }
            })

    }, [])

    function content() {
        if (allHabbits.length > 0) {
            return <ul>
                {allHabbits.map(habbit => <Habbit key={habbit.id} habbit={habbit}/>)}
            </ul>
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
            <PageSC>
                <NewHabbit/>
                {content()}
            </PageSC>
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