<template lang='html'>
    <div id="login_page">
        <div class="logo">
            管理系统
        </div>
        <el-row>
            <el-col class="login-form" :span="8" :offset="8">
                <h3>登录</h3>
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item prop="userName">
                        <el-input v-model="loginForm.userName" icon="message" placeholder="用户名" @keypress.enter.native="getKeyToLogin('loginForm')"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" icon="information" placeholder="密码" type="password" @keypress.enter.native="getKeyToLogin('loginForm')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="loginForm.keepLogin" :checked="loginForm.keepLogin" @keypress.enter.native="getKeyToLogin('loginForm')">保持登录</el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getKeyToLogin('loginForm')">登录</el-button>
                        <el-button @click="resetForm('loginForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { Row, Col, Input, Checkbox, Button, Form, Notification } from 'element-ui';
import { JSEncrypt } from 'jsencrypt';

const rules = {
    userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
};

export default {
    data() {
        return {
            rules,
            loginForm: {
                userName: null,
                password: null,
                keepLogin: false,
            },
        };
    },
    metaInfo: {
        title: '登录',
    },
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Input.name]: Input,
        [Checkbox.name]: Checkbox,
        [Button.name]: Button,
        [Form.name]: Form,
    },
    computed: {
        ...mapGetters([
            'publicData',
        ]),
    },
    methods: {
        ...mapActions([
            'getPublicData',
            'login'
        ]),
        getKeyToLogin(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.getPublicData()
                    .then(() => {
                        this.loginHandler();
                    })
                    .catch((err) => {
                        Notification.error({
                            message: err.msg || '系统繁忙，请稍后再试',
                            duration: 3000,
                        });
                    });
                } else {
                    this.$notify({
                        message: '登录信息不完整',
                        type: 'warning',
                        duration: 1800,
                    });
                }
            });
        },
        loginHandler() {
            this.login({
                userName: this.encryptPsw(this.loginForm.userName),
                password: this.encryptPsw(this.loginForm.password),
                keepLogin: this.loginForm.keepLogin,
                rsaId: this.publicData.rsaId,
            })
            .then((data) => {
                if (this.loginForm.keepLogin) {
                    localStorage.setItem('token', data.token);    // eslint-disable-line no-undef
                    localStorage.setItem('userName', data.userInfo.userName);    // eslint-disable-line no-undef
                    localStorage.setItem('userDisplayName', data.userInfo.userDisplayName);    // eslint-disable-line no-undef
                    localStorage.setItem('keepLogin', this.loginForm.keepLogin);    // eslint-disable-line no-undef
                    sessionStorage.removeItem('token');    // eslint-disable-line no-undef
                    sessionStorage.removeItem('userName');    // eslint-disable-line no-undef
                    sessionStorage.removeItem('userDisplayName');    // eslint-disable-line no-undef
                } else {
                    sessionStorage.setItem('token', data.token);    // eslint-disable-line no-undef
                    sessionStorage.setItem('userName', data.userInfo.userName);    // eslint-disable-line no-undef
                    sessionStorage.setItem('userDisplayName', data.userInfo.userDisplayName);    // eslint-disable-line no-undef
                    localStorage.removeItem('token');    // eslint-disable-line no-undef
                    localStorage.removeItem('userName');    // eslint-disable-line no-undef
                    localStorage.removeItem('userDisplayName');    // eslint-disable-line no-undef
                    localStorage.setItem('keepLogin', false);    // eslint-disable-line no-undef
                }
                this.$router.replace(this.$route.query.redirect || '/index');
            })
            .catch((err) => {
                if (err) {
                    Notification.error({
                        message: err,
                        duration: 3000,
                    });
                } else {
                    Notification.error({
                        message: '暂时无法访问，请稍后重试!',
                        duration: 3000,
                    });
                }
            });
        },
        encryptPsw(str) {
            const encrypt = new JSEncrypt();
            encrypt.setPublicKey(this.publicData.publicKey);
            const encrypted = encrypt.encrypt(str);
            return encrypted;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            localStorage.removeItem('userName');    // eslint-disable-line no-undef
        },
    },
    mounted() {
        const localUserName = localStorage.getItem('userName'); // eslint-disable-line no-undef
        const sessionToken = localStorage.getItem('token') || sessionStorage.getItem('token'); // eslint-disable-line no-undef
        const localKeepLogin = localStorage.getItem('keepLogin') === 'true' || localStorage.getItem('keepLogin') === null; // eslint-disable-line no-undef
        this.$set(this.loginForm, 'userName', localUserName);
        this.$set(this.loginForm, 'keepLogin', localKeepLogin);
        if (sessionToken) {
            this.$router.replace('/index');
        }
    },
};
</script>
<style lang='less'>
#login_page {
    .logo {
        margin-top: 20px;
        font-size: 60px;
        color: rgb(225, 229, 234);
        font-weight: bolder;
        padding-left: 10px;
        text-align: center;
    }
    .login-form {
        margin-top: 30px;
        padding: 20px;
        background-color: rgba(255, 255, 255, 0.85);
        border-radius: 8px;
    }
}
</style>
