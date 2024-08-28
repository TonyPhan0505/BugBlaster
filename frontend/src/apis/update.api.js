////////////////////// Import dependencies //////////////////////
import axios from 'axios';

import { backendURL } from './web.config';
///////////////////////////////////////////////////////////////

////////////////////// APIs //////////////////////
export const getBulk = async (bugId) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/update/get_bulk`, {
        accessToken: accessToken,
        bugId: bugId
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const create = async (update) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/update/create`, {
        accessToken: accessToken,
        update: update
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const update = async (
    updateId,
    details,
    location
) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/update/update`, {
        accessToken: accessToken,
        updateId: updateId,
        details: details,
        location: location
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const deleteUpdate = async (updateId) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.delete(`${backendURL}/update/delete`, {
        data: {
            accessToken: accessToken,
            updateId: updateId
        }
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};
/////////////////////////////////////////////////