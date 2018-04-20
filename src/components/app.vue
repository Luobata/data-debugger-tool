<template lang="pug">
    .debugger-wrap
        header-bar.header
        split-content.content
</template>
<script>
import headerBar from './header-bar.vue';
import splitContent from './split-content.vue';
export default {
    components: {
        headerBar,
        splitContent,
    },
    data() {
        return {};
    },
};
</script>
<style lang="stylus" scoped>
.debugger-wrap
    width 100%
</style>
