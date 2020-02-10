<template>
    <div>
        <button v-on:click="transform" class="transform">transform</button>
        <div class="sitdown-demo">
            <textarea v-model="input"/>
            <textarea class="result"  disabled :value="result"/>
        </div>
    </div>
</template>
<script>
    import {Sitdown} from 'sitdown/dist/src.esm';

    export default {
        data() {
            return {
                input: '',
                result: ''
            }
        },
        methods: {
            transform() {
                const result = this.sitdown.HTMLToMD(this.input);
                this.result = result;
            }
        },
        mounted() {
            this.sitdown = new Sitdown({
                keepFilter: ['style'],
                codeBlockStyle:'fenced'
            });
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