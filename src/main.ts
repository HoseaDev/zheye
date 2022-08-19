import {createApp} from 'vue'
// import './style.css'
import App from './App.vue'
import router from "@/router";

const app = createApp(App)
import store from "@/store";
import axios from "axios";

axios.interceptors.request.use((config) => {
    // config.params = {...config.params, 'yourname': 'hosea'}
    store.commit('setShowLoading', true)

    return config
})

axios.interceptors.response.use((config) => {

    console.log('request success')
    store.commit('setShowLoading', false)
    return config
}, (reject) => {
    store.commit('setShowLoading', false)
    const {error} = reject.response.data
    store.state.error = {status: true, message: error}
    console.log('error', error)
    return Promise.reject(error)
})


app.use(router)
app.use(store)
app.mount('#app')
