<template>
    <div>
        <Example v-for="example in curExamples" :index="example.index"></Example>
        <a-pagination class="examples-pagination" v-model="current" :pageSize="pageSize" :total="$site.themeConfig.$examples.length" />
    </div>
</template>

<script>
  import Example from "./Example";

  export default {
      computed: {
          curExamples() {
              const {current,pageSize,$site} = this;
              return $site.themeConfig.$examples.slice(current * pageSize, (current + 1) * pageSize)
          }
      },
      data() {
          return {
              current: 0,
              pageSize:20
          };
      },
      components: {Example}
  }
</script>

<style>
    .examples-pagination.ant-pagination {
        text-align: right;
    }
</style>