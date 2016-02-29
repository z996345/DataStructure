var Node = function() {
    var value = undefined;
    var leftNode = undefined;
    var rightNode = undefined;
    var parent = undefined;
    this.getValue = function() {
        return value;
    }
    this.setValue = function(val) {
        value = val;
    }

    this.getLeftNode = function() {
        return leftNode;
    }
    this.setLeftNode = function(node) {
        leftNode = node;
    }

    this.getRightNode = function() {
        return rightNode;
    }
    this.setRightNode = function(node) {
        rightNode = node;
    }

    this.getParent = function() {
        return parent;
    }
    this.setParent = function(node) {
        parent = node;
    }
}

var BiTree = function() {
    var depth = 0;
    var count = 0;
    var root = undefined;
    var generation = [];
    this.init = function(val) {
        root = new Node();
        root.setValue(val);
        generation[0] = [root];
        count = 1;
    }
    this.add = function(val) {
        if (!checkInit()) {
            console.error("Bi Tree is not init.");
            return false;
        }
        var getNodeFather = compare(val);

        var fatherNode = getNodeFather[0];
        var fatherValue = fatherNode.getValue();
        var height = getNodeFather[1] + 1; //length

        if (fatherValue === val) {
            console.log("Already has this value.");
            return false;
        }
        var tmpNode = new Node();
        tmpNode.setValue(val);
        tmpNode.setParent(fatherNode);

        if (generation[height] !== undefined) {
            generation[height].push(tmpNode);
        } else {
            generation[height] = [tmpNode];
        }
        if (val > fatherValue) {
            fatherNode.setRightNode(tmpNode);
        } else if (val < fatherValue) {
            fatherNode.setLeftNode(tmpNode);
        }
        count += 1;
        return true;
    }
    this.getDepth = function() {
        return generation;
        // return generation.length;
    }
    this.getCount = function() {
        return count;
    }
    this.getRoot = function() {
        return root;
    }
    this.traverse = function(node) {
        if (node === undefined) {
            return;
        }
        console.log(node.getValue());
        this.traverse(node.getLeftNode());
        this.traverse(node.getRightNode());
    }
    this.getBrother = function(node) {
        var tmpNodeValue = node.getValue();
        var tmpParentNode = node.getParent();
        var tmpNode = undefined;
        if (tmpParentNode.getLeftNode().getValue() === tmpNodeValue) {
            tmpNode = tmpParentNode.getRightNode();
        }
        tmpNode = tmpParentNode.getLeftNode();
        if (tmpNode !== undefined) {
            return tmpNode;
        }
        return;
    }
    this.delete = function(val) {
        var tmpNode = compare(val);
        var maxNode = undefined;

        var height = tmpNode[1]; //index to length
        tmpNode = tmpNode[0];
        if (tmpNode.getValue() === val) {
            if (tmpNode.getLeftNode() === undefined && tmpNode.getRightNode() === undefined) {
                var parentNode = tmpNode.getParent();

                if (parentNode.getLeftNode()!== undefined && parentNode.getLeftNode().getValue() === val) {
                    var index = generation[height].indexOf(tmpNode);
                    generation[height].splice(index, 1);
                    checkGeneration();
                    parentNode.setLeftNode(undefined);
                    tmpNode = undefined;
                } else if (parentNode.getRightNode() !== undefined && parentNode.getRightNode().getValue() === val) {
                    var index = generation[height].indexOf(tmpNode);
                    generation[height].splice(index, 1);
                    checkGeneration();
                    parentNode.setRightNode(undefined);
                    tmpNode = undefined;
                } else {
                    console.error("error, parentNode is ", parentNode, ".");
                    return;
                }
            } else {
                maxNode = findMax(tmpNode.getLeftNode(), height + 1);
                var maxNodeHeight = maxNode[1];
                maxNode = maxNode[0];
                var maxNodeParent = maxNode.getParent();
                var maxNodeChild = maxNode.getLeftNode();
                if (maxNodeChild !== undefined) {
                    maxNodeChild.setParent(maxNodeParent);
                    maxNodeParent.setRightNode(maxNodeChild);
                    //移動肉粽
                    moveGeneration(maxNodeChild,maxNodeHeight);
                } else {
                    maxNodeParent.setRightNode(undefined);
                }
                //replace
                var index = generation[height].indexOf(tmpNode);
                generation[height][index] = maxNode;
                //remove
                var index = generation[maxNodeHeight].indexOf(maxNode);
                generation[maxNodeHeight].splice(index, 1);
                checkGeneration();
                tmpNode.setValue(maxNode.getValue());
            }
        }
        count -= 1;
    }

    this.query = function(node, val) {
        if (val === node.getValue()) {
            return node;
        }
        if (node.getLeftNode() === undefined && node.getRightNode() === undefined) {
            console.warn("Has not this value and return the parent node.");
            return node;
        }
        if (val < node.getValue()) {
            return this.query(node.getLeftNode(), val);
        } else if (val > node.getValue()) {
            return this.query(node.getRightNode(), val);
        }
    }
    this.test = function() {
        //checking code use
        console.log("test");
    }
    var checkInit = function() {
        if (root === undefined) {
            return false;
        }
        return true;
    }
    var compare = function(val) {
        var tmpNode = root;
        var newNodeValue = val;
        for (var i = 0; i < generation.length; i++) {
            if (newNodeValue > tmpNode.getValue()) {
                var node = tmpNode.getRightNode();
                if (node === undefined) {
                    return [tmpNode, i];
                }
                tmpNode = node;
            } else if (newNodeValue < tmpNode.getValue()) {
                var node = tmpNode.getLeftNode();
                if (node === undefined) {
                    return [tmpNode, i];
                }
                tmpNode = node;
            } else if (newNodeValue === tmpNode.getValue()) {
                return [tmpNode, i];
            }
        }
    }
    var findMax = function(node, height) {
        var tmpNode = node;

        while (tmpNode.getRightNode() !== undefined) {
            tmpNode = tmpNode.getRightNode();
            height += 1;
        }
        return [tmpNode, height];
    }
    var moveGeneration = function(node, height) {
        if (node === undefined) {
            return;
        }
        var nodeHeight = height + 1;
        //remove
        var index = generation[nodeHeight].indexOf(node);
        generation[nodeHeight].splice(index, 1);
        checkGeneration();
        //add
        var length = generation[height].length;
        generation[height].push(node);
        moveGeneration(node.getLeftNode(), nodeHeight);
        moveGeneration(node.getRightNode(), nodeHeight);
    }
    var checkGeneration = function () {
        var arr = generation;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].length <= 0 ) {
                arr.splice(i, 1);
            }
        }
    }
}

/*
var a = new BiTree()
a.init(5)
a.add(3)
a.add(1)
a.add(2)
a.add(4)
a.add(7)
a.traverse(a.getRoot())

var b = a.getRoot().getRightNode();
a.getBrother(b);

var b = a.query(a.getRoot(),3);
b.getValue();
var b = a.query(a.getRoot(),8);
b.getValue();

var a = new BiTree()
a.init(50)
a.add(30)
a.add(10)
a.add(20)
a.add(40)
a.add(70)
a.add(60)
a.add(18)
a.add(45)
a.traverse(a.getRoot())
a.delete(30)
a.traverse(a.getRoot())

a.getDepth();
a.getCount();
 */
