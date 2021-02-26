<template>
    <div class="index-dialog">
        <index-dialog :isShow="indexDefineShow"
                      :hasClose="false"
                      :type="'2'"
                      title=""
                      @on-dialog-close="closeDialog">
            <div class="brand-dislog">
                <h3>{{currentDialog.title}}</h3>
                <p>
                    <template v-for="item in currentDialog.list">
                        <b>{{item.sub}}:</b> {{item.desc}}<br/>
                    </template>
                </p>
            </div>
        </index-dialog>
    </div>
</template>

<script>
    import Dialog from '@/components/dialog.vue'
    export default {
        components: {
            'index-dialog': Dialog,
        },
        props: {
            dialogData: {
                type: Object,
                default: ()=>{}
            }
        },
        data () {
            return {
                indexDefineShow: false,
                currentDialog: {
                    title: '',
                    list: [],
                },
            }
        },
        methods: {
            showIndexDefine (id) {
                this.indexDefineShow = true
                this.currentDialog = this.dialogData[id]
            },
            closeDialog () {
                this.indexDefineShow = false
                this.$emit('on-dialog-close', false)
            },
        }
    }
</script>