import { useEffect, useState, useContext } from "react";
import { UserContext } from '../../constants/Contexts';
import { FormSC } from "../../style/FormSC";
import axios from "axios";
import { BASE_URL, Login, Pages } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';


export default function LoginForms() {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    //TODO: retirar infos iniciais do states
    const [states, setStates] = useState({
        email: 'gmdelgado@gmail.com',
        password: '1234',
        isAbleToAnswer: true
    });

    useEffect(() => {
        if (user.email && user.password) {
            setStates({...states, email: user.email, password: user.password});
        }
    },[user]);

    function handleSubmit(e) {
        e.preventDefault();
        setStates({ ...states, isAbleToAnswer: false });
        axios.post(BASE_URL+Login, {email: states.email, password: states.password})
            .then(response => {
                navigate(Pages.habbits);
                console.log(response.data);
                setUser(response.data);
                setStates({ ...states, isAbleToAnswer: true });
            })
            .catch(error => {
                alert(error.response.data.message);
                setStates({ ...states, isAbleToAnswer: true });
            });
    }

    return (
        <FormSC onSubmit={e => handleSubmit(e)}>
            <input
                type="email"
                placeholder="email"
                pattern="^\w+(\.\w+)*@.+\.com$"
                disabled={!states.isAbleToAnswer}
                value={states.email}
                onChange={e => setStates({...states, email: e.target.value})}
                required
            />
            <input
                type="password"
                placeholder="senha"
                disabled={!states.isAbleToAnswer}
                value={states.password}
                onChange={e => setStates({...states, password: e.target.value})}
                required
            />
            <button type="submit" disabled={!states.isAbleToAnswer}>
                {states.isAbleToAnswer ? 'Entrar' : (<ThreeDots
                                                            height="40"
                                                            width="90"
                                                            radius="7"
                                                            color="#fff"
                                                            ariaLabel="three-dots-loading"

                                                            visible={true}
                                                        />)
                }
            </button>
        </FormSC>
    )
};