import {createStore} from 'vuex'
import schemaFile from '../assets/schemaFile.js'
import axios from 'axios'
import {convertF} from '../components/convertation'

export default createStore({
  state: {
    user: null,
    token:'isNull',
    usersData:[],
    intSchema :{btn:{comp:"button", text:"No JSON data loaded", type: "warning"}},
    dataSchema : {}
    /*intSchema: {
        anketa_education_level:{
            "comp": "group",
            "col": "24",
            "header": "Уровень образования",
            "schema": {
                "anketa_ord": { "comp": "checkbox", "text": "Ординатура" },
                "anketa_spo": { "comp": "checkbox", "text": "Среднее профессиональное образование" },
                "anketa_vo":  { "comp": "checkbox", "text": "Высшее образование" }
            }
        }
        }*/
  },
  mutations: {
  },
  actions: {

      checkLogin({state}){
          state.user = localStorage.getItem('user')
          state.token = localStorage.getItem('token')
      },

   async signIn({state},user){

      let payload = {user: user}
      await axios
          .post('http://localhost:3000/api/users/login/', payload)
          .then(res =>{
                let data = res.data
                localStorage.user = data.user
                localStorage.token = data.token
                state.user = data.user
              return true
          }).catch((error) =>{
              console.log(error.response.status + ' ' + error.response.data)
              return false
          })

    },
    signOut({state}){
      state.user = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
    async schemaConverterInc({state},schemaJSON){

        //let schemaJSON = schemaFile.schemaInt() //парсинг через json.parse не работает. Не распознаются символы
        //let schemaJSON = schemaFile.schemaTest1()
        //let schemaJSON = schemaFile.schemaTest()

       /* await axios({
            method: 'get',
            url: 'http://localhost:3000/api/odinc/allusers',
        })
            .then(res =>{
                schemaJSON = res.data
            }).catch((error) =>{
                console.log(error.response.status + ' ' + error.response.data)
                return false
            })*/


        let schemaData = []
        if(Object.prototype.hasOwnProperty.call(schemaJSON, 'data2')) {
            schemaData = schemaJSON.data2
        }
        //let schemaData = convertF('select',schemaFile.schemaData())
       /* console.log('SelectList')
        console.log(schemaData)
        console.log('---------------------------------------')*/
        let result = {int:{},data:{}}
        result.int = convertF('interface',schemaJSON.data,schemaData)
        result.data = convertF('data',schemaJSON.data)

        //result = null
         if (result != null) {
             state.intSchema = result.int
             state.dataSchema = result.data
         }

        //console.log(result)
    },
    async getTableUsers({state}){
      await axios
          .get('http://localhost:3000/api/users/',{
              headers:{
                  'x-access-token': state.token
              }
          })
          .then(response => (state.usersData = response))
    },
    async regUser({state},newUser){

      let payload = { newUser: newUser }

      let res = await axios.post('http://localhost:3000/api/users/registration', payload)

      let data = res.data
      console.log(data)
      console.log(state.user)
      //console.log(res)
    },
      async getCities({dispatch}){
         // let schemaJSON =''
          await axios({
              method: 'get',
              url: 'http://localhost:3000/api/odinc/cities',
          })
              .then(res =>{
                  //schemaJSON = res.data
                  dispatch('schemaConverterInc',{ 'data': res.data })
              }).catch((error) =>{
                  console.log(error.response.status + ' ' + error.response.data)
                  return false
              })
      },
      exTags({dispatch}){
          let schemaJSON = schemaFile.schemaInt()
          let schemaData = convertF('select',schemaFile.schemaData())
          dispatch('schemaConverterInc',{ 'data': schemaJSON,'data2':schemaData})
      },
      async getClients({dispatch}){
          // let schemaJSON =''
          await axios({
              method: 'get',
              url: 'http://localhost:3000/api/odinc/all_organization',
          })
              .then(res =>{
                  //schemaJSON = res.data
                  dispatch('schemaConverterInc',{ 'data': res.data })
              }).catch((error) =>{
                  console.log(error.response.status + ' ' + error.response.data)
                  return false
              })
      },
      async getUsrReg({dispatch}){
          // let schemaJSON =''
          await axios({
              method: 'get',
              url: 'http://localhost:3000/api/odinc/all_region_user',
          })
              .then(res =>{
                  //schemaJSON = res.data
                  dispatch('schemaConverterInc',{ 'data': res.data })
              }).catch((error) =>{
                  console.log(error.response.status + ' ' + error.response.data)
                  return false
              })
      },
      async getAllUsers({dispatch}){
          // let schemaJSON =''
          await axios({
              method: 'get',
              url: 'http://localhost:3000/api/odinc/allusers',
          })
              .then(res =>{
                  //schemaJSON = res.data
                  dispatch('schemaConverterInc',{ 'data': res.data })
              }).catch((error) =>{
                  console.log(error.response.status + ' ' + error.response.data)
                  return false
              })
      },
      async get_cdpo({dispatch},dpo){
          // let schemaJSON =''
          await axios({
              method: 'get',
              url: 'http://localhost:3000/api/odinc/programm_dpo_code1c',
              headers:{
                  'Content-type': 'application/json; charset=utf-8',
                  'Accept': 'application/json; charset=utf-8',
                  'dpo':window.btoa(unescape(encodeURIComponent( dpo )))
              }
          })
              .then(res =>{
                  //schemaJSON = res.data
                  dispatch('schemaConverterInc',{ 'data': res.data })
              }).catch((error) =>{
                  console.log(error.response.status + ' ' + error.response.data)
                  return false
              })
      },
      async get_dpo({dispatch},dpo){
          // let schemaJSON =''
          await axios({
              method: 'get',
              url: 'http://localhost:3000/api/odinc/programm_dpo',
              headers:{
                  'Content-type': 'application/json; charset=utf-8',
                  'Accept': 'application/json; charset=utf-8',
                  'dpo':window.btoa(unescape(encodeURIComponent( dpo )))
              }
          })
              .then(res =>{
                  //schemaJSON = res.data
                  dispatch('schemaConverterInc',{ 'data': res.data })
              }).catch((error) =>{
                  console.log(error.response.status + ' ' + error.response.data)
                  return false
              })
      },
  },
  modules: {
  }
})
