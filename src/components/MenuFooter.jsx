import styled from "styled-components";
import { Pages } from "../constants/routes";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useContext, useEffect, useState } from "react";
import { HabbitsContext } from "../constants/Contexts";

export default function MenuFooter() {
    const { _otherStates, todaysHabbits } = useContext(HabbitsContext);
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        let percent = 0;
        todaysHabbits.forEach(habit => percent += (habit.done ? 1 / todaysHabbits.length : 0));
        setPercentage(percent * 100);
    },[todaysHabbits]);

    return (
        <MenuSC>
            <Link to={Pages.habbits} data-test='habit-link'>Hábitos</Link>
            <Link to={Pages.today} data-test='today-link'>
                <CircularProgressbar
                    value={percentage}
                    text={'Hoje'}
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#52B6FF",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent"
                    })}
                />
            </Link>
            <Link to={Pages.history} data-test='history-link' >Histórico</Link>
        </MenuSC>
    )
}

const MenuSC = styled.footer.attrs(() => ({'data-test':'menu'}))`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: #fff;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 ;

    a {
        font-size: 18px;
        text-decoration: none;
        color: #52B6FF;
        cursor: pointer;

        &:nth-child(2) {
            width: 90px;
            height: 90px;
            margin-bottom: 40px;
        
            .CircularProgressbar-text {
                font-family: 'Lexend Deca', sans-serif;
            }
        }
    }
`;