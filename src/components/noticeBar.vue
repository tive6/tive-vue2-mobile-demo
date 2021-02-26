<template>
    <div v-if="msg.unread && msg.unread===1 && isShow" class="notice-bar">
        <div class="notice-bar-left" @click="linkTo(`/clue/message-detail?id=${msg.id}`)">
            <img src="./../assets/img/home/home-icon-notice.png" alt="" class="notice-bar-icon">
            <div class="notice-bar-type">{{msgType[msg.type]}}：</div>
            <div class="notice-bar-title">{{msg.title}}</div>
        </div>
        <div class="notice-bar-right" @click="isShow=false"></div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: {},
                isShow: true,
                msgType: {
                    1: '公告',
                    2: '预警',
                    3: '异常',
                    4: '故障',
                },
            }
        },
        created () {
            // this.getMsgNewest()
        },
        methods: {
            getMsgNewest () {
                this.$http.ajax({
                    url: '/nbi/message/nbiUMessage/getCurrentUserLatestMsg',
                    params: {
                        limit: 1,
                    }
                }).then(res => {
                    console.log(res)
                    this.msg = res[0] || {}
                })
            },
            linkTo (url) {
                this.$router.push({
                    path: url,
                })
            },
        }
    }
</script>
