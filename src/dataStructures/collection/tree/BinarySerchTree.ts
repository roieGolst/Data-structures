import { Iterator } from "../../../designPatterns/iterator/Iterator";
import { IBinaryTree, IBinaryNode } from "./IBinaryTree";



export class BinaryNode<T> implements IBinaryNode<T>{
    public value: T;
    public left?: BinaryNode<T>;
    public right?: BinaryNode<T>;
    // public compare?: Compareable<T>;

    constructor(value: T, left?: BinaryNode<T>, right?: BinaryNode<T>, /*compareFun?: CompareItem*/) {
        this.value = value,
        this.left = left,
        this.right = right
        // this.compare = new Compareable(compareFun);
    }
}

export class BinarySearchTree<T> implements IBinaryTree<T> {
    private root: BinaryNode<T>;

    contains(item: T): boolean {
        const iterator = this.iterator();

        while(iterator.hasNext()) {
            const nodeVal = iterator.next();

            return nodeVal === item;
        }

        return false;
    }

    iterator(): Iterator<T> {
        let stack: BinaryNode<T>[] = []

        return {
       
        next: (): T => {
            let res = stack.pop();

            if(!res) {
                throw new Error("Out of bound");
            }

            if(res.right) {
                let cur: BinaryNode<T> | undefined = res.right;

                while(cur) {
                    stack.push(cur);
                    cur = cur.left
                }
            }   

            return res.value;
        },
    
        hasNext: (): boolean => {
            return stack.length !== 0;
        }

        }
    }

    insert(item: T): void {
        if(!this.root) {
            this.root = new BinaryNode<T>(item); 

            return;
        }

        this.insertNode(item, this.root);
    };

    private insertNode(item: T, currentNode: BinaryNode<T>): void {
        if(!this.root) {
            throw Error("Root is not declear");
        }

        if(currentNode.value == item) {
            return;
        }

        if(item > currentNode.value) {
            if(!currentNode.left) {
                this.setLeft(currentNode, item);
            }
            else {
                this.insertNode(item ,currentNode.left);
            }
        }

        if(item < currentNode.value) {
            if(!currentNode.right) {
                this.setright(currentNode, item);
            }
            else {
                this.insertNode(item ,currentNode.right);
            }
        }
    };

    search(item: T): BinaryNode<T> | undefined {
        throw new Error("Method not implemented yet")
    }
        

    delete(nodeValue: T): void { // WIP delete Nodes
        let currentNode = this.search(nodeValue);

        if(!currentNode) {
            console.error("Cannot delete a node that does not exist");
            return;
        }

        if(!currentNode.left || !currentNode.right) {
            currentNode = undefined;
            return;
        }

        if(currentNode.left) {
            const leftValue = currentNode.left.value;

            currentNode.left = undefined;

            this.insert(leftValue);
        }

        if(currentNode.right) {
            const rightValue = currentNode.right.value;

            currentNode.right = undefined;

            this.insert(rightValue);
        }

        currentNode = undefined;
    }

    forEach(cb: (cb: any) => any): void {
        const iterator = this.iterator();

        while(iterator.hasNext()) {
            cb(iterator.next());
        }
    }

    private setLeft(currentNode: BinaryNode<T> ,item: T): void {
        currentNode.left = new BinaryNode<T>(item);
    }

    private setright(currentNode: BinaryNode<T> ,item: T): void {
        currentNode.right = new BinaryNode<T>(item);
    }
}

//********Tests********//
// const myTree = new BinarySearchTree<number>()

// myTree.insert(10);
// myTree.insert(8);
// myTree.insert(15);
// myTree.insert(22);
// myTree.insert(27);
// myTree.insert(17);
// myTree.insert(7);

// console.log(myTree.search(10));


// myTree.delete(7);

// console.log(myTree.search(10));
