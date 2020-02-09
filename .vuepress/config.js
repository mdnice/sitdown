module.exports = {
  port: 3200,
  extraWatchFiles: [require('path').resolve(__dirname, './nav')],
  locales: {
    '/': {lang: 'en-US', title: 'SitDown', description: 'Convert HTML into Markdown with JavaScript.'},
    '/zh-hans/': {lang: 'zh-hans', title: 'SitDown', description: 'Convert HTML into Markdown with JavaScript.'}
  },
  themeConfig: {
    repo: 'mdnice/sitdown',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: 'GitHub',

    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en.js'),
      },
      '/zh-hans/': {
        label: '简体中文',
        selectText: '选择语言',
        lastUpdated: '上次更新',
        nav: require('./nav/zh'),
      }
    },
    $examples: require('../packages/core/test/spec/gfm')
  }
}
