import styled from "styled-components";
import { HabbitsContext, UserContext } from "../../constants/Contexts";
import Header from '../../components/Header';
import MenuFooter from "../../components/MenuFooter";
import { useContext, useEffect, useState } from "react";
import { Pages, updateHistoryHabits } from "../../constants/routes";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import './calendarStyle.css';
import { PageSC, TitlePageSC } from "../../style/PageSC";

//TODO: implementar PageSC

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
            <PageSC>
                <TitlePageSC>Histórico</TitlePageSC>
                <CalendarSC data-test="calendar">
                    <Calendar
                        style={{ height: '402px' }}
                        onChange={onChange}
                        value={date}
                        tileClassName={tileClassName}
                    />
                </CalendarSC>
            </PageSC>
            <MenuFooter />
        </>
    )
}

const CalendarSC = styled.div`
    scale: 2;
    position: absolute;
    top: 35vh;

    @media (max-width: 730px) {
        scale: 1;
    }
`;