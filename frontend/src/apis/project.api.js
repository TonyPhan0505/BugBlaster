////////////////////// Import dependencies //////////////////////
import axios from 'axios';

import { backendURL } from './web.config';
///////////////////////////////////////////////////////////////

////////////////////// APIs //////////////////////
export const login = async (
    projectName, 
    password
) => {
    const response = await axios.post(`${backendURL}/project/login`, {
        projectName: projectName,
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
    projectName,
    emailAddress,
    password
) => {
    const response = await axios.post(`${backendURL}/project/sign_up`, {
        projectName: projectName,
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
/////////////////////////////////////////////////