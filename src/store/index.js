import {createStore} from 'vuex'
import jsonSChema from '../assets/schemaFile.js'
import axios from 'axios'

export default createStore({
  state: {
    user: null,
    token:'isNull',
    usersData:[]
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
    schemaConverterInc(){
      let schemaJSON = jsonSChema.jsonSchema()
      return schemaJSON
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
