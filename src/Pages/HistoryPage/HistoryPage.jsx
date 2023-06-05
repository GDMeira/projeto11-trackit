import styled from "styled-components";
import { HabbitsContext, UserContext } from "../../constants/Contexts";
import Header from '../../components/Header';
import MenuFooter from "../../components/MenuFooter";
import { useContext, useEffect, useState } from "react";
import { updateHistoryHabits } from "../../constants/routes";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import './calendarStyle.css';

export default function HistoryPage() {
    const navigate = useNavigate();

    const { todaysHabbits, _otherStates } = useContext(HabbitsContext);
    const { user, _setUser } = useContext(UserContext);

    const [historyHabits, setHistoryHabits] = useState([]);
    const [date, onChange] = useState(new Date());

    useEffect(() => {
        updateHistoryHabits(user, setHistoryHabits)
            .then(resp => {
                if (resp !== 'stay') {
                    navigate(resp);
                }
            });
    }, [todaysHabbits]);

    const datesToAddClassTo = historyHabits.map(habitDay => {
        const day = { longDate: habitDay.day, allDone: true };

        if (habitDay.habits.some(habit => !habit.done)) {
            day.allDone = false;
        }

        return day
    });

    console.log(datesToAddClassTo);

    function isSameDay(day1, day2) {
        return day1 === dayjs(day2).format('DD/MM/YYYY')
    }

    function tileClassName({ date, view }) {
        if (isSameDay(dayjs().format('DD/MM/YYYY'), date)) {
            return
        }

        if (view === 'month') {
            let allTasksDone;

            if (datesToAddClassTo.some(dDate => {
                allTasksDone = dDate.allDone;
                return isSameDay(dDate.longDate, date)
            })
            ) {
                return (allTasksDone ? 'allDone' : 'notAllDone')
            }
        }
    }


    return (
        <>
            <Header />
            <TodaysHabbitsSC>
                <TextSC>
                    <h1>Histórico</h1>
                </TextSC>
                <div data-test="calendar">
                    <Calendar
                        style={{ height: '402px' }}
                        onChange={onChange}
                        value={date}
                        tileClassName={tileClassName}
                    />
                </div>
            </TodaysHabbitsSC>
            <MenuFooter />
        </>
    )
}

const TodaysHabbitsSC = styled.main`
    margin: 70px 0;
    min-height: calc(667px - 140px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #E5E5E5;
`;

const TextSC = styled.div`
    width: 340px;
    text-align: left;
    margin: 30px 0;

    h1 {
        font-size: 23px;
        color: #126BA5;
    }

    h2 {
        font-size: 18px;
        color: #666666;
        margin-top: 15px;
        margin-bottom: 30px;
    }
`;