<template>
    <div v-if="isShow" class="fixed-bar">
        <div class="fixed-bar-btn fixed-bar-back" @click="$router.go(-1)"></div>
        <div class="fixed-bar-btn fixed-bar-home" @click="$router.push('/clue/index')"></div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                isShow: false,
                hideList: [
                    'home',
                    'message',
                ],
            }
        },
        watch: {
            '$route' (to, from) {
                // 当前路由
                // console.log(to)
                this.isShow = !this.hideList.includes(to.name)
            }
        },
        mounted () {
        },
        methods: {},
    }
</script>
