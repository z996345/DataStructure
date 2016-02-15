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
    var buf = undefined;
    var tmp = undefined;
    this.add = function(value) {
        if (first === undefined) {
            first = new Node();
            first.setValue(value);
            buf = first;
        } else {
            var b = new Node();
            b.setValue(value);
            buf.setRightAddress(b);
            b.setLeftAddress(buf)
            buf = buf.getRightAddress();
        }
    }

    this.print = function() {
        traversalCallBack(first);
    }
    var traversalCallBack = function(node) {
        console.log(node.getValue());
        if (node.getRightAddress() === undefined) {
            console.log("On the Buttom.");
            return;
        }
        traversalCallBack(node.getRightAddress());
    }

    this.isEmpty = function() {
        if (first === undefined) {
            return true;
        }
        return false;
    }

    this.insert = function(index, data) {
        var node = undefined;
        if (index === 0) {
            data.setRightAddress(first);
            first.setLeftAddress(data);
            first = data;
            return;
        }

        for (var i = 0; i <= index; i++) {
            if (node === undefined) {
                node = first;
            } else {
                if (node.getRightAddress() === undefined) {
                    console.log("LinkedList length is less then " + index);
                    return;
                }
                node = node.getRightAddress();
            }
            console.log(node.getValue());
        };
        var bufAddress = node.getRightAddress();

        data.setRightAddress(bufAddress);
        bufAddress.setLeftAddress(data);

        node.setRightAddress(data);
        data.setLeftAddress(node);
    }
    this.deleteNode = function(index) {
        if (index === 0) {
            first = first.getRightAddress();
            first.setRightAddress(undefined);
            return;
        }
        var node = undefined;
        var parent = undefined;
        for (var i = 0; i < index; i++) {
            if (node === undefined) {
                parent = first;
                node = parent.getRightAddress();
            } else {
                if (node.getRightAddress() === undefined) {
                    console.log("LinkedList length is less then " + index);
                    return;
                }
                parent = node;
                node = node.getRightAddress();

            }
        };

        if (node.getRightAddress() === undefined) {
            parent.setRightAddress(undefined);
            node = undefined;
            return;
        };
        var chrildNode = node.getRightAddress();
        parent.setRightAddress(chrildNode);
        node = undefined;
    }
    this.reverse = function() {
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
        var last = undefined;
        var node = first;
        while (node.getRightAddress() !== undefined) {
            node = node.getRightAddress();
        }
        node.setRightAddress(linkedList.getFirstNode());
    }
    this.getFirstNode = function() {
        return first;
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
*/
