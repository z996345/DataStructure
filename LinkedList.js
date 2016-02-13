var Node = function(){
        var value = undefined;
        var adress = undefined;
        this.setValue = function(val){
            value =  val;
        }
        this.getValue = function(){
            return value;
        }
        this.setAdress = function(val){
            adress = val;
        }
        this.getAdress = function(){
            return adress;
        }        
    }
    var LinkedList = function(){
        var first = undefined;
        var buf = undefined;
        var tmp = undefined;
        this.add = function (value){
            if(first === undefined){
                first = new Node();
                first.setValue(value);
                buf = first;
            }else{
                var b = new Node();
                b.setValue(value);
                buf.setAdress( b );
                buf = buf.getAdress();
            }
        }
        
        this.print = function(){
            traversalCallBack(first);
        }
        var traversalCallBack = function (node) {
            console.log(node.getValue());
            if(node.getAdress() === undefined){
                console.log("On the Buttom.");
                return;
            }
            traversalCallBack(node.getAdress());
        } 
        this.isEmpty = function () {
            if(first === undefined){
                return true;
            }
            return false;
        }

        this.insert =function (index,data) {
            var node = undefined;
            if (index === 0){
                data.setAdress(first);
                first = data;
                return;
            }

            for (var i = 0 ; i < index ; i++) {
                if( node === undefined){
                    node = first;
                }else{
                    if(node.getAdress() === undefined){
                        console.log("LinkedList length is less then " + index );
                        return;
                    }
                    node = node.getAdress();
                }
                console.log(node.getValue());
            };
            var bufAddress = node.getAdress();
           
            data.setAdress(bufAddress);
            node.setAdress(data);
        } 
        this.deleteNode = function (index) {
            if(index === 0){
                first = first.getAdress();
                return;
            }
            var node = undefined;
            var parent = undefined;
            for (var i = 0 ; i < index; i++) {
                if( node === undefined){
                    parent = first;
                    node = parent.getAdress();
                }else{
                    if(node.getAdress() === undefined){
                        console.log("LinkedList length is less then " + index );
                        return;
                    }
                    parent = node;
                    node = node.getAdress();
                    
                }
            };

            if (node.getAdress() === undefined) {
                parent.setAdress(undefined);
                node = undefined;
                return;
            };
            var chrildNode = node.getAdress();
            parent.setAdress(chrildNode);
            node = undefined;
        }
        this.reverse = function () {
            var container = [];
            var node = first;
            container.push(node.getValue());
            while(node.getAdress() !== undefined){
                node = node.getAdress();
                container.push(node.getValue());
            }
            var length = container.length;
            var tmpFirst = undefined;
            var tmpNode = undefined;
            for (var i = length - 1; i >= 0; i--) {
                if(tmpFirst === undefined){
                    tmpFirst = new Node();
                    tmpFirst.setValue(container[i]);
                    tmpNode = tmpFirst;
                }else{
                    var b = new Node();
                    b.setValue(container[i]);
                    tmpNode.setAdress( b );
                    tmpNode = tmpNode.getAdress();
                }
            };
            first = tmpFirst;
        }
        this.concatenation = function (linkedList) {
            var last = undefined;
            var node = first;
            while(node.getAdress() !== undefined){
                node = node.getAdress();
            }
            node.setAdress(linkedList.getFirstNode());
        }
        this.getFirstNode = function () {
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