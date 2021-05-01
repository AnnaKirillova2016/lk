<template>
    <el-container>
        <el-row style="width: 100%">
            <el-col :span="4">
                <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        >
                    <el-menu-item index="1" @click="page='Profile'">
                        <i class="el-icon-menu"></i>
                        <span>Profile</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="page='Users'">
                        <i class="el-icon-menu"></i>
                        <span>Users</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="page='Tokens'">
                        <i class="el-icon-menu"></i>
                        <span>Tokens</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="1"/>
            <el-col :span="17">
                <div v-if="page=='Profile'">
                    Profile
                </div>
                <div v-if="page=='Users'">
                    Table of users
                    <el-button @click="getAllUsers">load</el-button>
                    <el-table
                    :data="usersData"
                    style="width: 100%">
                    <el-table-column v-bind:label="Operations">
                        <template #default="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                        </template>
                    </el-table-column>
                    </el-table>

                </div>
                <div v-if="page=='Tokens'">
                    Token
                </div>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    export default {
        name: "BMain",
        data: () => ({
            page:'Profile'
        }),
        computed:{
            ...mapState(['usersData'])
        },
        methods:{
            ...mapActions(['getTableUsers']),
            getAllUsers(){
                this.getTableUsers()
            },
        },
        mounted() {
            this.getAllUsers()
        },

    }
</script>

<style scoped>

</style>
