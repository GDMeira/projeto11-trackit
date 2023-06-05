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
    height: 91px;
    width: 340px;
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 18px;
    margin-bottom: 10px;
`;

const ButtonDumpSC = styled.button.attrs((() => ({ 'data-test': 'habit-delete-btn' })))`
    width: 13px;
    height: 15px;
    border: none;
    background: none;
    position: absolute;
    top: 10px;
    right: 15px;
`;

const HabbitNameSC = styled.div.attrs((() => ({ 'data-test': 'habit-name' })))`
    width: 303px;
    height: 45px;
    font-size: 20px;
    margin-bottom: 10px;
    color: #666666;
`;

const ButtonsSC = styled.div`
    width: 100%;
`;

const ButtonWeekDateSC = styled.button.attrs((() => ({ 'data-test': 'habit-day' })))`
    width: 30px;
    height: 30px;
    margin-right: 4px;
    font-size: 20px;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    color: ${props => props.isSelected ? '#fff' : '#DBDBDB'};
    background-color: ${props => props.isSelected ? '#CFCFCF' : '#fff'};
`;