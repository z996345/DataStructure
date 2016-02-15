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
var CircularLinkedList = function() {
    var first = undefined;
    var last = undefined;
    var length = 0;
    this.add = function(value) {
        length += 1;
        if (first === undefined) {
            first = new Node();
            first.setValue(value);
            last = first;
        } else {
            var b = new Node();
            b.setValue(value);
            last.setAddress(b);
            last = last.getAddress();
            last.setAddress(first);
        }
    }

    this.print = function() {
        var i = 0;
        var node = first || last;
        while (i < length) {
            i++
            console.log(node.getValue());
            node = node.getAddress();
        }
        console.log("On the Buttom.");
    }
    this.isEmpty = function() {
        if (first === undefined && last === undefined) {
            return true;
        }
        return false;
    }

    this.insert = function(index, data) {
        if (index === 0) {
            last.setAddress(data);
            var tmpNode = first;
            data.setAddress(tmpNode);
            first = data;
            length += 1;
            return;
        }
        if ((index + 1) > length) {
            console.log("LinkedList length is less then " + index);
            return;
        }
        if ((index + 1) === length) {
            data.setAddress(first);
            last.setAddress(data);
            last = data;
            length += 1;
            return;
        }

        var node = undefined;
        for (var i = 0; i <= index; i++) {
            if (node === undefined) {
                node = first;
            } else {
                node = node.getAddress();
            }
        };
        console.log(node.getValue());
        var tmpAddress = node.getAddress();
        data.setAddress(tmpAddress);
        node.setAddress(data);
        length += 1;
    }
    this.deleteNode = function(index) {
        if (index === 0) {
            var tmpAddress = first.getAddress();
            last.setAddress(tmpAddress);
            first = tmpAddress;
            length -= 1;
            return;
        }
        if ((index + 1) > length) {
            console.log("LinkedList length is less then " + index);
            return;
        }
        var node = undefined;
        var parent = undefined;
        for (var i = 0; i < index; i++) {
            if (node === undefined) {
                parent = first;
                node = parent.getAddress();
            } else {
                parent = node;
                node = node.getAddress();
            }
        };


        if ((i + 1) === length) {
            parent.setAddress(first);
            last = parent;
            length -= 1;
            return;
        };
        console.log("test");

        var chrildNode = node.getAddress();
        parent.setAddress(chrildNode);
        node = undefined;
        length -= 1;
    }
    this.reverse = function() {
        var container = [];
        var node = first;
        for (var i = 0; i < length; i++) {
            container.push(node.getValue());
            node = node.getAddress();
        }
        var count = container.length;

        var tmpCircularLinkedList = new CircularLinkedList();
        for (var i = count - 1; i >= 0; i--) {
            tmpCircularLinkedList.add(container[i]);
        };
        first = tmpCircularLinkedList.getFirstNode();
        last = tmpCircularLinkedList.getLastNode();
    }
    this.concatenation = function(linkedList) {
        var firstNode = this.getFirstNode();
        var lastNode = this.getLastNode();
        lastNode.setAddress(linkedList.getFirstNode());
        console.log(lastNode.getValue());
        last = linkedList.getLastNode();
        last.setAddress(firstNode);
        console.log(last.getValue());
        length = length + linkedList.getNodeLength();
        console.log(length);
    }
    this.getFirstNode = function() {
        return first;
    }
    this.getLastNode = function() {
        return last;
    }
    this.getNodeLength = function() {
        return length;
    }
}

/* Test Code
    var b = new CircularLinkedList();
    for (var i = 0; i <100; i++) {
        b.add(i.toString());
    };

    var b = new CircularLinkedList();
    for (var i = 1; i < 4; i++) {
        b.add(i.toString());
    };
    var r = new Node();
    r.setValue("2.5");
    b.insert(2,r);
*/
