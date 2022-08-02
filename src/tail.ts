import { Stack } from "./dataStructures/collection/stack/Stack";
import { BinarySearchTree, BinaryNode } from "./dataStructures/collection/tree/BinarySerchTree";
import { Iterator } from "./dataStructures/iterator/Iterator";
import { ICompareable } from "./dataStructures/compare/ICompareable";

function tailMirror(stack: Stack<BinaryNode<any>>): void {
    const iterator = stack.iterator();

    if(!iterator.hasNext()) {
        return;
    }

    const node = iterator.next();

    let temp = node.left;
    node.left = node.right;
    node.right = temp;
    
    if(node.right) {
        stack.push(node.right);
    }
    
    if(node.left) {
        stack.push(node.left);
    }

    tailMirror(stack);
};

class Person implements ICompareable<Person>{
    age: number;

    constructor(age: number) {
        this.age = age;
    }

    compere(item: Person): number {

        if(this.age < item.age) {
            return -1;
        }
        else if(this.age > item.age) {
            return 1;
        }

        return 0;
    }
}

const roieTree: BinaryNode<Person> = {
    value: new Person(10),
    left: {
        value: new Person(5),        
    },
    right: {
        value: new Person(15),
        left: {
            value: new Person(13)
        }
    }
}


const roieStack = new Stack<BinaryNode<Person>>();
roieStack.push(roieTree);

console.log(`Before mirroring↓\nvalue: ${roieTree.value.age}\nleft: ${roieTree.left?.value.age}\nright: ${roieTree.right?.value.age}`);

tailMirror(roieStack);


console.log(`After mirroring↓\nvalue: ${roieTree.value.age}\nleft: ${roieTree.left?.value.age}\nright: ${roieTree.right?.value.age}`);