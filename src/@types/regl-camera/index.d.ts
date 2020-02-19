declare module 'regl-camera' {
    import { Regl, DefaultContext, DrawCommand } from 'regl';

    interface CameraProps {
        center: [number, number, number];
    }

    interface CameraContext extends DefaultContext {
        dirty: boolean;
    }

    function createCamera(regl: Regl, props: CameraProps): DrawCommand<CameraContext, CameraProps>;

    export = createCamera;
}
