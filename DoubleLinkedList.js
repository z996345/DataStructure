var Node = function() {
    var value = undefined;
    var leftAddress = undefined;
    var rightAddress = undefined;
    this.setValue = function(val) {
        value = val;
    }
    this.getValue = function() {
        return value;
    }
    this.setLeftAddress = function(val) {
        leftAddress = val;
    }
    this.getLeftAddress = function() {
        return leftAddress;
    }
    this.setRightAddress = function(val) {
        rightAddress = val;
    }
    this.getRightAddress = function() {
        return rightAddress;
    }
}
var DoubleLinkedList = function() {
    var first = undefined;
    var last = undefined;
    var length = 0;
    var tmp = undefined;

    this.add = function(value) {
        if (first === undefined) {
            first = new Node();
            first.setValue(value);
            last = first;
        } else {
            var b = new Node();
            b.setValue(value);
            last.setRightAddress(b);
            b.setLeftAddress(last)
            last = last.getRightAddress();
        }
        length += 1;

    }

    this.print = function() {
        var node = first;
        var state = true;
        for (var i = 0; i < length; i++) {
            if (i + 1 === length) {
                break;
            }
            if (node.getRightAddress() === undefined) {
                node = last;
                state = false;
                console.warn("Node:" + i + "'s rightAddress is missing.");
                console.warn("Try get leftAddress.");
                break;
            }
            node = node.getRightAddress();
        }
        if (!state) {
            for (var i = length; i > 0; i--) {
                if (i - 1 === 0) {
                    break;
                }
                if (node.getLeftAddress() === undefined) {
                    state = undefined;
                    console.warn("Node:" + i + "'s leftAddress is missing.");
                    break;
                }
                node = node.getLeftAddress();
            }
        }
        if (state === true) {
            traversalRighCallBack(first);
        }
        if (state === false) {
            traversalLeftCallBack(last);
        }
        if (state === undefined) {
            console.error("Node link is missing.");
        }
    }
    this.printFormLeft = function() {
        var node = last;
        var state = false;
        //check
        for (var i = length - 1; i > 0; i--) {
            if (node.getLeftAddress() === undefined) {
                state = undefined;
                console.warn("Node:" + i + "'s leftAddress is missing.");
                break;
            }
            node = node.getLeftAddress();
        }
        if (state === false) {
            traversalLeftCallBack(last);
        }
        if (state === undefined) {
            console.error("Node link is missing.");
        }
    }
    var traversalRighCallBack = function(node) {
        console.log(node.getValue());
        if (node.getRightAddress() === undefined) {
            console.log("On the Buttom.");
            return;
        }
        traversalRighCallBack(node.getRightAddress());
    }
    var traversalLeftCallBack = function(node) {
        console.log(node.getValue());
        if (node.getLeftAddress() === undefined) {
            console.log("On the Buttom.");
            return;
        }
        traversalLeftCallBack(node.getLeftAddress());
    }

    this.isEmpty = function() {
        if (first === undefined || last === undefined) {
            return true;
        }
        return false;
    }

    this.insert = function(index, data) {

        if (index + 1 > length) {
            console.log("LinkedList length is less then " + index);
            return;
        }

        this.fixLinkList();
        length += 1;
        var node = undefined;
        if (index === 0) {
            data.setRightAddress(first);
            first.setLeftAddress(data);
            first = data;
            return;
        }
        if (index + 1 === length) {
            data.setLeftAddress(last);
            last.setRightAddress(data);
            last = last.getRightAddress();
            return;
        }

        for (var i = 0; i < index; i++) {
            if (node === undefined) {
                node = first;
            } else if (node.getRightAddress() === undefined) {
                console.log("Node " + i + "'s address is missing, try fix it.");

            }
            node = node.getRightAddress();
        };
        var bufAddress = node.getRightAddress();

        data.setRightAddress(bufAddress);
        bufAddress.setLeftAddress(data);

        node.setRightAddress(data);
        data.setLeftAddress(node);
    }
    this.deleteNode = function(index) {
        if (index + 1 > length) {
            console.log("LinkedList length is less then " + index);
            return;
        }
        this.fixLinkList();
        length -= 1;
        if (index === 0) {
            first = first.getRightAddress();
            first.setLeftAddress(undefined);
            return;
        }
        if (index + 1 === length) {
            last = last.getLeftAddress();
            last.setRightAddress(undefined);
            return;
        }
        var node = first;
        for (var i = 0; i < index; i++) {
            node = node.getRightAddress();
        }

        var chrildNode = node.getRightAddress();
        var parent = node.getLeftAddress();
        parent.setRightAddress(chrildNode);
        node = undefined;
        return;
    }
    this.reverse = function() {
        this.fixLinkList();
        var container = [];
        var node = first;
        container.push(node.getValue());
        while (node.getRightAddress() !== undefined) {
            node = node.getRightAddress();
            container.push(node.getValue());
        }
        var length = container.length;
        var tmpFirst = undefined;
        var tmpNode = undefined;
        for (var i = length - 1; i >= 0; i--) {
            if (tmpFirst === undefined) {
                tmpFirst = new Node();
                tmpFirst.setValue(container[i]);
                tmpNode = tmpFirst;
            } else {
                var b = new Node();
                b.setValue(container[i]);
                tmpNode.setRightAddress(b);
                tmpNode = tmpNode.getRightAddress();
            }
        };
        first = tmpFirst;
    }
    this.concatenation = function(linkedList) {
        this.fixLinkList();
        var node = first;
        while (node.getRightAddress() !== undefined) {
            node = node.getRightAddress();
        }
        node.setRightAddress(linkedList.getFirstNode());
    }
    this.getFirstNode = function() {
        return first;
    }
    this.getLength = function() {
        return length;
    }
    this.test = function() {
        console.log("test");
    }
    this.fixLinkList = function() {
        //check left
        var right = checkRight();
        //check right
        var left = checkLeft();

        if (right === undefined && left === undefined) {
            console.log("LinkList is fine.");
            return;
        }
        if (right !== undefined && left !== undefined) {
            console.log("LinkList can't fix.");
            return;
        }
        if (right !== undefined) {
            console.log("Fix right link list.");
            var tmp = getNodeFormLeft(right + 1);
            var upper = getNodeFormLeft(right);
            upper.setRightAddress(tmp);
            this.fixLinkList();
        }
        if (left !== undefined) {
            console.log("Fix left link list.");
            var tmp = getNodeFormRight(left - 1);
            var next = getNodeFormRight(left);
            next.setLeftAddress(tmp);
            this.fixLinkList();
        }
    }
    var checkRight = function() {
        var missNode = undefined;
        var node = first;
        for (var i = 0; i < length - 1; i++) {
            if (node.getRightAddress() === undefined) {
                console.log("Node " + i + "'s right address is missing.");
                missNode = i;
                break;
            }
            node = node.getRightAddress();
        }

        return missNode;
    }
    var checkLeft = function() {
        var missNode = undefined;
        var node = last;
        for (var i = length - 1; i > 0; i--) {
            if (node.getLeftAddress() === undefined) {
                console.log("Node " + i + "'s right address is missing.");
                missNode = i;
                break;
            }
            node = node.getLeftAddress();
        }
        return missNode;
    }

    var getNodeFormLeft = function(index) {
        var node = last;
        if (index + 1 >= length) {
            console.log("out of range");
            return;
        }
        for (var i = length - 1; i > index; i--) {
            if (node.getLeftAddress() === undefined) {
                console.error("Can't fix.");
                break;
            }
            node = node.getLeftAddress();
        }
        return node;
    }
    var getNodeFormRight = function(index) {
        var node = first;
        if (index + 1 >= length) {
            console.log("out of range");
            return;
        }
        for (var i = 0; i < index; i++) {
            if (node.getRightAddress() === undefined) {
                console.error("Can't fix.");
                break;
            }
            node = node.getRightAddress();
        }
        return node;
    }
}

/* Test Code
    var b = new DoubleLinkedList();
    for (var i = 0; i <100; i++) {
        b.add(i.toString());
    };

    var b = new DoubleLinkedList();
    for (var i = 1; i < 4; i++) {
        b.add(i.toString());
    };
    var r = new Node();
    r.setValue("2.5");
    b.insert(2,r);

    var a = new DoubleLinkedList();
    a.add("a")
    a.add("b")
    a.add("c")
    a.add("d")
    a.add("e")
    a.add("f")
    a.add("g")
    a.add("h")
    a.add("i")
    a.add("j")
    a.getLength();
    a.test()

    var b = a.getFirstNode()
    b.getRightAddress()
    b.setRightAddress(undefined)
    b.getRightAddress()

    a.print()

    var b = a.getFirstNode()
    b.getRightAddress()
    b.getRightAddress().getRightAddress().setLeftAddress(undefined)
    b.setRightAddress(undefined)
*/
