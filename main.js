class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(array);
  }

  buildTree(arr) {
    let array = [...new Set(arr)];
    array.sort((a, b) => a - b);

    if (array.length === 0) {
      return null;
    }

    let midpoint = parseInt(array.length / 2);
    let newNode = new Node(array[midpoint]);
    let leftHalf = array.slice(0, midpoint);
    let rightHalf = array.slice(midpoint + 1);

    newNode.left = this.buildTree(leftHalf);
    newNode.right = this.buildTree(rightHalf);

    return newNode;
  }

  insert(value) {
    let current = this.root;

    while (
      (value <= current.data && current.left) ||
      (value > current.data && current.right)
    ) {
      if (value <= current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    if (value <= current.data) {
      current.left = new Node(value);
      return;
    } else {
      current.right = new Node(value);
      return;
    }
  }

  deleteItem(value) {
    let base = this.root;
    let current = this.root;
    if (current.data === value) {
      current = current.right;
      while (current.left) {
        current = current.left;
      }
      base.data = current.data;
      current.data = null;
      return;
    }
    while (current.left.data !== value && current.right.data !== value) {
      if (value < current.left.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    if (value < current.data) {
      let deleteNode = current.left;
      if (deleteNode.left && deleteNode.right) {
        let switchNode = deleteNode;
        if (switchNode.right) {
          switchNode = switchNode.right;
        }
        while (switchNode.left) {
          switchNode = switchNode.left;
        }
        deleteNode.data = switchNode.data;
        switchNode.data = null;
        return;
      }

      if (deleteNode.left || deleteNode.right) {
        if (deleteNode.left) {
          current.left = deleteNode.left;
          return;
        } else {
          current.left = deleteNode.right;
          return;
        }
      }

      deleteNode.data = null;
    } else {
      let deleteNode = current.right;
      if (deleteNode.left && deleteNode.right) {
        let switchNode = deleteNode;
        if (switchNode.right) {
          switchNode = switchNode.right;
        }
        while (switchNode.left) {
          switchNode = switchNode.left;
        }
        deleteNode.data = switchNode.data;
        switchNode.data = null;
        return;
      }

      if (deleteNode.left || deleteNode.right) {
        if (deleteNode.left) {
          current.right = deleteNode.left;
          return;
        } else {
          current.right = deleteNode.right;
          return;
        }
      }

      deleteNode.data = null;
    }
  }

  find(value) {
    let current = this.root;

    while (current.data !== value) {
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return current;
  }
}
