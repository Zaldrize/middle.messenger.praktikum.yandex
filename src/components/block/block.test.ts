import Sinon from "sinon";
import Block from "./block.ts";
import { IBlockProps } from "./types.ts";
import Handlebars from 'handlebars'
import { expect } from "chai";

describe('Test block (component)', () => {
    class ExampleProps implements IBlockProps {
        text: string;
    }

    class ExampleComponent extends Block<ExampleProps> {
        constructor() {
            const props: ExampleProps = { text: "Hello there"};
            super('div', props);
        }
        render() {
            const template = `{{text}}`;
            const spec = Handlebars.compile(template);
            return this.compile(spec);        
        }

        componentDidUpdate(newProps: ExampleProps): boolean {
            return newProps.text !== this._props.text;
        }
    }

    it('Если пропсы остались те же, перерендер не происходит', () => {    
        const example = new ExampleComponent();    
        const spy = Sinon.spy(example, 'render');
        example.setProps({text: "Hello there"});
        expect(spy.called).to.equal(false);
    });

    it('При обновлении пропсов вызывается рендер', () => {
        const example = new ExampleComponent();    
        const spy = Sinon.spy(example, 'render');
        example.setProps({text: "General Kenobi"});
        expect(spy.called).to.equal(true);

    });

    it('Проверка сокрытия', ()=>{
        const example = new ExampleComponent();   
        example.hide();
        expect(example.element.style.display).to.equal('none');
    })

    it('Проверка показывания блока', ()=>{
        const example = new ExampleComponent();   
        example.hide();
        example.show();
        expect(example.element.style.display).to.equal('block');
    })



})
