<template>
    <el-row justify="space-between">

        <el-col :span="22" >
            <div class="grid-content bg-purple-dark" ><h1>Admin panel</h1></div>
        </el-col>
        <el-col  :span="1">
            <div class="grid-content bg-purple-dark"><h1>
<!--                <el-button v-if="user == null" type="primary" plain @click="switchUser">Вход</el-button>-->
                <el-button v-if="user != null" type="danger" plain @click="logOut">Выход</el-button>
            </h1></div>
        </el-col>
    </el-row>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    export default {
        name: "headerMenu",
        computed:{
            ...mapState(['user']),
        },
        methods:{
            ...mapActions(['signOut']),
            logOut(){
                this.signOut()
            }
        }
    }
</script>

<style scoped>

</style>
