<template>
    <div>
        <p>{{isZh ? '示例' : 'Example'}} {{index}}</p>
        <table>
            <thead>
            <tr>
                <th>{{isZh ? '效果' : 'Demo'}}</th>
                <th>HTML</th>
                <th>Markdown</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <iframe width="100%" style="border: none" ref="demo"></iframe>
                </td>
                <td>
                    <div class="language-html" v-html="htmlCode"/>
                </td>
                <td>
                    <div class="language-md" v-html="mdCode"/>
                </td>
            </tr>
            </tbody>
        </table>
        <div v-if="example.option"><blockquote>option:{{JSON.stringify(example.option,null,2)}}}</blockquote></div>
    </div>
</template>

<script>
  import MarkdownIt from 'markdown-it/dist/markdown-it';
  import highlight from '../util/highlight';

  const md = new MarkdownIt({highlight});
  export default {
    props: {
      md: {
        type: String,
        default: ''
      },
      html: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        required: true
      },
    },
    computed: {
      isZh: function () {
        return this.$page.path.startsWith('/zh-hans/')
      },
      example: function () {
        return this.$site.themeConfig.$examples[this.index - 1]
      },
      mdCode: function () {
        return this.renderMd(this.example.md, 'md')
      },
      htmlCode: function () {
        return this.renderMd(this.example.html, 'html')
      }
    },
    methods: {
      renderMd: (str, info) => md.render(`~~~~~~~~~~${info}\n${str}~~~~~~~~~~`)
    },
    mounted() {
      // console.log('$site', this.$site)
      // console.log('$page', this.$page)
      const html = `<div class="markdown-body">${this.example.html}</div>\n<link href="/css/github-markdown.css" rel="stylesheet"></link>`
      this.$refs.demo && this.$refs.demo.contentDocument && this.$refs.demo.contentDocument.write(html);
    }
  }
</script>
<style>
    @media (min-width: 480px) {
        table td {
            min-width: 200px;
            width: 33.3333%;
        }
    }
    .example-demo pre {
        display: block;
        padding: 9.5px;
        margin: 0 0 10px;
        font-size: 13px;
        line-height: 1.42857143;
        color: #333;
        word-break: break-all;
        word-wrap: break-word;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
</style>