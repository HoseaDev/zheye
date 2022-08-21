import {Commit, createStore} from "vuex";
import {UserProps, ColumnProps, PostProps, GlobalErrorMessagePros, ListPost} from "@/model/ModelDeclare";
import axios, {AxiosRequestConfig} from "axios";
import {arrToObj, objToArr} from "@/hooks/helper";

//该类的作用是为了在ts中使用store的时候有类型推断
export interface GlobalDataPros {
    user: UserProps,
    columns: ColumnProps[],
    posts: { data: ListPost<PostProps>, loadedColumns: string[] },
    isShowLoading: boolean,
    token: string,
    error: GlobalErrorMessagePros
}


const asyncAndCommit = async (url: string, mutationName: string,
                              commit: Commit, config: AxiosRequestConfig = {method: 'get'}, extraData?: any) => {
    const {data} = await axios(url, config)
    if (extraData) {
        commit(mutationName, {data, extraData})
    } else {
        commit(mutationName, data)
    }
    return data
}


const store = createStore<GlobalDataPros>({
    state: {
        token: localStorage.getItem('token') || '',
        user: {isLogin: false},
        columns: [],
        posts: {data: {}, loadedColumns: []},
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
            state.posts.data[payload._id] = payload
        },
        fetchColumn(state, obj) {
            console.log('getColumn', obj)
            state.columns = obj.data.list
        },
        fetchPosts(state, {data: rawData, extraData: columnId}) {
            state.posts.data = {...state.posts.data, ...arrToObj(rawData.data.list)}
            state.posts.loadedColumns.push(columnId)
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

        },
        updatePost(state, {data}) {
            state.posts.data[data._id] = data
        },
        fetchPost(state, {data: rawData}) {
            console.log('rawData', rawData)
            const {data} = rawData
            console.log('data', data)
            state.posts.data[data._id] = data
        },
    },
    actions: {
        getColumn(context) {
            return asyncAndCommit('/o/api/columns?currentPage=1&pageSize=5', 'fetchColumn', context.commit)

        },
        getPostsByColumnId(context, cid: string) {
            return asyncAndCommit(`/o/api/columns/${cid}/posts?currentPage=1&pageSize=5`, 'fetchPosts', context.commit, {method: "get"}, cid)
        },
        getPostById(context, pid: string) {
            return asyncAndCommit(`/o/api/posts/${pid}`, 'fetchPost', context.commit, {method: "get"}, pid)
        },
        //loginAndFetch({ dispatch }, loginData) {
        //       return dispatch('login', loginData).then(() => {
        //         return dispatch('fetchCurrentUser')
        //       })
        //     }
        createPost({commit}, playload) {
            return asyncAndCommit('/o/api/posts', 'setPost', commit, {method: "post"}, playload).then(data => {
                return data
            })
        },
        updatePost({commit}, {playload,id}) {
            return asyncAndCommit(`/o/posts/${id}`, 'updatePost', commit, {method: "patch"}, playload)
        },

        login({dispatch, commit}, user) {
            return asyncAndCommit('/o/api/user/login', 'setUserToken', commit, {method: "post"}, user).then(data => {
                return dispatch('getUserInfo')
            })
        },
        getUserInfo({dispatch, commit}) {
            console.log('getUserInfo start')
            return asyncAndCommit('/o/api/user/current', 'setUserInfo', commit).then(data => {
                return data;
            })
        }
    },
    getters: {

        getColumnById: (state) => (id: string) => {
            return state.columns.filter(m => m._id === id)
        },
        getPostsByCId: (state) => (cId: string) => {
            return objToArr(state.posts.data).filter(p => p.column === cId)
        },
        getPostById: (state) => (id: string) => {
            return state.posts.data[id]
        }
    }
})


export default store
