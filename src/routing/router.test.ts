import { expect } from "chai";
import Block from "../components/block/block";
import { Router } from "./router";

describe('Test router', () => {
    class ExamplePage extends Block<any> {
        constructor() {
            const props = {};
            super('div', props);
        }
    }
    class AboutPage extends ExamplePage {}
    class HomePage extends ExamplePage {}
    const router = new Router('#app');
    router
        .use('/', HomePage)
        .use('/about', AboutPage)
        .start();
    it('Смена URL при переходе через роутер', () => {
        router.go('/about');
        expect(window.location.pathname).to.equal('/about');
    });

});
