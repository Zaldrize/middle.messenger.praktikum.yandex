import Block from "./components/block/block";

export function render(query: any, block: Block<Record<string, any>>) {
    const root = document.querySelector(query);
  
     
    root.appendChild(block.getContent());
  
    block.dispatchComponentDidMount();
  
    return root;
  } 