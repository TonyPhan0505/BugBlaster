////////////////////// Import dependencies //////////////////////
import axios from 'axios';
import { backendURL } from './web.config';
///////////////////////////////////////////////////////////////

////////////////////// APIs //////////////////////
export const login = async (
    emailAddress, 
    password
) => {
    const response = await axios.post(`${backendURL}/team/login`, {
        emailAddress: emailAddress,
        password: password
    }).then(
        res => {
            const accessToken = res.data.accessToken;
            localStorage.setItem('accessToken', accessToken);
            return res; 
        }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const signUp = async (
    teamId,
    emailAddress,
    name,
    password
) => {
    const response = await axios.post(`${backendURL}/team/sign_up`, {
        teamId: teamId,
        emailAddress: emailAddress,
        name: name,
        password: password
    }).then(
        res => { 
            const accessToken = res.data.accessToken;
            localStorage.setItem('accessToken', accessToken);
            return res; 
        }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};
/////////////////////////////////////////////////