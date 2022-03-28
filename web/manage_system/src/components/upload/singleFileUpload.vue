<template>
    <div class="single-img">
        <Upload :show-upload-list="false"
                :action="url"
                :data="data"
                :before-upload="beforeUpload"
                :accept="accept"
                :max-size="size"
                :disabled="btn.disabled"
                :on-format-error="formatError"
                :on-exceeded-size="exceededSize"
                :on-progress="process"
                :on-success="success"
                v-if="src.length == 0">
            <Button type="primary">
                <span>{{btn.text}}</span>
            </Button>
        </Upload>
        <template v-else>
            <div v-if="preview"
                 class="image-preview"
                 :style="{width:width,height:height}"
                 @click="visible = true">
                <img :src="src" alt="">
            </div>
            <div v-else class="image-preview">
                <span>{{src}}</span>
            </div>
            <Button type="error" @click="remove" size="small">
                <span>删除</span>
            </Button>
        </template>
        <Modal class="image-show"
               title="图片预览"
               v-model="visible"
               :footer-hide="true">
            <img :src="src" alt="">
        </Modal>
    </div>
</template>
<script>
    import {getPolicy, fileRename} from "@/common/tools";

    export default {
        data() {
            return {
                btn: {
                    text: '选择文件',
                    disabled: false,
                },
                visible: false,
                data: {
                    key: '',
                    policy: '',
                    OSSAccessKeyId: '',
                    success_action_status: '200',
                    signature: '',
                },
                url: "https://xiaolanting.oss-cn-shanghai.aliyuncs.com/",
                policy: {},
            }
        },
        props: {
            width: {
                type: String,
                default: '100px',
            },
            height: {
                type: String,
                default: '100px',
            },
            accept: {
                type: String,
                default: '.png,.jpg',
            },
            preview: {
                type: Boolean,
                default: true,
            },
            value: {
                type: String,
                default: '',
            },
            size: {
                type: Number,
                default: 2014,
            }
        },
        model: {
            prop: 'value'
        },
        computed: {
            src: {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit('input', val);
                }
            }
        },
        methods: {
            // 格式不正确
            formatError() {
                this.$Message.warning('允许上传的文件格式为：' + this.accept);
            },
            // 文件大小超限制
            exceededSize() {
                this.$Message.warning('上传文件不能超过：' + this.size / 1024 + 'M');
            },
            // 文件上传前
            beforeUpload(file) {
                this.policy = getPolicy();
                this.data.OSSAccessKeyId = this.policy.OSSAccessKeyId;
                this.data.policy = this.policy.policy;
                this.data.success_action_status = '200';
                this.data.key = "img/" + this.policy.dir + fileRename(file.name);
                this.data.signature = this.policy.signature;
                this.data["x-oss-security-token"] = this.policy.token;
                return true;
            },
            // 上传进度
            process(event, file) {
                this.btn = {
                    text: '上传进度' + file.percentage.toFixed(2) + '%',
                    disabled: true,
                };
            },
            // 上传成功
            success() {
                this.btn = {
                    text: '选择文件',
                    disabled: false,
                };
                this.src = this.url + this.data.key;
            },
            // 删除文件
            remove() {
                this.src = '';
            }
        },
    }
</script>
<style>

</style>
