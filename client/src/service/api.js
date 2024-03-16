import axios from 'axios';

const URL = 'http://localhost:8000';

export const authenticateSignup = async (data) =>{
    try{
        const response = await axios.post(`${URL}/signup`, data);
        return response.data;
    }
    catch(error){
        console.error("Error while calling signup API:", error);
        throw error; // Rethrow the error to handle it in the component
    }
}

export const authenticateLogin = async (data) =>{
  
    try{
        return await axios.post(`${URL}/login`, data)
    }  
    catch(error){
        console.log("Error while calling login api ",error);
        return error.response;
    }
}

export const createNewEntry = async (data) => {
    try {
        return await axios.post(`${URL}/entries`, data);
    } catch (error) {
        console.log("Error while calling createNewEntry API: ", error);
        throw error; 
    }
}

export const getAllRecords = async (username) => {
    try {
        const response = await axios.get(`${URL}/addresses`, { params: { username }});
        return response.data;
    } catch (error) {
        console.log("Error while fetching all records: ", error);
        throw error;
    }
}
export const getAddressById = async (id) => {
    try {
        const response = await axios.get(`${URL}/entries/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error while fetching address by id: ", error);
        throw error;
    }
}

export const updateRecord = async (id, data) => {
    try {
        await axios.put(`${URL}/entries/${id}`, data);
    } catch (error) {
        console.error("Error while updating record: ", error);
        throw error;
    }
}

export const deleteRecord = async (id) => {
    try {
        await axios.delete(`${URL}/entries/${id}`);
    } catch (error) {
        console.error("Error deleting record: ", error);
        throw error;
    }
}