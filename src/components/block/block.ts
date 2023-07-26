import { EventBus } from "./eventBus";
import { v4 as makeUUID } from 'uuid';
import { IBlockEvents, IBlockProps } from "./types";

// Нельзя создавать экземпляр данного класса
class Block<T extends IBlockProps> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _element: HTMLElement;
  _meta;
  _props: Record<string, any>;
  _attributes: Record<string, string | number | boolean>;
  _children: Record<string, any>;
  _events: IBlockEvents
  _eventBus: EventBus;
  id: string;


  constructor(tagName: keyof HTMLElementTagNameMap = "div", blockProps: T) {
    const eventBus = new EventBus();
    const { attributes, events, ...propsAndChildren } = blockProps;
    if (attributes)
      this._attributes = attributes;
    if (events)
      this._events = events;
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

  getChildren(propsAndChildren: Record<string, any>) {
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
    this.componentDidMount();
  }
 
  // eslint-disable-next-line
  componentDidMount() { }

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }
  // eslint-disable-next-line
  _componentDidUpdate(newProps: T) {
    let update = this.componentDidUpdate(newProps);
    if (update) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // предполагается переопределять в наследнике
  componentDidUpdate(newProps: T): boolean {
    if (newProps) {
      return true;
    }
    return false;
  }

  setProps(nextProps: T) {
    if (!nextProps) {
      return;
    }
    const update = this.componentDidUpdate(nextProps);
    if (update) {
      const { attributes, events, ...propsAndChildren } = nextProps;
      if (attributes)
        Object.assign(this._attributes, attributes);
      if (events)
        Object.assign(this._events, events);
      const { children, props } = this.getChildren(propsAndChildren);
      Object.assign(this._props, props);
      if (children)
        Object.assign(this._children, children); // ???
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

  }

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    this.removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(block);
    this.addAttributes();
    this.addEvents();
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

  compile(template: (param?: any) => string) {
    const propsAndStubs = { ...this._props, ...this._attributes };

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
  addAttributes() {
    this._attributes && Object.keys(this._attributes).forEach((key) => {
      this._element.setAttribute(key, this._attributes[key].toString());
  });
  }
  addEvents() {
    if (this._events) {
      Object.keys(this._events).forEach(eventName => {
        this._element.addEventListener(eventName, this._events[eventName]);
      });
    }
  }

  removeEvents() {
    if (this._events) {
      Object.keys(this._events).forEach(eventName => {
        this._element.removeEventListener(eventName, this._events[eventName]);
      });
    }
  }
}

export default Block; 
