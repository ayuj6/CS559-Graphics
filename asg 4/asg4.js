function start() {
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	var changebtn = document.getElementById('change');

	var circ_x = 0;
	var circ_y = 200;
	var curr = 0;
	var ref = 0;
	var hermitePts = [];
	var hermite_derivative = [];
	var curves = [];

	// from demo
	var Hermite = function (t) {
		return [
			2 * t * t * t - 3 * t * t + 1,
			t * t * t - 2 * t * t + t,
			-2 * t * t * t + 3 * t * t,
			t * t * t - t * t
		];
	}

	// taken from demo but edited for vec2
	function hermiteCubic(basis, P, t) {
		var b = basis(t);
		var result = vec2.create();
		vec2.scale(result, P[0], b[0]);
		vec2.scaleAndAdd(result, result, P[1], b[1]);
		vec2.scaleAndAdd(result, result, P[2], b[2]);
		vec2.scaleAndAdd(result, result, P[3], b[3]);
		return result;
	}

	function changeCurve() {
		curves = [];
		hermite_derivative = [];
		hermitePts = [];
		hermitePts[0] = [0, 200];
		hermitePts[4] = [0, 200];

		for (let i = 1; i <= 3; i++) {
			hermitePts[i] = [Math.random() * (canvas.width - 60), Math.random() * (canvas.height - 500)];
		}
		for (let i = 0; i < 5; i++) {
			hermite_derivative[i] = [Math.random() * 1000, Math.random() * 1000];
		}
		for (let i = 0; i < 4; i++) {
			curves[i] = function (t) {
				return hermiteCubic(Hermite, [hermitePts[i], hermite_derivative[i], hermitePts[i + 1], hermite_derivative[i + 1]], t)
			}
		}
	}

	function draw() {
		canvas.width = canvas.width;
		context.fillStyle = "aqua";
		context.fillRect(0, 0, canvas.width, canvas.height);

		context.translate(80, 100);
		for (let i = 0; i < 4; i++) {
			context.save();
			drawTrajectory(0, 1, 150, curves[i]);
			context.restore();
		}
		context.save();
		drawCircle();
		context.restore();
	}

	function drawCircle() {
		context.translate(circ_x, circ_y);
		context.save();
		context.beginPath();
		context.arc(0, 0, 5, 0, 2 * Math.PI);
		context.fillStyle = "red";
		context.fill();
		context.restore();
	}

	// from lecture demo
	function drawTrajectory(t_begin, t_end, intervals, C) {
		context.strokeStyle = "black";
		context.beginPath();
		var x = C(t_begin)[0];
		var y = C(t_begin)[1];
		context.moveTo(x, y);
		for (var i = 1; i <= intervals; i++) {
			var x_to = C(((intervals - i) / intervals) * t_begin + (i / intervals) * t_end)[0];
			var y_to = C(((intervals - i) / intervals) * t_begin + (i / intervals) * t_end)[1];
			context.lineTo(x_to, y_to);
		}
		context.stroke();
	}

	function showPath() {
		curr = curr + 1;
		circ_x = curves[ref](curr / 100)[0];
		circ_y = curves[ref](curr / 100)[1];

		draw();

		if (curr > 100) {
			curr = 0;
			ref = ref + 1;
			if (ref > 3) {
				ref = 0;
			}
		}
	}

	changebtn.addEventListener('click', function () {
		ref = 0;
		curr = 0;
		circ_x = 0;
		circ_y = 180;
		changeCurve();
	});

	changeCurve();
	setInterval(showPath, 30);
}

window.onload = start;