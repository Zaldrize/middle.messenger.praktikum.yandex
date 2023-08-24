import { expect } from 'chai';
import Sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { HTTPTransport } from './fetch.ts'

describe('HTTPTransport test', () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let instance: HTTPTransport;
    const requests: SinonFakeXMLHttpRequest[] = [];
    beforeEach(() => {
        xhr = Sinon.useFakeXMLHttpRequest();

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore 
        global.XMLHttpRequest = xhr;

        xhr.onCreate = (req) => {
            requests.push(req);
        };

        instance = new HTTPTransport();
    });

    afterEach(() => {
        requests.length = 0;
        xhr.restore();
    });

    it('Метод get() должен быть вызван с GET', () => {
        instance.get('/', {data: null, headers: {}, timeout: 300});

        const [request] = requests;

        expect(request.method).to.equal('GET');
    });

    it('Метод post() должен быть вызван с POST', () => {
        instance.post('/', {data: {}, headers: {}, timeout: 300});

        const [request] = requests;

        expect(request.method).to.equal('POST');
    });

    it('Метод put() должен быть вызван с PUT', () => {
        instance.put('/', {data: {}, headers: {}, timeout: 300});

        const [request] = requests;

        expect(request.method).to.equal('PUT');
    });

    it('Метод delete() должен быть вызван с DELETE', () => {
        instance.delete('/', {data: {}, headers: {}, timeout: 300});

        const [request] = requests;

        expect(request.method).to.equal('DELETE');
    });
});
