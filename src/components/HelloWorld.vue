<template>
  <div class="hello"></div>
</template>

<script>
import { log } from "../util/publicMethods";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  created() {
    let param = {
      merchant: "WEIXIN",
      phone: "166028593309"
    };
    this.$http.post("/client/get-verify-code", param).then(res => {
      console.log(res);
    });
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
