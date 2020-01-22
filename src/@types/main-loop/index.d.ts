declare module 'main-loop' {

    import VirtualDOM = require('virtual-dom');

    function update(state: any): void;

    type MainLoop = {
        target: HTMLElement;
    }

    function mainLoop<T>(newState: T, render: (state: T) => VirtualDOM.VNode, virtualDom: typeof VirtualDOM): any;

    export = mainLoop;
}
