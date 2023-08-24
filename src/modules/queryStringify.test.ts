import { expect } from "chai";
import { queryStringify } from "./fetch.ts";

describe('Test QueryStringify', () => {
    it('Пустая строка при пустом объекте', () => {
        expect(queryStringify({})).to.equal('');
        
    });

    it ('Проверка корректной строки при передачи объекта', () => {
        expect(queryStringify({ name: 'Galina', age: 27 })).to.equal('?name=Galina&age=27');
    });

})
