<template>
    <textarea :id="id"></textarea>
</template>

<script>
    import tinymce from 'tinymce/tinymce'
    import 'tinymce/themes/silver/theme'
    import './zh_CN.js';
    import './skin/skin.less'
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/media'
    import ajax from "@/admin/ajax";
    import {getPolicy, fileRename} from "@/common/tools";

    export default {
        data() {
            return {
                edit: null
                , policy: {}
            }
        }
        , props: {
            'value': {
                type: String
                , default: ''
            }
            , 'height': {
                type: Number
                , default: 300
            }
            , 'id': {
                type: String
                , default: 'tinymce'
            }
        }
        , model: {
            prop: 'value'
        }
        , watch: {
            'value': function () {
                this.$nextTick(() => {
                    tinymce.activeEditor.setContent(this.value);
                });
            }
        }
        , mounted() {
            this.$nextTick(() => {
                this.edit = tinymce.init({
                    selector: '#' + this.id
                    , skin: false
                    , content_css: false
                    , content_style:"body{padding:10px; margin:0;}p{margin:0; padding:0;},html,body{height:100%;img{max-width:100%; display:block;}a{text-decoration:none;}iframe{ width: 100%; }p{ line-height:1.6; margin: 0px; }table{ word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }.mce-object-iframe{ width:100%; box-sizing:border-box; margin:0; padding:0; }"
                    , language: 'zh_CN'
                    , height: this.height
                    , relative_urls: false
                    , image_dimensions: false
                    , plugins: 'link lists image table media'
                    , menubar: false
                    , fontsize_formats: '12pt 13pt 14pt 18pt 24pt 36pt 48pt'
                    , style_formats: [
                        {
                            title: '首行缩进',
                            block: 'p',
                            styles: {'text-indent': '2em'}
                        },
                        {
                            title: 'Headings', items: [
                                {title: 'Heading 1', format: 'h1'},
                                {title: 'Heading 2', format: 'h2'},
                                {title: 'Heading 3', format: 'h3'},
                                {title: 'Heading 4', format: 'h4'},
                                {title: 'Heading 5', format: 'h5'},
                                {title: 'Heading 6', format: 'h6'}
                            ]
                        },
                        {
                            title: '行高',
                            items: [
                                {title: '1', styles: {'line-height': '1'}, inline: 'span'},
                                {title: '1.5', styles: {'line-height': '1.5'}, inline: 'span'},
                                {title: '2', styles: {'line-height': '2'}, inline: 'span'},
                                {title: '2.5', styles: {'line-height': '2.5'}, inline: 'span'},
                                {title: '3', styles: {'line-height': '3'}, inline: 'span'}
                            ]
                        }
                    ]
                    , toolbar:
                        'removeformat |styleselect | fontsizeselect | bold italic underline strikethrough  | forecolor backcolor | alignleft aligncenter alignright  link unlink image media'
                    , branding: false
                    , init_instance_callback: (editor) => {
                        editor.on('blur', () => {
                            let editorContent = editor.getContent();
                            if (this.value != editorContent) {
                                this.$emit('input', editorContent);
                            }
                        });
                    }
                    , images_upload_handler: (blobInfo, success, failure) => { // 图片异步上传处理函数
                        this.handler(blobInfo, success, failure);
                    }
                })
            });
        }
        , beforeDestroy() {
            tinymce.remove(this.editor);
        }
        , methods: {
            handler(blobInfo, success, failure) {
                this.policy = getPolicy();
                let formdata = new FormData()
                    , file = blobInfo.blob()
                    , key = "img/" + this.policy.dir + fileRename(file.name);
                formdata.append("key", key);
                formdata.append("policy", this.policy.policy);
                formdata.append("OSSAccessKeyId", this.policy.OSSAccessKeyId);
                formdata.append("success_action_status", '200');
                formdata.append("signature", this.policy.signature);
                formdata.append("x-oss-security-token", this.policy.token);
                formdata.append('file', file);
                ajax.uploadFile(formdata, (url) => {
                    success(url + key);
                }, () => {
                    failure('文件上传失败，请联系管理员');
                });
            }
        }
    }
</script>

<style scoped>

</style>
