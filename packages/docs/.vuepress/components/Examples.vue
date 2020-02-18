<template>
    <div>
        <Example v-for="example in curExamples" :example="example"></Example>
        <a-pagination class="examples-pagination" v-model="current" :pageSize="pageSize" :total="$site.themeConfig.$examples.length" />
    </div>
</template>

<script>
  import Example from "./Example";

  export default {
      computed: {
          curExamples() {
              const {current,pageSize,$site} = this;
              return $site.themeConfig.$examples.slice((current-1) * pageSize, current * pageSize)
          }
      },
      data() {
          return {
              current: 1,
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