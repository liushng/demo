<template>
  <div class="pdf-viewer">
    <iframe :src="viewerUrl" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      viewerUrl: "/web/viewer.html?file=" + encodeURIComponent(this.pdfUrl)
    };
  },
  props: {
    pdfUrl: {
      type: String,
      default: "/web/compressed.tracemonkey-pldi-09.pdf"
    }
  },
  computed: {},
  components: {},
  created() {
    console.log(this.viewerUrl);
  },
  mounted() {},
  methods: {},
  watch: {},
  destroyed() {}
};
</script>
<style lang="scss" scoped>
.pdf-viewer {
  width: 100vw;
  height: 100vh;
}
</style>