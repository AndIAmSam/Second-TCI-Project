import { EMAIL_API } from "./constants";

export async function sendEmail(data){
    try{
        const url = `${EMAIL_API}`;
        console.log("sending email");

        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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