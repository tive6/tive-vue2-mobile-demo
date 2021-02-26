<template>
    <div class="bi-nav">
        <router-link tag="div" :to="{ path: '/clue/index' }" class="bi-nav-list">
            <div class="bi-nav-img bi-nav-img-home"></div>
            <div class="bi-nav-text">首页</div>
        </router-link>
        <router-link tag="div" :to="{ path: '/clue/message' }" class="bi-nav-list">
            <div class="bi-nav-img bi-nav-img-message">
                <div v-if="unreadNum>0" class="bi-nav-count">{{unreadNum}}</div>
            </div>
            <div class="bi-nav-text">消息</div>
        </router-link>
<!--        <router-link tag="div" :to="{ path: '/clue/index' }" class="bi-nav-list">-->
<!--            <div class="bi-nav-img bi-nav-img-my"></div>-->
<!--            <div class="bi-nav-text">我的</div>-->
<!--        </router-link>-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                unreadNum: 0,
            }
        },
        mounted() {
            // this.getMsgUnread()
        },
        methods: {
            getMsgUnread () {
                this.$http.ajax({
                    url: '/nbi/message/nbiUMessage/getCurrentUserUnreadMsgCount'
                }).then(res => {
                    // console.log(res)
                    this.unreadNum = +res
                    if (+res>=99)  this.unreadNum = 99
                })
            },
        }
    }
</script>