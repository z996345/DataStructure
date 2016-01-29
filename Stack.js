var Stack = function() {
    var container = undefined;
    var length = 18446744073709551616;
    this.create = function() {
        container = [];
    }
    this.push = function(value) {
        if (!check()) {
            return;
        }
        //container.push(value)
        container[container.length] = value;
    }
    this.pop = function() {
        if (!check()) {
            return;
        }
        if (container.length === 0) {
            console.warn("container has no items.");
            return;
        }
        return container.splice(container.length - 1)[0];
        //or using container.pop()
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
    this.full = function() {
        if (!check()) {
            return;
        }
        if (container.length >= length) {
            return true;
        }
        return false;
    }
    var check = function() {
        if (!(container instanceof Array)) {
            console.warn("container is not init.");
            return false;
        }
        return true;
    }
    this.create();
}
