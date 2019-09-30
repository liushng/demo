<template>
  <div class="test">
    {{time|formatTime}}
    <br />
    <span>异步：{{async}}</span>
    <button @click="fnAsync">异步加1</button>
    <br />
    <span>同步：{{sync}}</span>
    <button @click="fnSync">同步加2</button>
    <pdf></pdf>
  </div>
</template>
<script>
import pdf from "@/components/PDF";
import { CNNumber, type, deepCopy } from "../util/publicMethods";
import { mapState, mapMutations } from "vuex";
export default {
  name: "test",
  data() {
    return {
      time: 1500000
    };
  },
  props: {},
  computed: {
    ...mapState({
      sync: state => {
        return state.syncPersistedState.sync;
      },
      async: state => state.asyncPersistedState.async
    })
  },
  components: {
    pdf
  },
  created() {
    // console.log(CNNumber(123.2));
    // console.log(type(123.2));
    // console.log(type.isNumber(123.2));
    // let obj = {};
    // obj.a = obj;
    // console.log(deepCopy(obj));
  },
  mounted() {},
  methods: {
    ...mapMutations({
      setAsync: "asyncPersistedState/setAsync",
      setSync: "syncPersistedState/setSync"
    }),
    fnAsync() {
      this.setAsync(1);
    },
    fnSync() {
      this.setSync(2);
    }
  },
  watch: {},
  destroyed() {}
};
</script>
<style lang="scss" scoped>
button {
  padding: 5px;
}
</style>