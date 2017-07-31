export default {
    name: 'disabled',
    directive: {
        bind(el, { value }) {
            if (value) {
                el.setAttribute('disabled', true);
            } else {
                el.removeAttribute('disabled');
            }
        },
    },
};
