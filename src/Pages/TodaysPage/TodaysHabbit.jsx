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

    function dayOrDays(number) {
        if (number === 1) {
            return 'dia'
        } else {
            return 'dias'
        }
    }

    return (
        <HabbitContainer isDone={habbit.done}>
            <div>
                <h1 data-test='today-habit-name'>{habbit.name}</h1>
                <h2 data-test='today-habit-sequence'>
                    Sequêcnia atual: <span>{`${habbit.currentSequence} ${dayOrDays(habbit.currentSequence)}`}</span>
                </h2>
                <h2 data-test='today-habit-record'>
                    Seu recorde: {habbit.currentSequence === habbit.highestSequence ? (
                    <span>{`${habbit.highestSequence} ${dayOrDays(habbit.highestSequence)}`}</span>
                    ) : (`${habbit.highestSequence} ${dayOrDays(habbit.highestSequence)}`)} 
                </h2>
            </div>
            <button onClick={() => handleClick()} data-test='today-habit-check-btn'>
                <img src={check} alt='check' />
            </button>
        </HabbitContainer>
    )
}

const HabbitContainer = styled.li.attrs(() => ({'data-test':'today-habit-container'}))`
    width: 91vw;
    height: 14vh;
    background-color: #fff;
    color: #666666;
    border: none;
    border-radius: 0.75vh;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5vh;

    h1 {
        color: #666666;
        width: 91%;
        font-size: 3vh;
        margin-bottom: 1.5vh;
    }

    h2 {
        font-size: 2vh;
        margin-bottom: 0.3vh;
    }

    div {
        text-align: left;
    }

    button {
        width: 10vh;
        height: 10vh;
        border-radius: 0.75vh;
        border: ${props => props.isDone ? 'none' : '1px solid #E7E7E7'};
        background: ${props => props.isDone ? '#8FC549' : '#EBEBEB'};
    }

    span {
        color: ${props => props.isDone ? '#8FC549' : '#666666'};
    }
`;