import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { HabbitsContext } from "../../constants/Contexts";
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';

export default function Text() {
    const { _otherStates, todaysHabbits } = useContext(HabbitsContext);

    const [states, setStates] = useState({phrase: 'Nenhum hábito concluído ainda',color: '#BABABA'});

    dayjs.locale('pt-br');
    const dateNow = dayjs(); // Obtém a data atual
    const nameWeekDay = filterName(dateNow.format('dddd')); // Retorna o nome do dia da semana (domingo, segunda, ..., sábado)
    const day = add0InName(dateNow.date()); // Retorna o dia do mês
    const month = add0InName(dateNow.month() + 1); //0 - janeiro
    
    

    useEffect(() => {
        let percentage = 0;
        todaysHabbits.forEach(habbit => percentage += (habbit.done ? 1 / todaysHabbits.length : 0));
        percentage = parseInt(percentage*100);
        if (percentage !== 0) {
            setStates({phrase: `${percentage}% dos hábitos concluídos`, color: '#8FC549'})
        }
    },[todaysHabbits]);

    function filterName(name) {
        let arrayName = name.split('');
        if (arrayName.includes('-')) {
            let newName = '';

            for(let c of arrayName) {
                if (c === '-') {
                    break;
                } else {
                    newName += c;
                }
            }

            return newName.charAt(0).toUpperCase() + newName.slice(1);
        }

        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    function add0InName(number) {
        if (number < 10) {
            return '0'+number
        }

        return number
    }

    return (
        <TextSC color={states.color}>
            <h1 data-test='today'>{nameWeekDay}, {day}/{month}</h1>
            <h2 data-test='today-counter'>{states.phrase}</h2>
        </TextSC>
    )
}

const TextSC = styled.div`
    width: 340px;
    text-align: left;
    margin-top: 30px;

    h1 {
        font-size: 23px;
        color: #126BA5;
    }

    h2 {
        font-size: 18px;
        color: ${props => props.color};
        margin-top: 5px;
        margin-bottom: 30px;
    }
`;