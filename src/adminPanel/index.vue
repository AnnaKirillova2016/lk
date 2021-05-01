<template>
    <el-container>
        <el-header >
            <HeaderMenu/>
        </el-header>
        <el-main v-if="user === null">
            <LoginForm />
        </el-main>
        <el-main v-else>
            <b-main/>
        </el-main>
    </el-container>
</template>

<script>
    import HeaderMenu from '../adminPanel/components/headerMenu.vue'
    import LoginForm from '../adminPanel/components/loginForm.vue'
    import BMain from './components/BMain.vue'
    import {mapState, mapActions} from 'vuex'
    export default {
        name: "index",
        components:{
            BMain,
            HeaderMenu,
            LoginForm
        },
        data:()=>({
        }),
        computed: {
            ...mapState(['user'])
        },
        methods:{
            ...mapActions(['checkLogin'])
        },
        mounted() {
            this.checkLogin()
        }
    }
</script>

<style scoped>

</style>
