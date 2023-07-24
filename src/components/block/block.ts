import { EventBus } from "../../utils/eventBus";
import { v4 as makeUUID } from 'uuid';

// Нельзя создавать экземпляр данного класса
class Block<T extends Record<string, any>> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _element: HTMLElement;
  _meta;
  _props: Record<string, any>;
  _children: Record<string, any>;
  _eventBus: EventBus;
  id: string;


  constructor(tagName: keyof HTMLElementTagNameMap = "div", propsAndChildren: T) {
    const eventBus = new EventBus();
    const { props, children } = this.getChildren(propsAndChildren);
    this._props = this._makePropsProxy(props);
    this._children = children;
    this._meta = {
      tagName,
      props
    };
    this.id = makeUUID();
    this._eventBus = eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  getChildren(propsAndChildren: T) {
    const children: Record<string, any> = {};
    const props: Record<string, any> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount(this._props);
  }

  // eslint-disable-next-line
  componentDidMount(oldProps: Record<string, any>) { }

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }
  // eslint-disable-next-line
  _componentDidUpdate(oldProps: T, newProps: T) {
    let update = this.componentDidUpdate(oldProps, newProps);
    if (update) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }
  // eslint-disable-next-line
  componentDidUpdate(oldProps: Record<string,any>, newProps: Record<string, any>): boolean {
    return true;
  }

  setProps(nextProps: Record<string, any>) {
    if (!nextProps) {
      return;
    }
    const update = this.componentDidUpdate(this._props, nextProps);
    if (update) {
      Object.assign(this._props, nextProps);
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
    
  }

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    this._removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(block);
    this._addEvents();
  }

  // Переопределяется пользователем. Необходимо вернуть разметку
  render(): any {

  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Record<string, any>): Record<string, any> {
    // eslint-disable-next-line
    return new Proxy<Record<string, any>>(props, {
      get(target: Record<string, any>, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value
      },
      set(target: Record<string, any>, prop: string, value) {
        (target[prop] as T) = value;        
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  private _createDocumentElement<T extends keyof HTMLElementTagNameMap>(tagName: T) {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this.id);
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return element;
  }

  compile(template: (param?: any) => string, props: Record<string, any>) {
    const propsAndStubs = { ...props };

    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`
    });

    const fragment = this._createDocumentElement('template');

    fragment.innerHTML = template(propsAndStubs);

    Object.values(this._children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      stub?.replaceWith(child.getContent());
    });

    return fragment.content;
  }
  _addEvents() {
    const { events = {} } = this._props;

    Object.keys(events).forEach(eventName => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this._props;

    Object.keys(events).forEach(eventName => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }
  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}

export default Block; 