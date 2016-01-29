var Cueue = function() {
    var container = undefined;
    var check = function() {
        if (!(container instanceof Array)) {
            console.warn("container is not create.");
            return false;
        }
        return true;
    }
    this.create = function() {
        container = [];
    }
    this.enqueue = function(value) {
        if (!check()) {
            return;
        }
        container[container.length] = value;
        //or container.unshift(value)
    }
    this.dequeue = function() {
        if (!check()) {
            return;
        }
        if (container.length === 0) {
            console.warn("container has no item.");
            return;
        }
        return container.splice(0, 1)[0];
        //or container.shift();
    }
    this.isEmpty = function() {
        if (!check()) {
            return;
        }
        if (container.length === 0) {
            return true;
        }
        return false;
    }
    this.back = function() {
        if (!check()) {
            return;
        }
        if (container.length === 0) {
            console.warn("container has no item.");
            return;
        }
        return container[container.length];
    }
    this.front = function() {
        if (!check()) {
            return;
        }
        if (container.length === 0) {
            console.warn("container has no item.");
            return;
        }
        return container[0];
    }
    this.create();
}
