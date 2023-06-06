import { useContext, useEffect } from "react";
import styled from "styled-components";
import { HabbitsContext, UserContext } from "../../constants/Contexts";
import { updateTodaysHabbits } from "../../constants/routes";
import Header from '../../components/Header';
import TodaysHabbit from './TodaysHabbit';
import MenuFooter from "../../components/MenuFooter";
import Text from "./Text";
import { useNavigate } from "react-router-dom";
import { PageSC } from "../../style/PageSC";

export default function TodaysPage() {
    const navigate = useNavigate();

    const { todaysHabbits, setTodaysHabbits, allHabbits, setAllHabbits } = useContext(HabbitsContext);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        updateTodaysHabbits(user, setTodaysHabbits)
            .then(resp => {
                if (resp !== 'stay') {
                    navigate(resp);
                }
            });
    }, []);

    return (
        <>
            <Header />
            <PageSC>
                <Text />
                <ul>
                    {todaysHabbits.map(habbit => <TodaysHabbit key={habbit.id} habbit={habbit} />)}
                </ul>
            </PageSC>
            <MenuFooter />
        </>
    )
}