function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var start;
    var stack = [mat4.create()];
    var hermite_pts;
    var perspective;
    var camera = vec3.create();
    var T_look_at = mat4.create();

    function lookAt() {
        camera[0] = 130 * Math.sin(perspective*Math.PI/180);
        camera[1] = 30;
        camera[2] = 130 * Math.cos(perspective*Math.PI/180);
        mat4.lookAt(T_look_at, camera, [0, 0, 0], [0, 1, 0]);
    }
    function moveTo(location) { 
        let point = vec3.create(); 
        vec3.transformMat4(point, location, stack[0]); 
        context.moveTo(point[0], point[1]); 
    }
    function lineTo(location) { 
        let point = vec3.create(); 
        vec3.transformMat4(point, location, stack[0]); 
        context.lineTo(point[0], point[1]); 
    }
    function initialize_bezier() {
        hermite_pts = [];
        hermite_pts[0] = [[-6, 22, 0], [0, 20, 0], 
                  [0, 20, 0],   [6, 22, 0]];
    }
    function bezierBasis(t){ 
        return [1-3*t+3*t*t-t*t*t, 3*t-6*t*t+3*t*t*t, 3*t*t-3*t*t*t, t*t*t]; 
    }
    function hermiteCubic(Basis, P, t){
        let b = Basis(t);
        let res = vec3.create();
        vec3.scale(res,P[0],b[0]);
        vec3.scaleAndAdd(res,res,P[1],b[1]);
        vec3.scaleAndAdd(res,res,P[2],b[2]);
        vec3.scaleAndAdd(res,res,P[3],b[3]);
        return res;
    }
    function drawCurve(curve, P) {
        context.strokeStyle = "black";
        context.lineWidth = 5;
        context.beginPath();
        moveTo(curve(bezierBasis, P, 0));
        for(let i = 0; i <= 200; ++i) {
            let t = (i/200);
            lineTo(curve(bezierBasis, P, t));
        }
        context.stroke();
    }
    function getFloorRadius(floor) {
        if (floor <= 22) {
            return 1 + 3*(22-floor)/(22);
        }
        else {
            return 3*(floor-22);
        }
    }
    function drawBuilding() {
        var rad;
        context.strokeStyle = "red";
        context.lineWidth = 1;
        var buildingFloors = function (angle) {
            context.beginPath();
            rad = angle*Math.PI/180;
            moveTo([4*Math.cos(rad), 0, 4*Math.sin(rad)]);
            lineTo([4*Math.cos(rad), 22, 4*Math.sin(rad)]);
            rad = ((angle+12)*Math.PI/180);
            lineTo([4*Math.cos(rad), 22, 4*Math.sin(rad)]);
            lineTo([4*Math.cos(rad), 0, 4*Math.sin(rad)]);
            context.closePath();
            context.strokeStyle = "black";
            context.stroke();
            context.fillStyle = "red"; 
            context.fill();

        }
        var draw_A = function () {
            moveTo([2.5, 22, 0]);
            for (let angle = 0; angle <= 360; angle += 12) { 
                lineTo([2.5 * Math.cos(angle*Math.PI/180), 22, 2.5 * Math.sin(angle*Math.PI/180)]); 
            }
            context.closePath(); 
            context.fillStyle = "maroon"; 
            context.fill();
            stack.unshift(mat4.clone(stack[0]));
            let T_resize = mat4.create();
            mat4.scale(T_resize, T_resize, [0.35, 1, 0.2]);
            mat4.multiply(stack[0], stack[0], T_resize);
            context.beginPath(); 
            moveTo([6, 22, 11]);
            lineTo([6, 22, -11]); 
            lineTo([3, 22, -11]);
            lineTo([3, 22, -3]); 
            lineTo([-3, 22, -3]);
            lineTo([-3, 22, -11]); 
            lineTo([-6, 22, -11]);
            lineTo([-6, 22, 11]);
            context.closePath();
            context.fillStyle = "black"; 
            context.fill();
            context.beginPath();
            moveTo([-3, 22, 2]);
            lineTo([3, 22, 2]); 
            lineTo([3, 22, 8]);
            lineTo([-3, 22, 8]); 
            context.closePath();
            context.fillStyle = "maroon"; 
            context.fill();
            stack.shift();
        }
        for (let angle = 0; angle <= 360 ; angle += 12) {
            buildingFloors(angle);
        }
        for (let floor = 22; floor >= 0; floor--) {
            let floorRadius = getFloorRadius(floor);
            context.beginPath();
            moveTo([Math.cos(Math.PI/2), 22-floor, Math.sin(Math.PI/2)]);
            for (let angle = 0; angle <= 360; angle += 12) {
                rad = angle*Math.PI/180;
                lineTo([floorRadius * Math.cos(rad), 22-floor, floorRadius * Math.sin(rad)]);
            }
            context.strokeStyle = "red";
            context.stroke();
            if (floor == 0) {
                context.closePath();
                draw_A();
            }
        }
    }
    function drawElements() {
        var drawStructure = function(dist) {
            stack.unshift(mat4.clone(stack[0]));
            let T_building =mat4.create();
            mat4.fromTranslation(T_building, [dist, 0, 0]);
            mat4.multiply(stack[0], stack[0], T_building);
            drawBuilding();
            stack.shift();
        }
        var rope_curve = function() {
            for (let i = 0; i < hermite_pts.length; ++i){
                drawCurve(hermiteCubic, hermite_pts[i]);
            }
        }
        initialize_bezier();
        if (perspective%360 > 180) {
            drawStructure(10); 
            rope_curve(); 
            drawStructure(-10);
        } else {
            drawStructure(-10); 
            rope_curve(); 
            drawStructure(10);
        }
    }  
    function draw() {
        canvas.width = canvas.width;
        let timestamp = Date.now();
        if (start === undefined) {
            start = timestamp;
        }
        perspective = ((timestamp - start)%10000/10000)*360;
        lookAt();
        stack.unshift(mat4.clone(stack[0]));
        let T_view = mat4.create();
        mat4.fromTranslation(T_view, [canvas.width/2, canvas.height-150, 0]);
        mat4.scale(T_view, T_view, [20, -20, -20]);
        mat4.multiply(stack[0], stack[0], T_view);
        mat4.multiply(stack[0], stack[0], mat4.create());
        mat4.multiply(stack[0], stack[0], T_look_at);
        drawElements();
        stack.shift();
        window.requestAnimationFrame(draw);
    }
    window.requestAnimationFrame(draw);
}
window.onload=setup();