import styled from "styled-components";
import dump from '../../assets/dump.svg';
import { BASE_URL, DeleteHabbit, HeaderConfig, updateAllHabbits } from "../../constants/routes";
import { useContext, useState } from "react";
import { HabbitsContext, UserContext } from "../../constants/Contexts";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Habbit({ habbit }) {
    const { user, _setUser } = useContext(UserContext);
    const { _otherStates, setAllHabbits, setTodaysHabbits } = useContext(HabbitsContext);

    const navigate = useNavigate();

    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    function deleteHabbit() {
        const wannaDelete = confirm('Deletar hábito?');

        if (wannaDelete) {
            axios.delete(BASE_URL + DeleteHabbit(habbit.id), HeaderConfig(user.token))
            .then(() => {
                updateAllHabbits(user, setAllHabbits, setTodaysHabbits)
                    .then(resp => {
                        if (resp !== 'stay') {
                            navigate(resp);
                        }
                    });
            })
            .catch(error => {
                alert(error.response.data.message);
            });
        }
    }

    return (
        <>
            <HabbitContainerSC >
                <ButtonDumpSC onClick={() => deleteHabbit()}>
                    <img src={dump} alt="dump" />
                </ButtonDumpSC>
                <HabbitNameSC>
                    {habbit.name}
                </HabbitNameSC>
                <ButtonsSC>
                    {weekDays.map((day, i) => {
                        return <ButtonWeekDateSC
                            key={i}
                            isSelected={habbit.days.includes(i)}
                        >
                            {day}
                        </ButtonWeekDateSC>
                    })}
                </ButtonsSC>
            </HabbitContainerSC>
        </>
    )
}

const HabbitContainerSC = styled.li.attrs(() => ({ 'data-test': 'habit-container' }))`
    position: relative;
    height: 14vh;
    width: 90vw;
    border-radius: 0.75vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 4vw;
    margin-bottom: 1.5vh;
`;

const ButtonDumpSC = styled.button.attrs((() => ({ 'data-test': 'habit-delete-btn' })))`
    width: 3.8vw;
    height: 2.6vh;
    border: none;
    background: none;
    position: absolute;
    top: 10px;
    right: 15px;

    img {
        width: 100%;
        height: 100%;
    }
`;

const HabbitNameSC = styled.div.attrs((() => ({ 'data-test': 'habit-name' })))`
    color: #666666;
    width: 81vw;
    height: 7vh;
    padding-left: 10px;
    font-size: 3vh;
    margin-bottom: 1.5vh;
`;

const ButtonsSC = styled.div`
    width: 100%;
`;

const ButtonWeekDateSC = styled.button.attrs((() => ({ 'data-test': 'habit-day' })))`
    width: 8vw;
    height: 4.5vh;
    margin-right: 1vw;
    font-size: 3vh;
    border: 1px solid #D4D4D4;
    border-radius: 0.75vh;
    color: ${props => props.isSelected ? '#fff' : '#DBDBDB'};
    background-color: ${props => props.isSelected ? '#CFCFCF' : '#fff'};
`;