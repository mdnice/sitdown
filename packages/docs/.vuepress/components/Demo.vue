<template>
    <div>
        <a-radio-group :options="engineOptions" @change="changeEngine" :defaultValue="engine" />
        <button v-on:click="transform" class="transform btn-group">transform</button>
        <div class="sitdown-demo">
            <textarea v-model="input"/>
            <textarea class="result"  disabled :value="result"/>
        </div>
    </div>
</template>
<script>
    import {Sitdown,RootNode} from 'sitdown/dist/src.esm';
    import { applyJuejinRule } from '@sitdown/juejin/dist/src.esm';
    import { applyWechatRule, extraFootLinks } from '@sitdown/wechat/dist/src.esm';
    import { applyZhihuRule } from '@sitdown/zhihu/dist/src.esm';
    // //
    const gfm = new Sitdown({
        keepFilter: ['style'],
        codeBlockStyle:'fenced'
    });
    const juejin = new Sitdown({
        keepFilter: ['style'],
        codeBlockStyle: 'fenced',
        bulletListMarker: '-',
        hr: '---',
    });
    juejin.use(applyJuejinRule);

    let wechat = new Sitdown({
        keepFilter: ['style'],
        codeBlockStyle: 'fenced',
        bulletListMarker: '-',
        hr: '---',
    });
    wechat.use(applyWechatRule);
    const wechatToMD = (html) => {
        const root = new RootNode(html);
        const footLinks = extraFootLinks(root);
        return wechat.HTMLToMD(html, { footLinks });
    };

    let zhihu = new Sitdown({
        keepFilter: ['style'],
        codeBlockStyle: 'fenced',
        bulletListMarker: '-',
        hr: '---',
    });
    zhihu.use(applyZhihuRule);

    let csdn = new Sitdown({
        keepFilter: ['style'],
        codeBlockStyle: 'fenced',
        bulletListMarker: '-',
        hr: '---',
    });
    const methods = {
        GFM: input => gfm.HTMLToMD(input),
        Juejin: input => juejin.HTMLToMD(input),
        Zhihu: input => zhihu.HTMLToMD(input),
        Wechat: input => wechatToMD(input),
        CSDN: input => csdn.HTMLToMD(input)
    }
    export default {
        data() {
            return {
                input: '',
                result: '',
                engine: 'GFM',
                engineOptions:['GFM','Wechat','Zhihu', 'Juejin','CSDN']
            }
        },
        methods: {
            changeEngine(e) {
                // console.log('engine checked', e.target.value);
                this.engine = e.target.value;
            },
            transform() {
                const result = methods[this.engine](this.input);
                this.result = result;
                this.copy();
            },
            copy () {
                const copyTextarea = document.createElement('textarea')
                copyTextarea.value = this.result;
                document.querySelector('.btn-group').appendChild(copyTextarea)
                copyTextarea.focus()
                copyTextarea.select()

                try {
                    document.execCommand('copy');
                    alert('result already copy to your clipborad~');
                    copyTextarea.blur()
                } catch (err) {
                    console.log(err)
                }
                document.querySelector('.btn-group').removeChild(copyTextarea)
            },
        },
        mounted() {
            this.input = '';
        }
    }
</script>
<style lang="stylus">
    .transform {
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 10px 16px;
        margin-bottom: 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }

    .sitdown-demo {
        display: flex;

        textarea, .result {
            width: 50%;
            height: 600px;
            padding 10px;
        }
    }
</style>