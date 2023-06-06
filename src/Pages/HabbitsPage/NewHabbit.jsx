import { useContext, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import { BASE_URL, CreateHabbit, HeaderConfig, updateAllHabbits } from '../../constants/routes';
import { HabbitsContext, UserContext } from '../../constants/Contexts';
import { useNavigate } from 'react-router-dom';

export default function NewHabbit() {
    const { user, _setUser } = useContext(UserContext);
    const { _otherStates, setAllHabbits, setTodaysHabbits} = useContext(HabbitsContext);

    const navigate = useNavigate();

    const [creating, setCreating] = useState(false);
    const [formStates, setFormStates] = useState(initialFormStates());

    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    function initialFormStates() {
        return {
            name: '',
            days: [],
            isAbleToAnswer: true
        }
    }

    function toggleDay(dayNumber) {
        if (formStates.days.includes(dayNumber)) {
            const newDays = formStates.days.filter(num => num !== dayNumber);
            setFormStates({ ...formStates, days: newDays });
        } else {
            const newDays = formStates.days;
            newDays.push(dayNumber);
            setFormStates({ ...formStates, days: newDays });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setFormStates({ ...formStates, isAbleToAnswer: false });
        const newHabbit = { name: formStates.name, days: formStates.days };
        axios.post(BASE_URL + CreateHabbit, newHabbit, HeaderConfig(user.token))
            .then(response => {
                setFormStates(initialFormStates());
                setCreating(false); //hidding forms
                const route = updateAllHabbits(user, setAllHabbits, setTodaysHabbits);

                if (route !== 'stay') {
                    navigate(route);
                }
            })
            .catch(error => {
                alert(error.response.data.message);
                setFormStates({ ...formStates, isAbleToAnswer: true });
            })
    }

    function content() {
        if (creating) {
            return <MakingNewHabbitSC creating={creating} onSubmit={e => handleSubmit(e)}>
                <InputSC
                    type="text"
                    placeholder='nome do hábito'
                    onChange={e => setFormStates({ ...formStates, name: e.target.value })}
                    value={formStates.name}
                    disabled={!formStates.isAbleToAnswer}
                />
                <ButtonsSC>
                    {weekDays.map((day, i) => <ButtonWeekDateSC
                        key={i}
                        type='button'
                        onClick={() => toggleDay(i)}
                        disabled={!formStates.isAbleToAnswer}
                        isSelected={formStates.days.includes(i)}
                    >
                        {day}
                    </ButtonWeekDateSC>
                    )}
                </ButtonsSC>
                <ManegeButtonsSC>
                    <button
                        type='button'
                        disabled={!formStates.isAbleToAnswer}
                        onClick={() => setCreating(false)}
                        data-test='habit-create-cancel-btn'
                    >
                        Cancelar
                    </button>
                    <button
                        type='submit'
                        disabled={!formStates.isAbleToAnswer}
                        data-test='habit-create-save-btn'
                    >
                        {formStates.isAbleToAnswer ? 'Salvar' : (<ThreeDots
                            height="30"
                            width="50"
                            radius="7"
                            color="#fff"
                            ariaLabel="three-dots-loading"
                            visible={true}
                        />)
                        }
                    </button>
                </ManegeButtonsSC>
            </MakingNewHabbitSC>
        } else {
            return
        }
    }

    return (
        <>
            <TitleSC>
                <h1>Meus hábitos</h1>
                <button
                    disabled={creating}
                    onClick={() => setCreating(!creating)}
                    data-test='habit-create-btn'
                >
                    <IonIcon icon={add}></IonIcon>
                </button>
            </TitleSC>
            {content()}
        </>

    )
}

const TitleSC = styled.div`
    width: 91vw;
    display: flex;
    justify-content: space-between;
    margin: 5vh 0;
    align-items: center;

    h1 {
        font-size: clamp(1rem, 5vh, 2rem);
        color: #126BA5;
    }

    > button {
        background-color: #52B6FF;
        width: 10.6vw;
        height: 6vh;
        color: #fff;
        font-size: 3vh;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.75vh;
        border: none;

        ion-icon {
            --ionicon-stroke-width: 75px;
        }
    }
`;

const MakingNewHabbitSC = styled.form.attrs(() => ({'data-test':'habit-create-container'}))`
    height: 27vh;
    width: 90vw;
    border-radius: 0.75vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 3.5vw;
    margin-bottom: 4.5vh;
`;

const InputSC = styled.input.attrs(() => ({'data-test':'habit-name-input'}))`
    width: 100%;
    min-height: 7vh;
    padding-left: 10px;
    font-size: 3vh;
    border: 1px solid #D4D4D4;
    border-radius: 0.75vh;
    margin-bottom: 1.5vh;
    color: ${props => props.disabled ? '#B3B3B3' : '#666666'};

    &::placeholder {
        color: #DBDBDB;
    }

    &:disabled {
        background-color: #F2F2F2;
    }
`;

const ButtonsSC = styled.div`
    width: 100%;
`;

const ButtonWeekDateSC = styled.button.attrs(() => ({'data-test':'habit-day'}))`
    width: 8vw;
    height: 4.5vh;
    margin-right: 1vw;
    font-size: 3vh;
    border: 1px solid #D4D4D4;
    border-radius: 0.75vh;
    color: ${props => props.isSelected ? '#fff' : '#DBDBDB'};
    background-color: ${props => props.isSelected ? '#CFCFCF' : '#fff'};
`;

const ManegeButtonsSC = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 3.5vh;

    button {
        font-size: 2.5vh;
        width: 22vw;
        height: 6vh;

        &:disabled {
            opacity: 0.7;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    button:nth-child(1) {
        background: none;
        border: none;
        color: #52B6FF;
        margin-right: 6vw;
    }

    button:nth-child(2) {
        background-color: #52B6FF;
        border: none;
        border-radius: 0.75vh;
        color: #fff;
    }
`;

