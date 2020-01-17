var engine;
window.onload = function () {
    engine = new GraphicsEngine.Engine();
    engine.start();
    //document.body.innerHTML += "foo";
};
window.onresize = function () {
    engine.resize();
};
var GraphicsEngine;
(function (GraphicsEngine) {
    /**
     * Graphics Visualization Engine
     * */
    var Engine = /** @class */ (function () {
        function Engine() {
            console.log("hello");
        }
        /** Starts Graphics Engine */
        Engine.prototype.start = function () {
            this._canvas = GraphicsEngine.GLUtilities.initialize();
            GraphicsEngine.gl.clearColor(0, 0, 0, 1);
            this.loadShaders();
            this._shader.use();
            this.createBuffer();
            this.resize();
            this.loop();
        };
        /**
         * Resizes canvas when window is changed
         * */
        Engine.prototype.resize = function () {
            if (this._canvas !== undefined) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;
                GraphicsEngine.gl.viewport(0, 0, this._canvas.width, this._canvas.height);
            }
        };
        /** The main game loop */
        Engine.prototype.loop = function () {
            GraphicsEngine.gl.clear(GraphicsEngine.gl.COLOR_BUFFER_BIT); // clear screen every loop
            GraphicsEngine.gl.bindBuffer(GraphicsEngine.gl.ARRAY_BUFFER, this._buffer);
            GraphicsEngine.gl.vertexAttribPointer(0, 3, GraphicsEngine.gl.FLOAT, false, 0, 0);
            GraphicsEngine.gl.enableVertexAttribArray(0);
            GraphicsEngine.gl.drawArrays(GraphicsEngine.gl.TRIANGLES, 0, 3);
            requestAnimationFrame(this.loop.bind(this));
        };
        Engine.prototype.createBuffer = function () {
            this._buffer = GraphicsEngine.gl.createBuffer();
            // Create dtaa
            var vertices = [
                // x, y, z
                0, 0, 0,
                0, 0.5, 0,
                0.5, 0.5, 0
            ];
            GraphicsEngine.gl.bindBuffer(GraphicsEngine.gl.ARRAY_BUFFER, this._buffer);
            GraphicsEngine.gl.vertexAttribPointer(0, 3, GraphicsEngine.gl.FLOAT, false, 0, 0);
            GraphicsEngine.gl.enableVertexAttribArray(0);
            GraphicsEngine.gl.bufferData(GraphicsEngine.gl.ARRAY_BUFFER, new Float32Array(vertices), GraphicsEngine.gl.STATIC_DRAW);
            GraphicsEngine.gl.bindBuffer(GraphicsEngine.gl.ARRAY_BUFFER, undefined);
            GraphicsEngine.gl.disableVertexAttribArray(0);
        };
        Engine.prototype.loadShaders = function () {
            var vertexShaderSource = "\nattribute vec3 a_position;\nvoid main() {\n    gl_Position = vec4(a_position, 1.0);\n}";
            var fragmentShaderSource = "\nprecision mediump float;\n\nvoid main() {\n    gl_FragColor = vec4(1.0);\n}";
            this._shader = new GraphicsEngine.Shader("test", vertexShaderSource, fragmentShaderSource);
        };
        return Engine;
    }());
    GraphicsEngine.Engine = Engine;
})(GraphicsEngine || (GraphicsEngine = {}));
var GraphicsEngine;
(function (GraphicsEngine) {
    /**
     * Responsible for creating WebGL rendering context.
     * */
    var GLUtilities = /** @class */ (function () {
        function GLUtilities() {
        }
        /**
         * Initialized WebGL on canvas specified by elementId.
         * @param elementId The id of the element to search for.
         */
        GLUtilities.initialize = function (elementId) {
            var canvas;
            if (elementId !== undefined) {
                canvas = document.getElementById(elementId);
                if (canvas === undefined) {
                    throw new Error("Cannot find a canvas element named:" + elementId);
                }
            }
            else {
                canvas = document.createElement("canvas");
                document.body.appendChild(canvas);
            }
            GraphicsEngine.gl = canvas.getContext("webgl");
            if (GraphicsEngine.gl === undefined) {
                throw new Error("Unabled to initialize WebGL!");
            }
            return canvas;
        };
        return GLUtilities;
    }());
    GraphicsEngine.GLUtilities = GLUtilities;
})(GraphicsEngine || (GraphicsEngine = {}));
var GraphicsEngine;
(function (GraphicsEngine) {
    var Shader = /** @class */ (function () {
        /**
         * Constructors shader from sources
         * @param name
         * @param vertexSource Source of vertex shader
         * @param fragmentSource Source of fragment shader
         */
        function Shader(name, vertexSource, fragmentSource) {
            this._name = name;
            var vertextShader = this.loadShader(vertexSource, GraphicsEngine.gl.VERTEX_SHADER);
            var fragmentShader = this.loadShader(fragmentSource, GraphicsEngine.gl.FRAGMENT_SHADER);
            this.createProgram(vertextShader, fragmentShader);
        }
        /** Use this shader */
        Shader.prototype.use = function () {
            GraphicsEngine.gl.useProgram(this._program);
        };
        Object.defineProperty(Shader.prototype, "name", {
            /** Name of shader */
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Shader.prototype.loadShader = function (source, shaderType) {
            var shader = GraphicsEngine.gl.createShader(shaderType);
            GraphicsEngine.gl.shaderSource(shader, source);
            GraphicsEngine.gl.compileShader(shader);
            var error = GraphicsEngine.gl.getShaderInfoLog(shader);
            if (error !== "") {
                throw new Error(" Error compiling shader: '" + this._name + "': " + error);
            }
            return shader;
        };
        Shader.prototype.createProgram = function (vertexShader, fragmentShader) {
            this._program = GraphicsEngine.gl.createProgram();
            GraphicsEngine.gl.attachShader(this._program, vertexShader);
            GraphicsEngine.gl.attachShader(this._program, fragmentShader);
            GraphicsEngine.gl.linkProgram(this._program);
            var error = GraphicsEngine.gl.getProgramInfoLog(this._program);
            if (error !== "") {
                throw new Error("Error linking hader '" + this._name + "': " + error);
            }
        };
        return Shader;
    }());
    GraphicsEngine.Shader = Shader;
})(GraphicsEngine || (GraphicsEngine = {}));
//# sourceMappingURL=main.js.map