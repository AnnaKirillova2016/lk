<template>
    <el-menu
        :default-active="activeIndex"
        mode="horizontal"
    >
      <el-menu-item index="5" @click="allUsers">Все пользователи</el-menu-item>
      <el-menu-item index="1" @click="cities">Города</el-menu-item>
      <el-menu-item index="2" @click="clients">Контрагенты</el-menu-item>
      <el-menu-item index="3" @click="usrReg">Пользователи по регионам</el-menu-item>
      <el-menu-item index="6" @click="cdpo">Код ДПО</el-menu-item>
      <el-menu-item index="7" @click="dpo">ДПО</el-menu-item>
      <el-menu-item index="4" @click="example">Пример</el-menu-item>
    </el-menu>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "mainMenu",
  data: ()=>({
    activeIndex: 1
  }),
  methods:{
    ...mapActions(['getCities','exTags','getClients','getUsrReg','getAllUsers','get_cdpo','get_dpo']),
    async cities(){
      await this.getCities()
    },
    async example(){
      await this.exTags()
    },
    async clients(){
      await this.getClients()
    },
    async usrReg(){
      await this.getUsrReg()
    },
    async allUsers(){
      await this.getAllUsers()
    },
    async cdpo(){
      await this.get_cdpo('')
    },
    async dpo(){
      await this.get_dpo()
    }
  }

}
</script>

<style scoped>

</style>