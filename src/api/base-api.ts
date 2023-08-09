export class BaseAPI {
    //eslint-disable-next-line
    protected create(args: object) { 
        console.log(args);
        throw new Error('Not implemented');         
    }

    request() { throw new Error('Not implemented'); }

    update() { throw new Error('Not implemented'); }

    delete() { throw new Error('Not implemented'); }
}

export const baseUrl = 'https://ya-praktikum.tech/api/v2';
