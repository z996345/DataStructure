/**
 * [Node Class]
 */
var Node = function() {
    var value = undefined;
    var leftNode = undefined;
    var rightNode = undefined;
    var parent = undefined;

    /**
     * [getValue 取得節點值]
     * @return {[Number]} [回傳節點值]
     */
    this.getValue = function() {
        return value;
    }

    /**
     * [setValue 設定節點值]
     * @param {[Number]} val [設定節點值]
     */
    this.setValue = function(val) {
        value = val;
    }

    /**
     * [getLeftNode 取得左側節點]
     * @return {[Node]} [回傳左側節點]
     */
    this.getLeftNode = function() {
        return leftNode;
    }

    /**
     * [setLeftNode 設定左側節點]
     * @param {[Node]} node [設定左側節點]
     */
    this.setLeftNode = function(node) {
        leftNode = node;
    }

    /**
     * [getRightNode 取得右側節點]
     * @return {[Node]} [回傳右側節點]
     */
    this.getRightNode = function() {
        return rightNode;
    }

    /**
     * [setRightNode 設定右側節點]
     * @param {[Node]} node [設定右側節點]
     */
    this.setRightNode = function(node) {
        rightNode = node;
    }

    /**
     * [getParent 取得父節點]
     * @return {[Node]} [回傳父節點]
     */
    this.getParent = function() {
        return parent;
    }

    /**
     * [setParent 設定父節點]
     * @param {[type]} node [設定父節點]
     */
    this.setParent = function(node) {
        parent = node;
    }
}

/**
 * [BiTree Class]
 */
