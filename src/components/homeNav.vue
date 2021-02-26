<template>
    <div class="home-nav">
        <div v-if="isShow" class="home-nav-circle">
            <div class="bi-nav-right-home" @click="urlTo('/clue/index')"></div>
        </div>
    </div>
</template>
<script>
    export default {
        components: {
        },
        props: {
            isShow: {
                type: Boolean,
                default: false,
            },
        },
        data () {
            let that = this
            return {
            }
        },
        methods: {
            urlTo (url) {
                this.$router.push({
                    path: url,
                })
            },
        }
    }
</script>
