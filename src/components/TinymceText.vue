<template>
	<!--eslint-disable-->
	<div>
		<textarea :id="id" class="aa">
		</textarea>
		<!--<el-button class="btn" @click="cancle">取消</el-button>-->
		<el-button class="btn1" type="primary" @click="release">{{btnName}}</el-button>
	</div>
</template>
<!--eslint-disable-->
<script>
    import tinymce from 'tinymce/tinymce'
    //这下面是tinymce的插件
    import 'tinymce/themes/silver/theme'
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/contextmenu'
    import 'tinymce/plugins/wordcount'
    import 'tinymce/plugins/colorpicker'
    import 'tinymce/plugins/textcolor'
    //这里写你自己存放语言包的路径
    import '../../public/tinymce_languages/langs/zh_CN.js'
    import 'tinymce/icons/default'
    import 'tinymce/skins/ui/oxide/skin.css'
    export default {
        name: "TinymceText",
        props:{
            id:String,
            btnName: String,
        },
	    mounted() {
            tinymce.get(this.id).setContent(this.content);
	    },
        data () {
            return {
                init:{
                    selector: '#'+this.id,
                    language: 'zh_CN',
                    skin_url: 'tinymce/skins/ui/oxide',
                    height: 500,
                    //插件
                    plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
                    //工具栏
                    toolbar:
                        'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
                    //隐藏tinymce的标识
                    branding: false,
                },
            };
        },
        methods:{
            release(){
                //content 是文本内容
                let content = tinymce.get(this.id).getContent();
                this.$emit('release',content)
            },

	        setContent(contentParam) {
                tinymce.activeEditor.setContent(contentParam);
            },

            cancle(){
                //content 是文本内容
                let content = tinymce.get(this.id).getContent()
                this.$emit('release',content)
            }
        },
        mounted () {
            //配置的初始化
            tinymce.init(this.init);
        },
        beforeDestroy() {
            //销毁
            tinymce.get(this.id).destroy();
        },
    }
</script>

<style scoped>
	.btn {
		margin-top: 20px;
		width: 100px;
	}
	.btn1 {
		width: 100px;
		margin-top: 20px;
	}
</style>