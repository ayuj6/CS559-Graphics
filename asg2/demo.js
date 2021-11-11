var canvas,context,addbtn,removebtn;

spinners = [];

function start() {
    var currentNum = 0;
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext('2d');
    addbtn = document.getElementById("add");
    removebtn = document.getElementById("remove");

    function background(){
        context.beginPath();
        context.arc(0,0,100,0,2*Math.PI);
        context.fillStyle = "yellow";
        context.fill();
        context.restore();
 
        context.beginPath();
        context.rect(0,canvas.height-50,600,50);
        context.fillStyle = "green";
        context.fill();
        context.restore();

        context.beginPath();
        context.moveTo(300, 100);
        context.bezierCurveTo(260, 120, 260, 170, 360, 170);
        context.bezierCurveTo(380, 200, 450, 200, 470, 170);
        context.bezierCurveTo(550, 170, 550, 140, 520, 120);
        context.bezierCurveTo(560, 60, 500, 50, 470, 70);
        context.bezierCurveTo(450, 25, 380, 40, 380, 70);
        context.bezierCurveTo(330, 25, 280, 40, 300, 100);
        context.closePath();
        context.lineWidth = 5;
        context.strokeStyle = 'blue';
        context.fillStyle = '#8ED6FF';
        context.fill();
        context.stroke();
        context.fillStyle = "white";
        context.fill();
        context.restore();
    }

    function Shape(x_pos, y_pos, x_rate, y_rate) {
        this.xPos = x_pos;
        this.yPos = y_pos;
        this.dx = x_rate;
        this.dy = y_rate;
        this.theta = 0;
    }

    Shape.prototype.draw = function() {
        context.save();
        context.beginPath();
        context.translate(this.xPos, this.yPos);
        context.arc(0, 0, 20, 0, Math.PI*2);
        context.fillStyle = "red";
        context.fill();
        context.rotate(this.theta);

        for (var i = 0; i < 6; i++) {
            context.save();
            drawOuterShape();
            context.restore();
            context.rotate(Math.PI/3);
        }

        context.restore();
    }

    function drawOuterShape(){
        context.beginPath();
        context.translate(35, 0);
        context.rect(0,0,20,12);
        context.fillStyle = "black";
        context.fill();
    }

    Shape.prototype.update = function() {
        this.xPos = this.xPos + this.dx;
        this.yPos = this.yPos + this.dy;
        this.theta = this.theta + 0.2;

        if (this.xPos > canvas.width) {
            this.dx = this.dx * -1;
        } 
        if (this.xPos < 0) {
            this.dx = this.dx * -1;
        } 

        if (this.yPos > canvas.height) {
            this.dy = this.dy * -1;
        } 
        if (this.yPos < 0) {
            this.dy = this.dy * -1;
        } 

    }

    function draw() {
        context.beginPath();
        context.save();
        spinners.forEach(spinner => spinner.draw());
        context.restore();
    }

    function update() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        background();
        var len = spinners.length;

        for (var i = 0; i < len; i++) {
            spinners[i].update();

            for (var j = 0; j < len; j++) {
                if (i == j) {
                    continue;
                }
                else{
                    var spinner1 = spinners[i];
                    var spinner2 = spinners[j];

                    x_diff = Math.pow(spinner1.xPos - spinner2.xPos, 2);
                    y_diff = Math.pow(spinner1.yPos - spinner2.yPos, 2);

                    if(Math.sqrt(x_diff + y_diff) < 35){
                        spinner1.dx = spinner1.dx * -1;
                        spinner1.dy = spinner1.dy * -1;

                        spinner2.dx = spinner2.dx * -1;
                        spinner2.dy = spinner2.dy * -1;
                    }
                }
            }
        }

        draw();
        window.requestAnimationFrame(update);
    }

    addbtn.addEventListener("click", function(){
        if(currentNum < 5){
            currentNum = currentNum + 1;
            var xSpawn = Math.random() * canvas.width;
            var ySpawn = Math.random() * canvas.height;
            var dxSpawn = Math.random() * 3;
            var dySpawn = Math.random() * 3;
            var newInput = new Shape(xSpawn, ySpawn,dxSpawn, dySpawn);
            spinners.push(newInput);
        }
    });

    removebtn.addEventListener("click", function(){
        if(currentNum > 0){
            currentNum = currentNum - 1;
            spinners.pop();
        }
    });

    update();
}

window.onload = start;