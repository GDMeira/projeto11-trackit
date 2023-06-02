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
                        value={day}
                        onClick={() => toggleDay(i)}
                        disabled={!formStates.isAbleToAnswer}
                        isSelected={formStates.days.includes(i)}
                    />)}
                </ButtonsSC>
                <ManegeButtonsSC>
                    <button
                        type='button'
                        disabled={!formStates.isAbleToAnswer}
                        onClick={() => setCreating(false)}
                    >
                        Cancelar
                    </button>
                    <button
                        type='submit'
                        disabled={!formStates.isAbleToAnswer}
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
                >
                    <IonIcon icon={add}></IonIcon>
                </button>
            </TitleSC>
            {content()}
        </>

    )
}

const TitleSC = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    margin: 20px 0;
    align-items: center;

    h1 {
        font-size: 23px;
        color: #126BA5;
    }

    > button {
        background-color: #52B6FF;
        width: 40px;
        height: 35px;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        border: none;

        ion-icon {
            --ionicon-stroke-width: 75px;
        }
    }
`;

const MakingNewHabbitSC = styled.form`
    height: 180px;
    width: 340px;
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 18px;
    margin-bottom: 30px;
`;

const InputSC = styled.input`
    width: 303px;
    height: 45px;
    padding-left: 10px;
    font-size: 20px;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    margin-bottom: 10px;
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

const ButtonWeekDateSC = styled.input`
    width: 30px;
    height: 30px;
    margin-right: 4px;
    font-size: 20px;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    color: ${props => props.isSelected ? '#fff' : '#DBDBDB'};
    background-color: ${props => props.isSelected ? '#CFCFCF' : '#fff'};
`;

const ManegeButtonsSC = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;

    button {
        font-size: 16px;
        width: 84px;
        height: 35px;

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
        margin-right: 20px;
    }

    button:nth-child(2) {
        background-color: #52B6FF;
        border: none;
        border-radius: 5px;
        color: #fff;
    }
`;

