namespace GraphicsEngine {

    /**
     * Graphics Visualization Engine
     * */
    export class Engine {

        private _canvas: HTMLCanvasElement;
        private _shader: Shader;

        private _buffer: WebGLBuffer;

        public constructor() {
            console.log("hello");
        }
        /** Starts Graphics Engine */
        public start(): void {
            this._canvas = GLUtilities.initialize();
            gl.clearColor(0, 0, 0, 1);

            this.loadShaders();
            this._shader.use();

            this.createBuffer();

            this.resize();
            this.loop();
        }

        /** 
         * Resizes canvas when window is changed 
         * */
        public resize(): void {
            if (this._canvas !== undefined) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;

                gl.viewport(0, 0, this._canvas.width, this._canvas.height)
            }
        }

        /** The main game loop */
        private loop(): void {
            gl.clear(gl.COLOR_BUFFER_BIT); // clear screen every loop

            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(0);


            gl.drawArrays(gl.TRIANGLES, 0, 3);

            requestAnimationFrame(this.loop.bind(this));
        }

        private createBuffer(): void {
            this._buffer = gl.createBuffer();

            // Create dtaa
            let vertices = [
                // x, y, z
                0, 0, 0,
                0, 0.5, 0,
                0.5, 0.5, 0
            ];

            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(0);

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, undefined);
            gl.disableVertexAttribArray(0);
        }

        private loadShaders(): void {
            let vertexShaderSource = `
attribute vec3 a_position;
void main() {
    gl_Position = vec4(a_position, 1.0);
}`;

            let fragmentShaderSource = `
precision mediump float;

void main() {
    gl_FragColor = vec4(1.0);
}`;

            this._shader = new Shader("test",vertexShaderSource, fragmentShaderSource);
        }
    }
}