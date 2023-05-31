export const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit';
export const SignIn = '/auth/sign-up';
export const Login = '/auth/login';
export const CreateHabbit = '/habits';
export const ListHabbits = '/habits';
export const DailyHabbitsHistory = '/habits/history/daily';
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
