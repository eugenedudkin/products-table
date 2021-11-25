async function getApi(pattern: string) {
    const request = await fetch(`http://localhost:3001/${pattern}`);
    const data = await request.json();
    return data;
};

async function postApi(pattern: string, data: any) {
    const request = await fetch(
        `http://localhost:3001/${pattern}`, 
        {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers: {'Content-Type': 'application/json'}
        }
    )
}
async function deleteApi(pattern: string, id: any) {
    const request = await fetch(
        `http://localhost:3001/${pattern}/${id}`, 
        {
            method: 'DELETE', 
        }
    )
}
async function putApi(pattern: string, data: any, id: any) {
    const request = await fetch(
        `http://localhost:3001/${pattern}/${id}`, 
        {
            method: 'PUT', 
            body: JSON.stringify(data), 
            headers: {'Content-Type': 'application/json'}
        }
    )
}

export {
    getApi,
    postApi,
    deleteApi,
    putApi
}