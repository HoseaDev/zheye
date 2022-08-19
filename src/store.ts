import {Commit, createStore} from "vuex";
import {UserProps, ColumnProps, PostProps, GlobalErrorMessagePros} from "@/model/ModelDeclare";
import axios from "axios";

//该类的作用是为了在ts中使用store的时候有类型推断
export interface GlobalDataPros {
    user: UserProps,
    columns: ColumnProps[],
    posts: PostProps[],
    isShowLoading: boolean,
    token: string,
    error: GlobalErrorMessagePros
}


const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
    const {data} = await axios.get(url)
    commit(mutationName, data)
    return data
}

const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
    const {data} = await axios.post(url, payload)
    commit(mutationName, data)
    return data
}


const store = createStore<GlobalDataPros>({
    state: {
        token: localStorage.getItem('token') || '',
        user: {isLogin: false},
        columns: [],
        posts: [],
        isShowLoading: false,
        error: {status: false}

    },
    mutations: {
        login(state, payload) {
            console.log('payload' + {...payload})
            state.user = payload
        },
        logout(state) {
            localStorage.removeItem('token')
            state.user = {isLogin: false}
            delete axios.defaults.headers.common.Authorization
        },
        createPost(state, payload) {
            state.posts.push(payload)
        },
        fetchColumn(state, obj) {
            console.log('getColumn', obj)
            state.columns = obj.data.list
        },
        fetchPostsByColumnId(state, obj) {
            console.log('getPostsByColumnId', obj)
            state.posts = obj.data.list
        },
        setShowLoading(state, obj) {
            console.log('setShowLoading', obj)
            state.isShowLoading = obj
        },
        setUserToken(state, obj) {
            const token = `Bearer ${obj.data.token}`
            state.token = token
            axios.defaults.headers.common['Authorization'] = token
            localStorage.setItem('token', token)
        },
        setUserInfo(state, rowData) {
            console.log(rowData.data)
            state.user = {...rowData.data, isLogin: true}

        }
    },
    actions: {
        getColumn(context) {
            return getAndCommit('/o/api/columns?currentPage=1&pageSize=5', 'fetchColumn', context.commit)

        },
        getPostsByColumnId(context, cid: string) {
            return getAndCommit(`/o/api/columns/${cid}/posts?currentPage=1&pageSize=5`, 'fetchPostsByColumnId', context.commit)
        },
        //loginAndFetch({ dispatch }, loginData) {
        //       return dispatch('login', loginData).then(() => {
        //         return dispatch('fetchCurrentUser')
        //       })
        //     }
        createPost({commit}, playload) {
            return postAndCommit('/o/api/posts', 'createPost', commit, playload).then(data => {
                return data
            })
        },

        login({dispatch, commit}, user) {
            return postAndCommit('/o/api/user/login', 'setUserToken', commit, user).then(data => {
                return dispatch('getUserInfo')
            })
        },
        getUserInfo({dispatch, commit}) {
            console.log('getUserInfo start')
            return getAndCommit('/o/api/user/current', 'setUserInfo', commit).then(data => {
                return data;
            })
        }
    },
    getters: {

        getColumnById: (state) => (id: string) => {
            return state.columns.filter(m => m._id === id)
        },
        getPostsByCId: (state) => (cId: string) => {
            return state.posts.filter(m => m.column === cId)
        }
    }
})


export default store
