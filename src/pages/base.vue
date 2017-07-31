<script>
import { mapActions } from 'vuex';

export default {
    computed: {
        breadcrumbs() {
            return this.getBreadcrumbs();
        },
    },
    methods: {
        ...mapActions([
            'setBreadcrumbs',
        ]),
        getBreadcrumbs() {
            return this.$route.meta.breadcrumbs ? this.$route.meta.breadcrumbs
                .map((crumb) => {
                    if (crumb.path) {
                        return {
                            name: crumb.name,
                            to: {
                                path: crumb.path,
                            },
                        };
                    }
                    return crumb;
                }) : [];
        },
    },
    mounted() {
        this.setBreadcrumbs({
            breadcrumbs: this.breadcrumbs,
        });
    },
    activated() {
        this.setBreadcrumbs({
            breadcrumbs: this.breadcrumbs,
        });
    },
    updated() {
        this.setBreadcrumbs({
            breadcrumbs: this.breadcrumbs,
        });
    },
};
</script>
