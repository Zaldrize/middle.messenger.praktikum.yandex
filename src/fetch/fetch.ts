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
type Options = {
    timeout: number,
    headers: Record<string, string>,
    data: any,
    method: METHOD
}

type HTTPMethod = (url: string, options: Options) => Promise<unknown>

export class HTTPTransport {
    get: HTTPMethod = (url, options) => {

        return this.request(url, { ...options, method: METHOD.GET }, options.timeout);
    };

    post: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: METHOD.POST }, options.timeout);
    };

    put: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: METHOD.PUT }, options.timeout);
    };

    delete: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);
    };

    request = (url: string, options: Options, timeout: number = 5000) => {
        const { headers, method, data } = options;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHOD.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
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

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
