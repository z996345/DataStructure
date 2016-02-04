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
        var item = undefined;
        this.add = function (value){
            if(first === undefined){
                first = new Node();
                first.setValue(value);
                buf = first;
            }
            var b = new Node();
            b.setValue(value);
            
            buf.setAdress( b );
            buf =  buf.getAdress();
            console.log(buf.getValue());
        }
        
        this.getValue = function(){
            if(item === undefined){
                item = first;
            }
            if(item.getAdress() === undefined){
            }
            else{
                item = item.getAdress();
                console.log(item.getValue());
                this.getValue(item);
            }
            
        }
    }