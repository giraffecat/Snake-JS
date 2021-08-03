function Food(gameSnake) {
    var _this =this
    do{
        // 随机生成食物的位置
        this.row = parseInt(Math.random() * gameSnake.row);
        this.col = parseInt(Math.random() * gameSnake.col);
        console.log("position",this.row,this.col)
    }while(function() {
        for(let i = 0; i < gameSnake.snake.body.length; i++) {
            if(_this.row == gameSnake.snake.body[i].row && _this.col == gameSnake.snake.body[i].col) 
                return true; //如果为true则在执行一遍位置生成
        }
        return false;
    }())

}

Food.prototype.render = function() {
    game.setHtml(this.row, this.col, "✨")
}