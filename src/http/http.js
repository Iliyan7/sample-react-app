const BASE_URL = 'https://9sf7x3qadg.execute-api.eu-west-1.amazonaws.com/api/'

class Http {
    async get(endpoint = '') {
        const url = BASE_URL + endpoint
        const response = await fetch(url, {
            method: 'GET',
        });

        return response.json();
    }

    async post(endpoint = '', data = {}) {
        const url = BASE_URL + endpoint
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return response.json();
    }

    async update(endpoint = '', data = {}) {
        const url = BASE_URL + endpoint
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return response.json();
    }

    async delete(endpoint = '') {
        const url = BASE_URL + endpoint
        const response = await fetch(url, {
            method: 'DELETE',
        });

        return response.ok;
    }


}

export default new Http();