function Snake() {
    // 蛇的初始化身体
    this.body = [
        {"row": 3, "col": 7},
        {"row": 3, "col": 6},
        {"row": 3, "col": 5},
        {"row": 3, "col": 5},
        {"row": 3, "col": 4},
        {"row": 3, "col": 3},
        {"row": 3, "col": 2},
    ]
    // 蛇的运动方向
    this.direction = "R"
    // 即将改变的方向
    this.willDirection = "R"
}
// 蛇的运动
Snake.prototype.update = function() {
    // 当前的directon接受下一次的direction
    this.direction = this.willDirection
    switch(this.direction) {
        case "R": 
            this.body.unshift({"row": this.body[0].row, "col": this.body[0].col + 1});
            break;
        case "D": 
            this.body.unshift({"row": this.body[0].row + 1, "col": this.body[0].col});
            break;
        case "L": 
            this.body.unshift({"row": this.body[0].row, "col": this.body[0].col - 1});
            break;
        case "U": 
            this.body.unshift({"row": this.body[0].row - 1, "col": this.body[0].col});
            break; 
    }
    // 蛇吃食物 如果重合 则不删除尾部 如果重合 则删除尾部并且生成新的食物
    if(this.body[0].row == game.food.row && this.body[0].col == game.food.col){
        game.food = new Food(game)
        // 让帧数归零 因为吃到食物会闪一下
        game.f = 0;
        // 加分
        game.score++;

    } else {
        this.body.pop();
    }

    // 死亡的判断定 撞到了边缘
    if(this.body[0].col > game.col - 1 || this.body[0].row > game.row - 1 ||
        this.body[0].col < 0 || this.body[0].row < 0) {
        alert("结束了！")
        this.body.shift(); //删除是因为头增是不合法的
        clearInterval(game.timer)
    }
    // 自己撞到自己 也会判定死亡
    for(let i = 1; i < this.body.length; i++) {
        if(this.body[0].row == this.body[i].row 
            && this.body[0].col == this.body[i].col) {
            alert("碰撞 结束了！")
            this.body.shift(); //删除是因为头增是不合法的
            clearInterval(game.timer)
        }
    }
    
}

// 蛇的方向改变，防止的是在一次渲染之前出现掉头的情况 防抖
Snake.prototype.changeDirection = function(d) {
    this.willDirection = d;
}

Snake.prototype.render = function() {
    // 蛇的渲染
    game.setColor(this.body[0].row, this.body[0].col, "pink")
    // 蛇的身体
    for(var i = 1; i < this.body.length; i++) {
        game.setColor(this.body[i].row, this.body[i].col, "cyan")
    }
}