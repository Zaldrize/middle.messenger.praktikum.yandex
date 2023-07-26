import Block from "../components/block/block";

export function render(query: any, block: Block<any>) {
    const root = document.querySelector(query);
  
     
    root.appendChild(block.getContent());
  
    block.dispatchComponentDidMount();
  
    return root;
  } 
