declare module 'regl-camera' {
    import { vec3 } from 'gl-matrix';
    import { Regl, DefaultContext, DrawCommand } from 'regl';

    interface CameraProps {
        center: vec3;
    }

    interface CameraContext extends DefaultContext {
        dirty: boolean;
    }

    function createCamera(regl: Regl, props: CameraProps): DrawCommand<CameraContext, CameraProps>;

    export = createCamera;
}
