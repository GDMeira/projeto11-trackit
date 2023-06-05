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

    const [wannaDelete, setWannaDelete] = useState(false);

    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    function deleteHabbit() {
        setWannaDelete(false);
        axios.delete(BASE_URL + DeleteHabbit(habbit.id), HeaderConfig(user.token))
            .then(() => {
                const route = updateAllHabbits(user, setAllHabbits, setTodaysHabbits);

                if (route !== 'stay') {
                    navigate(route);
                }
            })
            .catch(error => {
                alert(error.response.data.message);
            });
    }

    return (
        <>
            {wannaDelete && <ConfirmingDeleteSC>
                <div>
                    <button onClick={() => setWannaDelete(false)}>Cancelar</button>
                    <button onClick={() => deleteHabbit()}>Confirmar</button>
                </div>
            </ConfirmingDeleteSC>}
            <HabbitContainerSC >
                <ButtonDumpSC onClick={() => setWannaDelete(true)}>
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

const ConfirmingDeleteSC = styled.section`
    height: 100vh;
    width: 100vw;
    opacity: 0.8;
    background-color: #000;
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
        width: 350px;
        height: 100px;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        button {
            font-size: 30px;
            background: none;
            border: none;
        }

        button:nth-child(2) {
            color: red;
        }
    }
`;

const HabbitContainerSC = styled.li.attrs(() => ({'data-test': 'habit-container'}))`
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

const ButtonDumpSC = styled.button.attrs((() => ({'data-test': 'habit-delete-btn'})))`
    width: 13px;
    height: 15px;
    border: none;
    background: none;
    position: absolute;
    top: 10px;
    right: 15px;
`;

const HabbitNameSC = styled.div.attrs((() => ({'data-test': 'habit-name'})))`
    width: 303px;
    height: 45px;
    font-size: 20px;
    margin-bottom: 10px;
    color: #666666;
`;

const ButtonsSC = styled.div`
    width: 100%;
`;

const ButtonWeekDateSC = styled.button.attrs((() => ({'data-test': 'habit-day'})))`
    width: 30px;
    height: 30px;
    margin-right: 4px;
    font-size: 20px;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    color: ${props => props.isSelected ? '#fff' : '#DBDBDB'};
    background-color: ${props => props.isSelected ? '#CFCFCF' : '#fff'};
`;