var Cueue = function (){
    var container = undefined;
    var check = function(){
        if(!(container instanceof Array)){
            console.warn("container is not create.");
            return false;
        }else{
            return true;
        }
    }
    this.create= function(){
        container = [];
    }
    this.enqueue = function (parameter){
        if(!check()){
            return;
        }
        container[container.length] = parameter; 
        //or container.unshift(parameter)
    }
    this.dequeue = function(){
        if(!check()){
            return;
        }
        if(container.length === 0){
            console.warn("container has no item.");
            return;
        }
        return container.splice(0,1)[0];
        //or container.shift();
    }
    this.empty = function(){
        if(!check()){
            return;
        }
        if(container.length ===0){
            return true;
        }else{
            return false;
        }            
    }
    this.back = function(){
        if(!check()){
            return;
        }
        if(container.length ===0){
            console.warn("container has no item.");
            return ;
        }
        return container[container.length];
    }
    this.front = function(){
        if(!check()){
            return;
        }
        if(container.length ===0){
            console.warn("container has no item.");
            return ;
        }
        return container[0];
    }
}