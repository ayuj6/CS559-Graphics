function start() {
    var time = 0.0;
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");
    var slider1 = document.getElementById('slider1');
    var slider2 = document.getElementById('slider2');
    var slider3 = document.getElementById('slider3');
    slider1.value = 0;
    slider2.value = 0;
    slider3.value = 0;

    var cartonBase = {
        vertexPos: new Float32Array([-0.5, -1, 0.25, 0.5, -1, 0.25, -0.5, 0.1, 0.25, 0.5, 0.1, 0.25,
        -0.5, -1, 0.25, -0.5, -1, -0.25, -0.5, 0.1, -0.25, -0.5, 0.1, 0.25,
            0.5, -1, 0.25, 0.5, -1, -0.25, 0.5, 0.1, 0.25, 0.5, 0.1, -0.25,
        -0.5, -1, 0.25, -0.5, -1, -0.25, 0.5, -1, -0.25, 0.5, -1, 0.25,
        -0.5, -1, -0.25, 0.5, -1, -0.25, -0.5, 0.1, -0.25, 0.5, 0.1, -0.25
        ]),
        vertexColor: new Float32Array([
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ]),
        vertexNormal: new Float32Array([
            0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
            -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
            0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
            0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1
        ]),
        vertexIndices: new Uint8Array([
            0, 1, 2, 1, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 10, 11, 9,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 17, 18, 19
        ])
    };

    var cartonTop = {
        vertexPos: new Float32Array([
            -0.51, 0.26, 0.51, 0.51, 0.26, 0.51, -0.51, 0.26, -0.01, 0.51, 0.26, -0.01,
            -0.51, 0.26, 0.51, 0.51, 0.26, 0.51, 0.51, -0.2, 0.51, -0.51, -0.2, 0.51,
            -0.51, 0.26, -0.01, -0.51, 0, -0.01, -0.51, -0.2, 0.51, -0.51, 0.26, 0.51,
            -0.51, 0.26, -0.01, 0.51, 0.26, -0.01, 0.51, 0, -0.01, -0.51, 0, -0.01,
            0.51, 0.26, -0.01, 0.51, 0, -0.01, 0.51, -0.2, 0.51, 0.51, 0.26, 0.51,
        ]),
        vertexColor: new Float32Array([
            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
        ]),
        vertexNormal: new Float32Array([
            0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
            -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
            0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
        ]),
        vertexIndices: new Uint8Array([
            0, 1, 2, 1, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19
        ])
    };

    function createShader(gl, shader_type, shader_src) {
        var shader = gl.createShader(shader_type);
        gl.shaderSource(shader, shader_src);
        gl.compileShader(shader);
        return shader;
    }

    function createProgram(gl, vertex_Shader, f_Shader) {
        var shader = gl.createProgram();
        gl.attachShader(shader, vertex_Shader);
        gl.attachShader(shader, f_Shader);
        gl.linkProgram(shader);
        gl.useProgram(shader);
        return shader;
    }

    function setupShader() {
        var vertexShader = createShader(gl, gl.VERTEX_SHADER, document.getElementById("vertexShader").text);
        var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, document.getElementById("fragmentShader").text)
        var shader = createProgram(gl, vertexShader, fragmentShader);

        shader.PositionAttribute = gl.getAttribLocation(shader, "vertexPosition");
        gl.enableVertexAttribArray(shader.PositionAttribute);

        shader.NormalAttribute = gl.getAttribLocation(shader, "vNormal");
        gl.enableVertexAttribArray(shader.NormalAttribute);

        shader.ColorAttribute = gl.getAttribLocation(shader, "time");
        gl.enableVertexAttribArray(shader.ColorAttribute);

        shader.MVmatrix = gl.getUniformLocation(shader, "uMV");
        shader.MVNormalmatrix = gl.getUniformLocation(shader, "uMVn");
        shader.MVPmatrix = gl.getUniformLocation(shader, "uMVP");
        return shader;
    }

    var shader = setupShader();

    function bind_draw(object, transformMatrix) {
        var trianglePos = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePos);
        gl.bufferData(gl.ARRAY_BUFFER, object.vertexPos, gl.STATIC_DRAW);
        trianglePos.itemSize = 3;
        trianglePos.numItems = object.vertexPos.length / 3;

        var triangleNormal = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormal);
        gl.bufferData(gl.ARRAY_BUFFER, object.vertexNormal, gl.STATIC_DRAW);
        triangleNormal.itemSize = 3;
        triangleNormal.numItems = object.vertexNormal.length / 3;

        var colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, object.vertexColor, gl.STATIC_DRAW);
        colorBuffer.itemSize = 3;
        colorBuffer.numItems = object.vertexColor.length / 3;

        var indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, object.vertexIndices, gl.STATIC_DRAW);

        var angle1 = slider1.value * Math.PI / 100;
        var angle2 = slider2.value * Math.PI / 100;
        var eye = [400 * Math.sin(angle1), 150.0, 400.0 * Math.cos(angle1)];

        var tModel = mat4.create();
        mat4.fromScaling(tModel, [100, 100, 100]);
        mat4.rotate(tModel, tModel, angle2, [1, 1, 1]);
        mat4.multiply(tModel, tModel, transformMatrix);

        var tCamera = mat4.create();
        mat4.lookAt(tCamera, eye, [0, 1, 0], [0, 1, 0]);

        var tProjection = mat4.create();
        mat4.perspective(tProjection, Math.PI / 4, 1, 10, 1000);

        var tMV = mat4.create();
        var tMVn = mat3.create();
        var tMVP = mat4.create();
        mat4.multiply(tMV, tCamera, tModel);
        mat3.normalFromMat4(tMVn, tMV);
        mat4.multiply(tMVP, tProjection, tMV);

        gl.uniformMatrix4fv(shader.MVmatrix, false, tMV);
        gl.uniformMatrix3fv(shader.MVNormalmatrix, false, tMVn);
        gl.uniformMatrix4fv(shader.MVPmatrix, false, tMVP);
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePos);
        gl.vertexAttribPointer(shader.PositionAttribute, trianglePos.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormal);
        gl.vertexAttribPointer(shader.NormalAttribute, triangleNormal.itemSize, gl.FLOAT, false, 0, 0);
        gl.vertexAttribPointer(shader.ColorAttribute, 1, gl.FLOAT, false, 0, 0);
        gl.drawElements(gl.TRIANGLES, object.vertexIndices.length, gl.UNSIGNED_BYTE, 0);
    }

    function draw() {
        var tMatrix = mat4.create();
        time = time + 0.05;
        gl.clearColor(0.2, 0.3, 0.4, 0.5);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        bind_draw(cartonBase, tMatrix);
        mat4.fromTranslation(tMatrix, [0, 0, -0.25]);
        mat4.rotate(tMatrix, tMatrix, slider3.value / 20, [-1, 0, 0]);
        bind_draw(cartonTop, tMatrix);
    }

    slider1.addEventListener("input", draw);
    slider2.addEventListener("input", draw);
    slider3.addEventListener("input", draw);
    draw();
}
window.onload = start; 