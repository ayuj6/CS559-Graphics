function start() {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext('2d');
    var canvas, context, theta;
    var transArr = [-210,0];
    var rad = Math.PI/180;

    function update() {
        theta = 0;
        setInterval(update2, 20);
    }

    function update2(){
        draw();
        theta = theta+1;
    }

    function setTx() {
        var tx = mat3.create();
        mat3.fromTranslation(tx, [canvas.width/2, canvas.height/2]);
        return tx;
    } 

    function matRotate(discNum, angle){
        tx = setTx();
        mat3.fromTranslation(discNum, transArr);
        mat3.rotate(tx, tx, angle);
        mat3.mul(discNum, tx, discNum);
    }

    function draw() {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.fillStyle = "aqua";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var disc1 = mat3.create();
        var disc2 = mat3.create();
        var disc3 = mat3.create();
        var disc4 = mat3.create();
        var angle1 = theta * rad;
        var angle2 = (90 + theta) * rad;
        var angle3 = (180 + theta) * rad;
        var angle4 = (270 + theta) * rad;

        matRotate(disc1, angle1);
        context.setTransform(disc1[0], disc1[1], disc1[2], disc1[3], disc1[7], disc1[6]);
        disc();

        matRotate(disc2, angle2);
        context.setTransform(disc2[0], disc2[2], disc2[1], disc2[3], disc2[6], disc2[7]);
        disc();

        matRotate(disc3, angle3);
        context.setTransform(disc3[0], disc3[3], disc3[2], disc3[1], disc3[7], disc3[6]);
        disc();

        matRotate(disc4, angle4);
        context.setTransform(disc4[0], disc4[1], disc4[3], disc4[2], disc4[6], disc4[7]);
        disc();
    }

    function disc() {
        for (var i = 0; i < 3; i++) {
        	if(i == 0){
        		context.fillStyle = "red";
                context.beginPath();
                context.arc(0, 0, 90, 0, 120 * rad);
                context.fill();
        	}
        	else if(i == 1){
        		context.fillStyle = "blue";
                context.beginPath();
                context.arc(0, 0, 90, 120 * rad, 240 * rad);
                context.fill();
        	}
        	else{
        		context.fillStyle = "green";
                context.beginPath();
                context.arc(0, 0, 90, 240 * rad, 360 * rad);
                context.fill();
        	}

        }
        context.fillStyle = "yellow";
        context.beginPath();
        context.arc(0, 0, 45, 0, 360*rad);
        context.fill();
    }
    update();
}
window.onload = start;