<template>
    <el-row style="margin-top: 100px">
        <el-col :span="7"/>
        <el-col :span="10">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>Login</span>
                    </div>
                </template>
                    <el-row>
                        <el-col :span="1"/>
                    <el-col :span="22">
                        <el-row>
                            <el-input
                                    v-model="login"
                                    clearable>
                                <template #prepend>E-mail&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
                            </el-input>
                        </el-row>
                        <el-row style="margin-top: 15px">
                            <el-input
                                    v-model="password"
                                    clearable
                                    show-password>
                                <template #prepend>Password</template>
                            </el-input>
                        </el-row>
                        <el-row style="margin-top: 15px; margin-bottom: 15px" justify="space-between">
                            <el-col :span="13"/>
                            <el-col :span="5">
                                <el-button type="primary" plain @click="loginIn">Enter</el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="success" plain @click="dialogVisible=true">Register</el-button>
                            </el-col>

                        </el-row>
                    </el-col>
                    </el-row>
            </el-card>
        </el-col>
        <el-dialog
                v-model="dialogVisible"
                width="35%"
                :before-close="handleClose"
                title="Registration form">
            <register-form @closeWindow="CloseRegWindow"/>
        </el-dialog>
    </el-row>

</template>

<script>
    import {mapState,mapActions} from 'vuex'
    import registerForm from './registerForm.vue'
    export default {
        name: "loginForm",
        data: () => ({
            login: '',
            password: '',
            dialogVisible:false,
        }),
        components:{
            registerForm
        },
        computed:{
            ...mapState(['user'])
        },
        methods:{
            ...mapActions(['signIn']),
           loginIn(){
              this.signIn({
                    login:this.login,
                    password:this.password
                })
                /*if (!login){
                    this.$message({
                        showClose: true,
                        message: 'Oopsie, login or password are wrong!',
                        type: 'error',
                        duration:3500
                    })
                }*/
            },
            CloseRegWindow(data){
                this.dialogVisible = data
            }
        }
    }

</script>

<style scoped>

</style>
