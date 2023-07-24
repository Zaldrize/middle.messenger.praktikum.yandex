import Block from "./components/block";

export function render(query: any, block: Block<Record<string, any>>) {
    const root = document.querySelector(query);
  
      // Можно завязаться на реализации вашего класса Block
    root.appendChild(block.getContent());
  
      block.dispatchComponentDidMount();
  
    return root;
  } 