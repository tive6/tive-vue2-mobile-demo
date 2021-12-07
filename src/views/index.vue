<template>
  <div class="container">
    <div class="text">Vue2+Vant mobile demo</div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {};
  },
  mounted () {
  },
  methods: {}
};
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  background-color: #002140;
}

.text {
  margin-left: 20px !important;
  font-size: 60px;
  background-image: linear-gradient(135deg, #2DD7A6, #FADBD8, #FB5430);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  -moz-box-decoration-break: clone;
  color: transparent;
  word-break: keep-all;
}

</style>
