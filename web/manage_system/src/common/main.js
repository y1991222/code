import Vue from 'vue';
import '../style/theme.less';
import iView from 'view-design';
// import dialog from './components/dialog';
import drawer from '@/components/drawer';
import page from '@/components/page';

Vue.use(iView);

Vue.config.productionTip = false;
// 表单提交
Vue.prototype.$submit = (obj, form, callback) => {
    let formDom = obj.$refs[form];
    formDom.validate((valid) => {
        if (valid) {
            callback();
        } else {
            let errors = formDom.fields;
            for (let error of errors) {
                if (error.validateState == 'error') {
                    obj.$Message.warning({
                        content: error.validateMessage
                        , duration: 2
                    });
                    break;
                }
            }
        }
    });
};
Vue.component('dlg', drawer);
Vue.component('page', page);
export default Vue;
