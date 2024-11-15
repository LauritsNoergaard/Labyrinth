export class Stack {
    tail = null;
    
    push(data) {
        const node = new Node(data)
        node.next = this.tail;
        this.tail = node;
    }

    pop() {
        // Removes node at the top, and returns it
        const node = this.tail;
        this.tail = node.next;
        return node;
    }

    peek() {
        // Return object on top of the stack without removing
        return this.tail;
    }

    size() {
        let node = this.tail;
        let size = 0;
        while (node) {
            size++;
            node = node.next;
        }

        return size;
    }

    get (index) {
        if (index < 0 || index >= this.size()) {
            console.log("Out of bounds, line 35 in stack")
            return null;
        }

        let node = this.tail;

        for (let i = 0; i < index; i++) {
            node = node.next;
        }

        return node.data;
    }

}

class Node {
    data = null;
    next = null;

    constructor (data) {
        this.data = data;
        this.next = this.tail;
    }
}