////////////////////// Import dependencies //////////////////////
import axios from 'axios';
import { backendURL } from './web.config';
///////////////////////////////////////////////////////////////

////////////////////// APIs //////////////////////
export const getBulk = async (teamId) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/bug/get_bulk`, {
        accessToken: accessToken,
        teamId: teamId
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const get = async (bugId) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/bug/get`, {
        accessToken: accessToken,
        bugId: bugId
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const create = async (bug) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.post(`${backendURL}/bug/create`, {
        accessToken: accessToken,
        bug: bug
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const update = async (bug) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.put(`${backendURL}/bug/update`, {
        accessToken: accessToken,
        bug: bug
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};

export const deleteBug = async (bugId) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.delete(`${backendURL}/bug/delete`, {
        data: {
            accessToken: accessToken,
            bugId: bugId
        }
    }).then(
        res => { return res; }
    ).catch(
        err => { console.error(err); }
    );
    return response;
};
/////////////////////////////////////////////////