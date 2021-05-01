<template>
    <el-row>
<!--        <el-col :span="3"/>-->
        <el-col :span="24">
           <!-- <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>Register</span>
                    </div>
                </template>-->
                <el-row>
                    <el-col :span="3"/>
                    <el-col :span="18">
                        <el-row>
                            <el-input
                                    v-model="newUser.login"
                                    clearable>
                                <template #prepend>Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
                            </el-input>
                        </el-row>
                        <el-row style="margin-top: 15px">
                            <el-input
                                    v-model="newUser.password"
                                    clearable
                                    show-password>
                                <template #prepend>Password&nbsp;</template>
                            </el-input>
                        </el-row>
                        <el-row style="margin-top: 15px">
                            <el-input
                                    v-model="newUser.email"
                                    clearable
                                    >
                                <template #prepend>E-mail&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
                            </el-input>
                        </el-row>
                        <el-row style="margin-top: 15px">
                            <el-input
                                    v-model="newUser.firstName"
                                    clearable
                                    >
                                <template #prepend>Firstname</template>
                            </el-input>
                        </el-row>
                        <el-row style="margin-top: 15px">
                            <el-input
                                    v-model="newUser.lastName"
                                    clearable
                                    >
                                <template #prepend>Lastname&nbsp;</template>
                            </el-input>
                        </el-row>
                        <el-row style="margin-top: 15px; margin-bottom: 15px" justify="space-between">
                            <el-col :span="11"/>
                            <el-col :span="6">
                                <el-button type="success" plain @Click="btnConfirm">Save</el-button>
                            </el-col>
                            <el-col :span="7">
                                <el-button type="danger" plain @Click="btnCancel">Cancel</el-button>
                            </el-col>

                        </el-row>
                    </el-col>
                </el-row>
            <!--</el-card>-->
        </el-col>
    </el-row>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    export default {
        name: "registerForm",
        data: () => ({
            newUser: {
                login: '',
                password: '',
                email: '',
                firstName: '',
                lastName: '',
                isActive: false,
                other: ''
            }
        }),
        computed: {...mapState(['user'])},
        methods: {
            ...mapActions(['regUser']),
            btnCancel() {
                this.newUser = {
                    login: '',
                    password: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    isActive: false,
                    other: ''
                }
                this.$emit('closeWindow', false)
            },
            btnConfirm(){
                if(!this.user) {
                    this.$notify({
                        title: 'Регистрация',
                        dangerouslyUseHTMLString: true,
                        message: '<strong>' + this.newUser.firstName + ' ' + this.newUser.lastName + '.</strong> <br>Ваши регистрационные данные отправлены. <br>Подтверждение регистрации производится в ручном режиме, ожидайте ответ на e-mail: ' + this.newUser.email,
                        position: 'bottom-right',
                        duration: 6000
                    })
                    this.regUser(this.newUser)

                }
            }
        }
    }
</script>

<style scoped>

</style>
