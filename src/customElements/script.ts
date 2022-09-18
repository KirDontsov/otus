/* eslint-disable no-proto */
const tree = document.getElementById('DOMTree');
const style = document.createElement('style');
const dataTree = tree.getAttribute('data-tree');

export type HTMLElementClassType = new (...params: never[]) => HTMLElement;
export type ItemsType = { id: string; items: ItemsType }[];
export type DataTree = { id: string; items: ItemsType };

tree.attachShadow({
  mode: 'open',
});

// function MyTree extends HTMLElement without class syntax
function MyTree() {
  return Reflect.construct(HTMLElement, [], new.target);
}
MyTree.__proto__ = HTMLElement;
MyTree.prototype.__proto__ = HTMLElement.prototype;
customElements.define('my-tree', MyTree as unknown as HTMLElementClassType);

// function MyLeaf extends HTMLElement without class syntax
function MyLeaf() {
  return Reflect.construct(HTMLElement, [], new.target);
}
MyLeaf.__proto__ = HTMLElement;
MyLeaf.prototype.__proto__ = HTMLElement.prototype;
customElements.define('my-leaf', MyLeaf as unknown as HTMLElementClassType);

const createTreeElem = (treeElement: DataTree, parent: Node) => {
  const ul = document.createElement('my-tree');
  const li = document.createElement('my-leaf');
  li.appendChild(document.createTextNode(treeElement.id));
  ul.appendChild(li);
  parent.appendChild(ul);

  if (treeElement.items) {
    li.classList.add('parent');
    treeElement.items.forEach((item) => {
      createTreeElem(item, li);
    });
  }
  li.classList.add('element');
  return parent;
};

const createTree = (data: string) => createTreeElem(JSON.parse(data), new DocumentFragment());

style.textContent = `my-tree {
                      display: block;
                      margin-left: 16px;
                    }
                    .parent,
                    .element{
                       display: list-item;
                    }`;

tree.shadowRoot.appendChild(style);
tree.shadowRoot.appendChild(createTree(dataTree));
