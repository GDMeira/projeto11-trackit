import styled from "styled-components";
import check from '../../assets/check.svg';
import { useContext } from "react";
import { HabbitsContext, UserContext } from "../../constants/Contexts";
import axios from "axios";
import { BASE_URL, HeaderConfig, TickHabbit, UntickHabbit, updateTodaysHabbits } from "../../constants/routes";

export default function TodaysHabbit({habbit}) {
    const { todaysHabbits, setTodaysHabbits, allHabbits, setAllHabbits } = useContext(HabbitsContext);
    const { user, setUser } = useContext(UserContext);

    function handleClick() {
        if (!habbit.done) {
            axios.post(BASE_URL+TickHabbit(habbit.id),{}, HeaderConfig(user.token))
                .then(() => {
                    updateTodaysHabbits(user, setTodaysHabbits);
                })
                .catch(error => {
                    alert(error.ressponse.data.message);
                });
        } else {
            axios.post(BASE_URL+UntickHabbit(habbit.id),{}, HeaderConfig(user.token))
                .then(() => {
                    updateTodaysHabbits(user, setTodaysHabbits);
                })
                .catch(error => {
                    alert(error.ressponse.data.message);
                });
        }
        
    }

    return (
        <HabbitContainer isDone={habbit.done}>
            <div>
                <h1>{habbit.name}</h1>
                <h2>Sequêcnia atual: {habbit.currentSequence}</h2>
                <h2>Seu recorde: {habbit.highestSequence}</h2>
            </div>
            <button onClick={() => handleClick()}>
                <img src={check} alt='check' />
            </button>
        </HabbitContainer>
    )
}

const HabbitContainer = styled.li`
    width: 340px;
    height: 95px;
    background-color: #fff;
    color: #666666;
    border: none;
    border-radius: 5px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    h1 {
        font-size: 20px;
        margin-bottom: 5px;
    }

    h2 {
        font-size: 13px;
    }

    div {
        text-align: left;
    }

    button {
        width: 70px;
        height: 70px;
        border-radius: 5px;
        border: ${props => props.isDone ? 'none' : '1px solid #E7E7E7'};
        background-color: ${props => props.isDone ? '#8FC549' : '#EBEBEB'};
    }


`;