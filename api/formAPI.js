import { API_URL } from "./constants";

export async function loginAPI(formData){
    try{
        const url = `${API_URL}/auth/local`;

        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch(url, params);
        const result = await response.json();
        //console.log(result);
        return result;
    } catch(error) {
        console.log(error);
        return null;
    }
}


export async function registerAPI(formData){
    try{
        const url = `${API_URL}/auth/local/register`;

        console.log(url);
    
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        console.log(params);

        const response = await fetch(url, params);
        const result = await response.json();
        console.log(result);
        return result;
    } catch(error) {
        console.log(error);
        return null;
    }
}