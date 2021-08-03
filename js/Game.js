function Game() {
    //row
    this.row = 20;
    // column
    this.col = 20;
    // 初始化结点
    this.init();
    // 实例化蛇类
    this.snake = new Snake();
    // 初始化食物
    this.food = new Food(this);
    // 初始分数
    this.score = 0;
    // 执行定时器
    this.start();
    // 键盘事件监听
    this.bindEvent();
}

Game.prototype.clear = function() {
    // 擦除画布
    for(let i = 0; i < this.row; i++) {
        for(let j = 0; j < this.col; j++) {
            this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].style.background = "white"
            this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML = ""
        }
    }
    document.getElementById("app").appendChild(this.dom)
}

Game.prototype.init = function() {
    this.dom = document.createElement("table");
    var tr, td;
    // 遍历行和列
    for(let i = 0; i < this.row; i++) {
        tr = document.createElement("tr");
        for(let j = 0; j < this.col; j++) {
            td = document.createElement("td");
            // 追加到tr节点上
            tr.appendChild(td);
        }
        // 追加到结点树上
        this.dom.appendChild(tr);
    }
    document.getElementById("app").appendChild(this.dom)
}

// 颜色
Game.prototype.setColor = function (row, col, color) {
    // 让表格的第几行第几列设置颜色
    this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.background = color;
}

// 渲染食物
Game.prototype.setHtml = function(row, col, html) {
    this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].innerHTML = html;
}

// 设置键盘的事件监听
Game.prototype.bindEvent = function() {
    var _this = this;
    // 键盘事件
    document.onkeydown = function(event) {
        console.log(event)

        switch(event.keyCode) {
            case 65:
                // 先进行判断
                if(_this.snake.direction === "R") return;
                _this.snake.changeDirection("L");
                break;
            case 87:
                if(_this.snake.direction === "D") return;
                _this.snake.changeDirection("U");
                break;
            case 68:
                if(_this.snake.direction === "L") return;
                _this.snake.changeDirection("R");
                break;
            case 83:
                if(_this.snake.direction === "U") return;
                _this.snake.changeDirection("D");
                break;           
        }
    }
}

Game.prototype.start = function() {
    // 帧编号
    this.f = 0;
    this.timer = setInterval(function() {
        game.clear()

        game.f++;
        document.getElementById('f').innerHTML = "帧编号: "+ game.f
        // 渲染分数
        document.getElementById("score").innerHTML = "分:" + game.score
        // 定时器里面的核心就是游戏的渲染本质，清屏-更新-渲染
        // console.log(game.snake)
        // 蛇的更新速度 当蛇变长的时候 速度变快
        var duration = game.snake.body.length < 30 ? 30 - game.snake.body.length : 1;
        game.f % duration == 0 && game.snake.update();
        game.snake.render()
        // 渲染食物
        game.food.render()
    }, 20)
}