var BiTree = function() {
    var depth = 0;
    var count = 0;
    var root = undefined;
    var generation = [];

    /**
     * [init 初始化Bi Tree物件]
     * @param  {[number]} val [初始化傳入的參數]
     */
    this.init = function() { //直接初始化
        root = new Node();
        depth = 0;
        count = 0;
        generation = [];
    }

    /**
     * [add 加入數值進行排序]
     * @param {[number]} val [要加入的數值]
     * @return {[bool]} [回傳是否成功新增，成功回傳True，失敗回傳False]
     */
    this.add = function(val) {
        //檢查Root是否有值
        if (root.getValue() === undefined) {
            root.setValue(val);
            generation[0] = [root];
            count = 1;
            return true;
        }
        //比較val該至於哪個節點底下
        var getNodeFather = compare(val);

        var fatherNode = getNodeFather[0];
        var fatherValue = fatherNode.getValue();
        var height = getNodeFather[1] + 1; //length
        //如果有了，則不新增，並回傳false
        if (fatherValue === val) {
            console.log("Already has this value.");
            return false;
        }
        //新增節點
        var tmpNode = new Node();
        tmpNode.setValue(val);
        tmpNode.setParent(fatherNode);

        //將節點新增至generation(同代陣列)中
        if (generation[height] !== undefined) {
            generation[height].push(tmpNode);
        } else {
            generation[height] = [tmpNode];
        }
        if (val > fatherValue) {
            fatherNode.setRightNode(tmpNode);
        } else if (val < fatherValue) {
            fatherNode.setLeftNode(tmpNode);
        }
        //節點總數+1
        count += 1;
        return true;
    }

    /**
     * [getLevel 取得Tree的深度]
     * @return {[number]} [回傳目前的節點深度]
     */
    this.getLevel = function() {
        return generation.length;
    }

    /**
     * [getCount 取得節點總數]
     * @return {[number]} [回傳目前的節點數量]
     */
    this.getCount = function() {
        return count;
    }

    /**
     * [getRoot 取得樹根節點]
     * @return {[Node]} [回傳樹根的節點]
     */
    this.getRoot = function() {
        return root;
    }

    /**
     * [inorderTraverse 前序遍歷BiTree]
     * @param  {[Node]} node [傳入要遍歷的節點]
     */
    this.inorderTraverse = function(node) {
        if (node === undefined) {
            return;
        }
        console.log(node.getValue());
        this.inorderTraverse(node.getLeftNode());
        this.inorderTraverse(node.getRightNode());
    }

    /**
     * [preorderTraverse 中序遍歷BiTree]
     * @param  {[Node]} node [傳入要遍歷的節點]
     */
    this.preorderTraverse = function(node) {
        if (node === undefined) {
            return;
        }
        this.preorderTraverse(node.getLeftNode());
        console.log(node.getValue());
        this.preorderTraverse(node.getRightNode());
    }

    /**
     * [postorderTraverse 後序遍歷BiTree]
     * @param  {[Node]} node [傳入要遍歷的節點]
     */
    this.postorderTraverse = function(node) {
        if (node === undefined) {
            return;
        }
        this.postorderTraverse(node.getLeftNode());
        this.postorderTraverse(node.getRightNode());
        console.log(node.getValue());
    }

    /**
     * [getBrother 取得兄弟節點]
     * @param  {[Node]} node [傳入要尋找兄弟的節點]
     * @return {[NOde]}      [回傳兄弟節點]
     */
    this.getBrother = function(node) {
        if(node === undefined){
            node = root;
        }
        if(node === root){
            console.warn("root has not brother.");
            return;
        }
        var tmpNodeValue = node.getValue();
        var tmpParentNode = node.getParent();
        var tmpNode = undefined;
        if (tmpParentNode.getLeftNode().getValue() === tmpNodeValue) {
            tmpNode = tmpParentNode.getRightNode();
        }
        tmpNode = tmpParentNode.getLeftNode();
        if (tmpNode !== undefined) {
            return tmpNode;
        }
        return;
    }

    /**
     * [deleteVal 刪除指定數值]
     * @param  {[Number]} val [傳入要刪除的數值]
     */
    this.deleteVal = function(val) { //刪除整個tree方法
        //使用者未輸入值
        if(val === undefined){
            console.warn("Please keyin param like delete(val).");
            return;
        }
        //取得父節點
        var tmpNode = compare(val);
        var maxNode = undefined;

        var height = tmpNode[1]; //index to length
        tmpNode = tmpNode[0];

        if (tmpNode.getValue() === val) {//如果父節點值與val相同
            //無子節點的情況
            if (tmpNode.getLeftNode() === undefined && tmpNode.getRightNode() === undefined) {
                var parentNode = tmpNode.getParent();
                //判斷是父節點的左側節點還是右側節點，以進行移除父節點的關聯
                if (parentNode.getLeftNode() !== undefined && parentNode.getLeftNode().getValue() === val) {
                    var index = generation[height].indexOf(tmpNode);
                    generation[height].splice(index, 1);
                    checkGeneration();
                    parentNode.setLeftNode(undefined);
                    tmpNode = undefined;
                } else if (parentNode.getRightNode() !== undefined && parentNode.getRightNode().getValue() === val) {
                    var index = generation[height].indexOf(tmpNode);
                    generation[height].splice(index, 1);
                    checkGeneration();
                    parentNode.setRightNode(undefined);
                    tmpNode = undefined;
                } else {
                    console.error("error, parentNode is ", parentNode, ".");
                    return;
            }
            } else {//有子節點的情況
                //取得節點最大值，並進行替換作業(以維持二元素的架構)
                maxNode = findMax(tmpNode.getLeftNode(), height + 1);//取得中序立即前行者(inorder immediate successor)
                var maxNodeHeight = maxNode[1];
                maxNode = maxNode[0];
                var maxNodeParent = maxNode.getParent();
                var maxNodeChild = maxNode.getLeftNode();
                //如果節點最大值的左側有節點時，必須要將左側節點與最大值節點的父節點關聯，才可移動最大值節點
                if (maxNodeChild !== undefined) {
                    maxNodeChild.setParent(maxNodeParent);
                    maxNodeParent.setRightNode(maxNodeChild);
                    //移動肉粽
                    moveGeneration(maxNodeChild, maxNodeHeight);
                } else {
                    maxNodeParent.setRightNode(undefined);
                }
                //同代這列的替換及移除
                //replace
                var index = generation[height].indexOf(tmpNode);
                generation[height][index] = maxNode;
                //remove
                var index = generation[maxNodeHeight].indexOf(maxNode);
                generation[maxNodeHeight].splice(index, 1);
                checkGeneration();
                tmpNode.setValue(maxNode.getValue());
            }
        }
        count -= 1;
    }

    /**
     * [deleteTree 刪除指定節點及子節點]
     * @param  {[Node]} node [傳入要刪除的節點]
     * @return {[bool]}      [回傳是否刪除成功，成功回傳True，不成功回傳False]
     */
    this.deleteTree = function(node) {
        //辨識Type是否正確
        if (!(node instanceof Node))  {
            console.warn("param node type error.");
            return;
        }
        //辨識是否為正確Node
        if (node.getValue() === undefined) {
            console.warn("node has no value.");
            return;
        }
        //是root的話，直接初始化
        if (node === root) {
            this.init();
            return true;
        }
        //比較是否有其值
        var tmp = compare(node.getValue());
        if (tmp[0] !== node) {
            console.warn("has not this node");
            return false;
        }

        var fatherNode = tmp[0].getParent();
        var height = tmp[1];
        //判斷是父節點的左側還是右側節點，並移除關聯
        if (fatherNode.getRightNode() === node) {
            fatherNode.setRightNode(undefined);
        }
        if (fatherNode.getLeftNode() === node) {
            fatherNode.setLeftNode(undefined);   
        }
        //移除節點，包含該節點以下的所有節點，
        removeNodeTree(node, height);
        return true;
    }

    /**
     * [query 由指定的節點開始查詢數值]
     * @param  {[Node]} node [傳入要查詢的節點]
     * @param  {[Number]} val  [傳入要查詢的數值]
     * @return {[Node]}      [回傳查詢到的節點]
     */
    this.query = function(node, val) {
        //使用者未傳入值
        if(node === undefined && val === undefined){
            console.warn("Please keyin param which is node and val.");
            return;
        }
        //找到相同的值
        if (val === node.getValue()) {
            return node;
        }
        //節點無子節點時
        if (node.getLeftNode() === undefined && node.getRightNode() === undefined) {
            console.warn("Has not this value.");
            return;
        }

        if (val < node.getValue()) {
            if (node.getLeftNode() === undefined) {
                console.warn("Has not this value.");
                return;
            }
            //
            return this.query(node.getLeftNode(), val);
        } else if (val > node.getValue()) {
            if (node.getRightNode() === undefined) {
                console.warn("Has not this value.");
                return;
            }
            return this.query(node.getRightNode(), val);
        }
    }

    /**
     * [test 測試用]
     */
    this.test = function() {
        //checking code use
        console.log("test");
    }

    /**
     * [removeNodeTree 自指定節點移除二元樹]
     * @param  {[Node]} node   [傳入要移除的節點]
     * @param  {[Number]} height [傳入要移除的節點的深度值]
     */
    var removeNodeTree = function (node, height) {
        //如果節點底下有子節點則遞迴至樹葉節點
        if (node.getLeftNode() !== undefined) {
            removeNodeTree(node.getLeftNode(), height+1);
        }
        if (node.getRightNode() !== undefined) {
            removeNodeTree(node.getRightNode(), height+1);
        }
        //取得同代陣列中的index值
        var index = generation[height].indexOf(node);
        //將該節點切割出來
        generation[height].splice(index, 1);
        //重新整理同代陣列
        checkGeneration();
        //移除節點
        node === undefined;
        count -=1;
    }

    /**
     * [checkInit 檢查是否初始化]
     * @return {[bool]} [已經初始化，回傳True，否則回傳False]
     */
    var checkInit = function() {
        if (root === undefined) {
            return false;
        }
        return true;
    }

    /**
     * [compare 將二元樹與所傳入的值進行比較，回傳所傳入的值的父節點及父節點的所屬深度]
     * @param  {[Number]} val [欲進行比較的值]
     * @return {[Array]}     [回傳陣列，其長度為2，Array[0]為所傳入的值的父節點，Array[1]為該父節點的節點深度]
     */
    var compare = function(val) {
        var tmpNode = root;
        var newNodeValue = val;
        for (var i = 0; i < generation.length; i++) {
            if (newNodeValue > tmpNode.getValue()) {//val比較大，向右
                var node = tmpNode.getRightNode();
                if (node === undefined) {
                    return [tmpNode, i];
                }
                tmpNode = node;
            } else if (newNodeValue < tmpNode.getValue()) {//val比較小，向左
                var node = tmpNode.getLeftNode();
                if (node === undefined) {
                    return [tmpNode, i];
                }
                tmpNode = node;
            } else if (newNodeValue === tmpNode.getValue()) {//一樣大，回傳該節點
                return [tmpNode, i];
            }
        }
    }

    /**
     * [findMax 取得最大值]
     * @param  {[Node]} node   [要搜尋的節點]
     * @param  {[Number]} height [該節點的深度值]
     * @return {[Array]}        [回傳陣列，其長度為2，Array[0]為傳入的節點中之最大值，Array[1]為該節點的節點深度]
     */
    var findMax = function(node, height) {
        var tmpNode = node;
        while (tmpNode.getRightNode() !== undefined) {
            tmpNode = tmpNode.getRightNode();
            height += 1;
        }
        return [tmpNode, height];
    }

    /**
     * [moveGeneration 移動同代陣列中的節點位置]
     * @param  {[Node]} node   [要被移動的節點]
     * @param  {[Number]} height [要被移動的節點的父節點深度]
     */
    var moveGeneration = function(node, height) {
        if (node === undefined) {
            return;
        }
        var nodeHeight = height + 1;
        //remove
        var index = generation[nodeHeight].indexOf(node);
        generation[nodeHeight].splice(index, 1);
        checkGeneration();
        //add
        var length = generation[height].length;
        generation[height].push(node);
        moveGeneration(node.getLeftNode(), nodeHeight);
        moveGeneration(node.getRightNode(), nodeHeight);
    }

    /**
     * [checkGeneration 檢查同代陣列，若該陣列中無值，則於同代陣列中刪除]
     */
    var checkGeneration = function() {
        var arr = generation;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].length <= 0) {
                arr.splice(i, 1);
            }
        }
    }

    this.init();
}
/*
var a = new BiTree()
a.add(5)
a.add(3)
a.add(1)
a.add(2)
a.add(4)
a.add(7)
a.inorderTraverse(a.getRoot())
var b = a.getRoot().getRightNode();
a.getBrother(b);
var b = a.query(a.getRoot(),3);
b.getValue();
var b = a.query(a.getRoot(),8);
b.getValue();
var a = new BiTree()
a.add(50)
a.add(30)
a.add(10)
a.add(20)
a.add(40)
a.add(70)
a.add(60)
a.add(18)
a.add(45)
a.inorderTraverse(a.getRoot())
a.delete(30)
a.inorderTraverse(a.getRoot())
a.getDepth();
a.getCount();

var a = new BiTree()
a.add(50)
a.add(30)
a.add(10)
a.add(20)
a.add(40)
a.add(70)
a.add(60)
a.add(18)
a.add(45)
var b = a.query(a.getRoot(),30)
a.test()
a.deleteTree(b)
 */
