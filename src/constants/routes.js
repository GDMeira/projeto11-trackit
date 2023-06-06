import axios from "axios";

export const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit';
export const SignIn = '/auth/sign-up';
export const Login = '/auth/login';
export const CreateHabbit = '/habits';
export const ListHabbits = '/habits';
export const DailyHabitsHistory = '/habits/history/daily';
export const ListTodaysHabbits = '/habits/today';

export const DeleteHabbit = ID_DO_HABITO => `/habits/${ID_DO_HABITO}`;
export const TickHabbit = ID_DO_HABITO => `/habits/${ID_DO_HABITO}/check`;
export const UntickHabbit = ID_DO_HABITO => `/habits/${ID_DO_HABITO}/uncheck`;
export const HeaderConfig = token => {
    return {headers: {
                'Authorization': `Bearer ${token}`
            }}
};

export const Pages = {
    login: '/',
    signIn: '/cadastro',
    habbits: '/habitos',
    today: '/hoje',
    history: '/historico'
};

export async function updateTodaysHabbits(user, setTodaysHabbits) {
    let route;

    await axios.get(BASE_URL + ListTodaysHabbits, HeaderConfig(user.token))
        .then(response => {
            setTodaysHabbits(response.data);
            route = 'stay';
        })
        .catch(error => {
            alert(error.response.data.message);
            route = Pages.login;
        });

        return route
}

export async function updateAllHabbits(user, setAllHabbits, setTodaysHabbits) {
    let route;

    await axios.get(BASE_URL + ListHabbits, HeaderConfig(user.token))
            .then(response => {
                setAllHabbits(response.data);
                const route = updateTodaysHabbits(user, setTodaysHabbits);
            })
            .catch(error => {
                alert(error.response.data.message);
                route = Pages.login;
            });
    
    return route
}

export async function updateHistoryHabits(user, setHistoryHabits) {
    let route;

    await axios.get(BASE_URL + DailyHabitsHistory, HeaderConfig(user.token))
        .then(response => {
            setHistoryHabits(response.data);
            route = 'stay';
        })
        .catch(error => {
            alert(error.response.data.message);
            route = Pages.login;
        });

    return route
}
