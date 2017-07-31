<template>
<div id="app">
    <router-view></router-view>
</div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style>
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
}

a {
    text-decoration: none;
    color: inherit
}
#app {
    height: 100%;
}
</style>
