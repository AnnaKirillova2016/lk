import {createStore} from 'vuex'
import {jsonSchemaInt} from '../assets/schemaFile.js'
import axios from 'axios'
import {convertF} from '../components/convertation'

export default createStore({
  state: {
    user: null,
    token:'isNull',
    usersData:[],
    intSchema :{btn:{comp:"button", text:"No JSON data loaded", class: "warning"}},
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
    schemaConverterInc({state}){
        let schemaJSON = jsonSchemaInt() //парсинг через json.parse не работает. Не распознаются символы
        let result = {int:{},data:{}}
        result.int = convertF('interface',schemaJSON)
        result.data = convertF('data',schemaJSON)

        state.intSchema = result.int
        state.dataSchema = result.data
        console.log(result)
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
    }
  },
  modules: {
  }
})
