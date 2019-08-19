const API_BASE_URL = 'http://localhost:6541'
const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    headers.append('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTY2MTQ1NDA4LCJleHAiOjE1NjYyMDU0MDh9.qIWuwMUxzXDiMlQ1VmwY7dmHKRo5Q79JzDUYatobBByfAbntCj2xidNcgHGuWpxMhT-MWQhF92Ks-cxl5zMbTQ');

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function createPoll(pollData) {
    return request({
        url: API_BASE_URL + "/poll",
        method: 'POST',
        body: JSON.stringify(pollData)         
    });
}