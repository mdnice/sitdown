<template>
    <div>
        <Example v-for="example in $site.themeConfig.$examples" :index="example.index"></Example>
    </div>
</template>

<script>
  import Example from "./Example";
  export default {
      components: {Example}
  }
</script>
