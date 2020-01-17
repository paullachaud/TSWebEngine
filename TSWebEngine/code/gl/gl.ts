namespace GraphicsEngine {
    /**
     * The WebGL Rendering Context
     * */
    export var gl: WebGLRenderingContext;

    /**
     * Responsible for creating WebGL rendering context.
     * */
    export class GLUtilities {
        /**
         * Initialized WebGL on canvas specified by elementId.
         * @param elementId The id of the element to search for.
         */
        public static initialize(elementId?: string): HTMLCanvasElement {
            let canvas: HTMLCanvasElement;

            if (elementId !== undefined) {
                canvas = document.getElementById(elementId) as HTMLCanvasElement;
                if (canvas === undefined) {
                    throw new Error("Cannot find a canvas element named:" + elementId);
                }
            }
            else {
                canvas = document.createElement("canvas") as HTMLCanvasElement;
                document.body.appendChild(canvas);
            }

            gl = canvas.getContext("webgl");
            if (gl === undefined) {
                throw new Error("Unabled to initialize WebGL!")
            }

            return canvas;
        }
    }
}