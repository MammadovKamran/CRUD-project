class Ajax {
    constructor() {
        this.xhr = new XMLHttpRequest();
        this.url = 'http://localhost:3000/products'
    }

    post(data, callback) {
        this.xhr.open('POST', this.url, true);

        this.xhr.setRequestHeader('content-type', 'application/json');

        this.xhr.onload = () => {
            if (this.xhr.status === 201) {
                let response = JSON.parse(this.xhr.responseText);
                callback(null, response);
            } else {
                callback(this.xhr.statusText, null)
            }
        }

        this.xhr.send(JSON.stringify(data));
    }

    get(callback, urlEncoder) {
        if (urlEncoder) {
            this.url += `/${urlEncoder}`
        }


        this.xhr.open('GET', this.url, true);


        this.xhr.onload = () => {
            if (this.xhr.status === 200) {
                let response = JSON.parse(this.xhr.responseText);
                let dataCounter;
                if (response instanceof Array)
                {
                    dataCounter = response.length;
                }
            else
                {
                    dataCounter = 1
                }
                callback(null, response, dataCounter)
            } else {
                callback(this.xhr.statusText, null, null)
            }
        }


        this.xhr.send();
    }

    put(data,callback,urlEncoder){
        let endPoint = this.url + `/${urlEncoder}`;
        this.xhr.open('PUT',endPoint,true);

        this.xhr.setRequestHeader('content-type','application/json');

        this.xhr.onload = () => {
            if(this.xhr.status === 200) {
                let response = JSON.parse(this.xhr.responseText);
                callback(null,response);
            } else {
                callback(this.xhr.statusText,null)
            }
        }

        this.xhr.send(JSON.stringify(data));
    }

    setId(one, paramsInput) {
        let initialNumber = Number(paramsInput.value);
        initialNumber += 1;
        paramsInput.value = initialNumber;
        return initialNumber;
    }
}