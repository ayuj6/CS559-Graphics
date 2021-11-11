function setup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    var slider1 = document.getElementById("slider1");
    var slider2 = document.getElementById("slider2");
    var slider3 = document.getElementById("slider3");

    // function used to draw the full canvas
    function draw() {
        var context = canvas.getContext('2d');
        canvas.width = canvas.width;

        // The pentagon is drawn with this function
        function DrawPentagon(color) {
            context.beginPath();
            context.fillStyle = color;
            context.moveTo(60,25);
            context.lineTo(110,75);
            context.lineTo(100,150);
            context.lineTo(20,150);
            context.lineTo(10, 75);
            context.closePath();
            context.strokeStyle = "maroon";
            context.lineWidth = 5; 
            context.stroke();
            context.fill();
        }

        // The cloud is drawn with this function
        function DrawCloud() {
            context.beginPath();
            context.moveTo(200, 80);
            context.bezierCurveTo(170, 100, 180, 150, 240, 140);
            context.bezierCurveTo(250, 180, 320, 180, 340, 140);
            context.bezierCurveTo(420, 150, 420, 120, 390, 100);
            context.bezierCurveTo(430, 40, 370, 30, 340, 50);
            context.bezierCurveTo(320, 5, 250, 20, 250, 50);
            context.bezierCurveTo(200, 5, 170, 75, 200, 80);
            context.closePath();
            context.lineWidth = 5;
            context.strokeStyle = 'blue';
            context.fillStyle = '#8ED6FF';
            context.fill();
            context.stroke();
        }

        // The star is drawn with this function
        function DrawStar() {
            var value = parseInt(slider3.value, 10);
            context.beginPath(); 
            context.moveTo(180,225);
            context.lineTo(220,325);
            context.lineTo(115,260); 
            context.lineTo(240,260);
            context.lineTo(130,325); 
            context.closePath();
            context.strokeStyle = 'rgb(' + value + ', 0, ' + (255 - value) + ')';
            context.fillStyle = 'rgb(' + value + ', 0, ' + (255 - value) + ')';
            context.fill();
            context.stroke();
        }

        //translation values for sliders
        var dx = slider1.value;
        var dy = slider2.value;

        context.save();
        context.translate(dx / 2, dy / 4);
        DrawPentagon("red");
        DrawCloud();
        DrawStar();
        context.restore();
    }

    draw();

    // listen for slider action
    slider1.addEventListener("input", draw);
    slider2.addEventListener("input", draw);
    slider3.addEventListener("input", draw);

}
window.onload = setup;
