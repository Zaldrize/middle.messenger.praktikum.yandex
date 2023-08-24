import { expect } from "chai";
import { Router } from "./router.ts";
import Block from "../components/block/block.ts";
import Sinon from "sinon";

describe('Test router', () => {
    class ExamplePage extends Block<any> {
        constructor() {
            const props = {};
            super('div', props);
        }
        render() {
            return this.compile(()=>'');
        }
    }
    class AboutPage extends ExamplePage {}
    class HomePage extends ExamplePage {}
    class OtherPage extends ExamplePage {}
    const router = new Router('#app');
    router
        .use('/', HomePage)
        .use('/about', AboutPage)
        .use('/other', OtherPage)
        .start();
    it('Смена URL при переходе через роутер', () => {
        router.go('/about');
        expect(window.location.pathname).to.equal('/about');
    });

    it('Запись в историю при переходе', () => {
        const startLength = router.history.length;        
        router.go('/other');
        expect(router.history.length).to.equal(startLength+1);
    });

    it('Переход назад', () => {
        const spy = Sinon.spy(window.history, 'back');
        router.go('/');
        router.go('/other');
        router.back();
        expect(spy.calledOnce).to.equal(true);
    });
    it('Переход вперёд', () => {
        const spy = Sinon.spy(window.history, 'forward');
        router.go('/');
        router.go('/other');
        router.forward();
        expect(spy.calledOnce).to.equal(true);
    });

    

});
