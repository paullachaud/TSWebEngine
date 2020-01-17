namespace GraphicsEngine {

    export class Shader {

        private _name: string;
        private _program: WebGLProgram;

        /**
         * Constructors shader from sources
         * @param name
         * @param vertexSource Source of vertex shader
         * @param fragmentSource Source of fragment shader
         */
        public constructor(name: string, vertexSource: string, fragmentSource: string) {

            this._name = name;
            let vertextShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
            let fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);

            this.createProgram(vertextShader, fragmentShader);
        }

        /** Use this shader */
        public use(): void {
            gl.useProgram(this._program);
        }

        /** Name of shader */
        public get name(): string {
            return this._name;
        }

        private loadShader(source: string, shaderType: number): WebGLShader {
            let shader: WebGLShader = gl.createShader(shaderType);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            let error = gl.getShaderInfoLog(shader);

            if (error !== "") {
                throw new Error(" Error compiling shader: '" + this._name + "': " + error);
            }

            return shader;
        }

        private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
            this._program = gl.createProgram()

            gl.attachShader(this._program, vertexShader);
            gl.attachShader(this._program, fragmentShader);

            gl.linkProgram(this._program);

            let error = gl.getProgramInfoLog(this._program);
            if (error !== "") {
                throw new Error("Error linking hader '" + this._name + "': " + error);
            }
        }
    }
}