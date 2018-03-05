/**
 *  BinarySearchTree 二叉搜索树
 *  规则：一个父节点最多两个子节点(左侧子节点和右侧子节点) 左节点存储的值(key)比父节点小的值 (key) 右节点存储的值(key)比父节点大的值(key)
 */

/* eslint-disable no-unused-vars */
class BinarySearchTree {
    constructor() {
        this.Node = class { // 创建一个节点
            constructor(key) {
                this.key = key;
                this.left = null;
                this.right = null;
            }
        };
        this.root = null; // 根节点
    }

    insert(key) {
        const newNode = new this.Node(key);
        if (this.root === null) { // 如果此时没有root 就把当前插入的node 作为root
            this.root = newNode;
        } else { // 否则根据 key值往下比较 左小 右大
            this.insertNode(this.root, newNode);
        }
    }
    insertNode(node, newNode) { // 插入比较规则
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
                return;
            }
            this.insertNode(node.left, newNode);
        } else {
            if (node.right === null) {
                node.right = newNode;
                return;
            }
            this.insertNode(node.right, newNode);
        }
    }

    inOrderTraverse(callBack) { // 中序遍历  左-父-右
        this.inOrderTraverseNode(this.root, callBack); // 从根节点开始遍历 并把遍历出来的节点 作为参数传给callBack
    }
    inOrderTraverseNode(node, callBack) {
        if (node !== null) {
            this.inOrderTraverseNode(node.left, callBack); // 先遍历当前父节点左子树
            callBack(node.key); // 再遍历当前父节点
            this.inOrderTraverseNode(node.right, callBack); // 最后遍历当前父节点右子树
        }
    }

    preOrderTraverse(callBack) { // 先序遍历 父-左-右
        this.preOrderTraverseNode(this.root, callBack);
    }
    preOrderTraverseNode(node, callBack) {
        if (node !== null) {
            callBack(node.key); // 先遍历当前父节点
            this.preOrderTraverseNode(node.left, callBack); // 在当前父节点的左子树
            this.preOrderTraverseNode(node.right, callBack); // 最后当前父节点的右子树
        }
    }

    postOrderTraverse(callBack) { // 后序遍历 左-右-父
        this.postOrderTraverseNode(this.root, callBack);
    }
    postOrderTraverseNode(node, callBack) {
        if (node !== null) {
            this.postOrderTraverseNode(node.left, callBack); // 先当前父节点的左子树
            this.postOrderTraverseNode(node.right, callBack); // 再当前父节点的右子树
            callBack(node.key); // 最后当前父节点
        }
    }

    // 搜索最小值
    min() {
        return this.minNode(this.root);
    }
    minNode(node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left;
            }
            return node.key;
        }
        return null;
    }

    // 搜索最大值
    max() {
        return this.maxNode(this.root);
    }
    maxNode(node) {
        if (node) {
            while (node && node.right !== null) {
                node = node.right;
            }
            return node.key;
        }
        return null;
    }

    // 搜索特定值
    search(key) {
        return this.searchNode(this.root, key); // 从根节点开始查找
    }
    searchNode(node, key) {
        if (node === null) {
            return false;
        }
        if (key < node.key) {
            return this.searchNode(node.left, key);
        } else if (key > node.key) {
            return this.searchNode(node.right, key);
        }
        return true;
    }

    remove(key) { // 移除指定值 移除总共有三种情况
        this.root = this.removeNode(this.root, key);
    }
    findMinNode(node) { // 找到指定节点子树中最小值
        if (node) {
            while (node && node.left !== null) {
                node = node.left;
            }
            return node;
        }
        return null;
    }
    removeNode(node, key) {
        if (node === null) {
            return null;
        }
        if (key < node.key) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (key > node.key) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            // 第一种情况——移除一个叶节点
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }

            // 第二种情况——移除一个只有一个子节点的节点
            if (node.left === null) { // 有一个右子节点
                node = node.right;
                return node;
            }

            if (node.right === null) { // 有一个左子节点
                node = node.left;
                return node;
            }

            // 第三种情况——移除一个有两个子节点的节点
            const aux = this.findMinNode(node.right); // 找到要删除节点右子树中 最小值
            node.key = aux.key; // 用右子树的最小值 取代要删除的值 此时出现重复了
            node.right = this.removeNode(node.right, aux.key); // 再将右边重复的最小值删除
            return node;
        }
    }
}
