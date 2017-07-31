<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'authorities',
        ]),
    },
    methods: {
        checkAuth(param) {
            return this.authorities && this.authorities.length > 0 &&
            this.authorities.indexOf(param) !== -1 ? 1 : 0;
        },
    },
};
</script>
