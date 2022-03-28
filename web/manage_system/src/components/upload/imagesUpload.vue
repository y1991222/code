<template>
    <div class="clearfix">
        <Upload ref="imagesUpload"
                :multiple="true"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :action="url"
                :data="data"
                :before-upload="beforeUpload"
                :accept="accept"
                :format="format"
                :max-size="size"
                :on-format-error="formatError"
                :on-exceeded-size="exceededSize"
                :on-success="success"
                v-show="uploadList.length < this.total">
            <Button type="primary">
                <Icon type="cloud-upload"/>
                <span>选择文件</span>
            </Button>
        </Upload>
        <Modal class="image-show"
               title="图片预览"
               v-model="previewVisible"
               :footer-hide="true">
            <img :src="previewImage" alt="">
        </Modal>
        <ul class="preview-lists">
            <li class="image-preview" v-for="(item,index) in uploadList">
                <template v-if="item.status == 'finished'">
                    <img :src="item.url"
                         alt="">
                    <div class="image-action">
                        <span @click="moveLeft(index)"><Icon type="ios-arrow-back"/></span>
                        <span @click="moveRight(index)"><Icon type="ios-arrow-forward"/></span>
                        <span @click="handlePreview(item.url)"><Icon type="md-eye"/></span>
                        <span @click="remove(item)"><Icon type="md-trash"/></span>
                    </div>
                </template>
                <i-circle v-else :size="70" :percent="item.percentage">
                    <span style="font-size:16px">{{ Math.floor(item.percentage)}}%</span>
                </i-circle>
            </li>
        </ul>
    </div>
</template>
<script>
    import {getPolicy, fileRename} from "@/common/tools";

    export default {
        data() {
            return {
                previewVisible: false,
                previewImage: '',
                uploadList: [],
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
            accept: {
                type: String,
                default: '.png,.jpg',
            },
            value: {
                type: Array,
                default() {
                    return [];
                },
            },
            size: {
                type: Number,
                default: 2048,
            },
            total: {
                type: Number,
                default: 3,
            }
        },
        model: {
            prop: 'value'
        },
        computed: {
            defaultList() {
                let fileLists = [], position = 0;
                this.value.forEach((item) => {
                    position = item.lastIndexOf("/");
                    fileLists.push({
                        name: item.substr(position + 1),
                        url: item,
                    })
                });
                this.$nextTick(() => { //赋值后马上更新
                    this.uploadList = this.$refs.imagesUpload.fileList;
                });
                return fileLists;
            },
            format() {
                let accept = this.accept.split(','),
                    format = [];
                accept.forEach((item) => {
                    format.push(item.substr(1))
                });
                return format;
            }
        },
        mounted() {
            this.uploadList = this.$refs.imagesUpload.fileList;
        },
        methods: {
            handlePreview(src) {
                this.previewImage = src;
                this.previewVisible = true
            },
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
                // 上传文件数量限制
                if (this.uploadList.length > this.total) {
                    this.$Message.warning('最多只能上传' + this.total + '张图片');
                    return false;
                }
                this.policy = getPolicy();
                this.data.OSSAccessKeyId = this.policy.OSSAccessKeyId;
                this.data.policy = this.policy.policy;
                this.data.success_action_status = '200';
                this.data.key = "img/" + this.policy.dir + fileRename(file.name);
                this.data.signature = this.policy.signature;
                this.data["x-oss-security-token"] = this.policy.token;
                return true;
            },
            // 上传成功
            success(response, file) {
                file.url = this.url + this.data.key;
                this.feedBack();
            },
            // 删除文件
            remove(file) {
                const fileList = this.$refs.imagesUpload.fileList;
                this.$refs.imagesUpload.fileList.splice(fileList.indexOf(file), 1);
                this.feedBack();
            },
            // 左移
            moveLeft(index) {
                let fileList = this.uploadList,
                    file = fileList[index];
                if (index > 0) {
                    let item = fileList[index - 1];
                    fileList.splice(index - 1, 1, file);
                    fileList.splice(index, 1, item);
                    this.feedBack();
                }
            },
            // 右移
            moveRight(index) {
                let fileList = this.uploadList,
                    file = fileList[index];
                if (index < fileList.length - 1) {
                    let item = fileList[index + 1];
                    fileList.splice(index + 1, 1, file);
                    fileList.splice(index, 1, item);
                    this.feedBack();
                }
            },
            feedBack() {
                this.$nextTick(() => { //赋值后马上更新
                    this.uploadList = this.$refs.imagesUpload.fileList;
                });
                let images = [];
                for (let item of this.uploadList) {
                    if (item.status != 'finished') {
                        return false;
                    }
                    images.push(item.url);
                }
                this.$emit('input', images);
            }
        },
    }
</script>
<style>

</style>
