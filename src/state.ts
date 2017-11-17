export = () => {
    let state = {};
    let isDirty = true;
    return {
        update: (fn) => {
            isDirty = true;
            fn(state);
        }
    }
};
