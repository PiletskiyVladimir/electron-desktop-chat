import Axios from "axios";

export async function getDataApi () {
    let data = await Axios({
        method: "GET",
        url: `${process.env.BACKEND_URL}/user`,
        headers: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzI0YjRkYThjNDBkNDRiNGU3NWVlZSIsImVtYWlsIjoicGlsZXRza2l5MTBAZ21haWwuY29tIiwidXNlclJvbGUiOiJ1c2VyIiwiaWF0IjoxNjIzMzQ2MjU5fQ.q7M502pQyTEyFJAIrUXVUeBXpYyIgKUbT3LGVh7BmGI"
        }
    })

    return data.data.data;
}