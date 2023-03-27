import { FullList } from "../model/FullList";

interface DOMList{
      ul : HTMLUListElement,
      clear() : void,
      render(fullList : FullList) : void, 
}

export default class ListTemplate implements DOMList{
      ul : HTMLUListElement;
      static instance : ListTemplate = new ListTemplate();

      constructor(){
            this.ul = document.getElementById("listItems") as HTMLUListElement;
      }

      clear(): void {
          this.ul.innerHTML = '';
      }

      render(fullList: FullList): void {
          this.clear();
          fullList.list.forEach(obj => {
            const li = document.createElement("li") as HTMLLIElement;
            li.className = "item";

            const check = document.createElement("input") as HTMLInputElement;
            check.type = "checkbox";
            check.id = obj.id;
            check.tabIndex = 0;
            check.checked = obj.checked;
            li.append(check);

            check.addEventListener('change', () => {
                  obj.checked = !obj.checked;
                  fullList.save();
            })

            const label = document.createElement("label") as HTMLLabelElement;
            label.htmlFor = obj.id;
            label.textContent = obj.item;
            li.append(label);

            const button = document.createElement("button") as HTMLButtonElement;
            button.className = 'button';
            button.textContent = 'X';
            li.append(button);

            button.addEventListener('click', () => {
                  fullList.removeItem(obj.id);
                  this.render(fullList);
            });

            this.ul.append(li);
          });
      }
}