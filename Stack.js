var Stack = function(){
    var container = undefined;
    this.create = function(){
        container = [];
    }
    this.push = function(parameter){
        if(!check()){
            return;
        }
        //container.push(parameter)
        container[container.length] = parameter;
    }
    this.pop = function(){
        if(!check()){
            return;
        }
        if(container.length === 0 ){
            console.warn("container has no items.");
            return;
        }
        return container.splice(container.length-1)[0];
        //or using container.pop()
    }
    this.empty = function(){
        if(!check()){
            return;
        }
        if(container.length === 0){
            return true;
        }else{
            return false;
        }
    }
    this.full = function(){
        if(!check()){
            return;
        }
        var max = 18446744073709551616;
        if(container.length >=max){
            return true;
        }else{
            return false;
        }
    }
    var check = function(){
        if(! (container instanceof Array) ) {
            console.warn("container is not init.");
            return false;
        }else{
            return true;
        }
    }
}