enum METHOD  {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

function queryStringify(data: Record<string, any>) {
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

export type Options = {
    timeout: number,
    headers: Record<string, string>,
    data: any
}

type HTTPMethod = (url: string, options: Options) => Promise<XMLHttpRequest>

export class HTTPTransport {
    get: HTTPMethod = (url, options) => {
        if (options.data) {
            url = `${url}${queryStringify(options.data)}`;
        }
        return this.request(url, METHOD.GET, options, options.timeout);
    };

    post: HTTPMethod = (url, options) => {
        return this.request(url, METHOD.POST, options, options.timeout);
    };

    put: HTTPMethod = (url, options) => {
        return this.request(url,METHOD.PUT, options, options.timeout);
    };

    delete: HTTPMethod = (url, options) => {
        return this.request(url, METHOD.DELETE, options, options.timeout);
    };

    request = (url: string, method: METHOD, options: Options, timeout: number = 5000) => {
        const { headers, data } = options;

        return new Promise<XMLHttpRequest>(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHOD.GET;

            xhr.open(
                method,
                url
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;
            xhr.withCredentials = true;
            xhr.setRequestHeader('accept', 'application/json');
            if (isGet || !data) {
                xhr.send();
            } 
            else if (data instanceof FormData) {
                xhr.send(data);
            }
            else {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
