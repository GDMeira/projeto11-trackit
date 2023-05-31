import { useState } from "react";
import { FormSC } from "../../style/FormSC";
import { Pages, BASE_URL, SignIn } from "../../constants/routes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../constants/Contexts';
import { useContext } from 'react';
import { ThreeDots } from 'react-loader-spinner';

export default function SignInForms() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [states, setStates] = useState({
        email: '',
        password: '',
        name: '',
        image: '',
        isAbleToAnswer: true
    });

    function handleSubmit(e) {
        e.preventDefault();
        setStates({ ...states, isAbleToAnswer: false });
        const signInObj = states;
        delete signInObj.isAbleToAnswer;
        axios.post(BASE_URL + SignIn, signInObj)
            .then(response => {
                navigate(Pages.login);
                console.log(response.data);
                setUser(response.data);
                setStates({ ...states, isAbleToAnswer: true });
            })
            .catch(error => {
                alert(error.response.data.message);
                setStates({ ...states, isAbleToAnswer: true });
            })
    }

    return (
        <FormSC onSubmit={e => handleSubmit(e)}>
            <input
                type="email"
                placeholder="email"
                pattern="^\w+(\.\w+)*@.+\.com$"
                disabled={!states.isAbleToAnswer}
                value={states.email}
                onChange={e => setStates({ ...states, email: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="senha"
                disabled={!states.isAbleToAnswer}
                value={states.password}
                onChange={e => setStates({ ...states, password: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="nome"
                disabled={!states.isAbleToAnswer}
                value={states.name}
                onChange={e => setStates({ ...states, name: e.target.value })}
                required
            />
            <input
                type="url"
                placeholder="foto"
                disabled={!states.isAbleToAnswer}
                value={states.image}
                onChange={e => setStates({ ...states, image: e.target.value })}
                required
            />
            <button type="submit" disabled={!states.isAbleToAnswer}>
                {states.isAbleToAnswer ? 'Cadastrar' : (<ThreeDots
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