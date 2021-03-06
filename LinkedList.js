var Node = function() {
    var value = undefined;
    var address = undefined;
    this.setValue = function(val) {
        value = val;
    }
    this.getValue = function() {
        return value;
    }
    this.setAddress = function(val) {
        address = val;
    }
    this.getAddress = function() {
        return address;
    }
}
var LinkedList = function() {
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
            buf.setAddress(b);
            buf = buf.getAddress();
        }
    }

    this.print = function() {
        traversalCallBack(first);
    }
    var traversalCallBack = function(node) {
        console.log(node.getValue());
        if (node.getAddress() === undefined) {
            console.log("On the Buttom.");
            return;
        }
        traversalCallBack(node.getAddress());
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
            data.setAddress(first);
            first = data;
            return;
        }

        for (var i = 0; i <= index; i++) {
            if (node === undefined) {
                node = first;
            } else {
                if (node.getAddress() === undefined) {
                    console.log("LinkedList length is less then " + index);
                    return;
                }
                node = node.getAddress();
            }
            console.log(node.getValue());
        };
        var bufAddress = node.getAddress();

        data.setAddress(bufAddress);
        node.setAddress(data);
    }
    this.deleteNode = function(index) {
        if (index === 0) {
            first = first.getAddress();
            return;
        }
        var node = undefined;
        var parent = undefined;
        for (var i = 0; i < index; i++) {
            if (node === undefined) {
                parent = first;
                node = parent.getAddress();
            } else {
                if (node.getAddress() === undefined) {
                    console.log("LinkedList length is less then " + index);
                    return;
                }
                parent = node;
                node = node.getAddress();

            }
        };

        if (node.getAddress() === undefined) {
            parent.setAddress(undefined);
            node = undefined;
            return;
        };
        var chrildNode = node.getAddress();
        parent.setAddress(chrildNode);
        node = undefined;
    }
    this.reverse = function() {
        var container = [];
        var node = first;
        container.push(node.getValue());
        while (node.getAddress() !== undefined) {
            node = node.getAddress();
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
                tmpNode.setAddress(b);
                tmpNode = tmpNode.getAddress();
            }
        };
        first = tmpFirst;
    }
    this.concatenation = function(linkedList) {
        var last = undefined;
        var node = first;
        while (node.getAddress() !== undefined) {
            node = node.getAddress();
        }
        node.setAddress(linkedList.getFirstNode());
    }
    this.getFirstNode = function() {
        return first;
    }
}

/* Test Code
    var b = new LinkedList();
    for (var i = 0; i <100; i++) {
        b.add(i.toString());
    };

    var b = new LinkedList();
    for (var i = 1; i < 4; i++) {
        b.add(i.toString());
    };
    var r = new Node();
    r.setValue("2.5");
    b.insert(2,r);
*/
