import {createStore} from 'vuex'
import axios from "axios";
import users from '@/localAPI/users.json'
import router from "@/router";

const QUERY_URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='
const API_KEY = ''

export default createStore({
    state: {
        editObj: [],
        userId: parseInt(localStorage.getItem("userInfo")) || null,
        videosID: [],
        maxResults: 12,
        nameVideo: '',
        saveSearch: [],
        token: localStorage.getItem("access_token") || null,
        countVideoSearch: '',

    },
    mutations: {
        setVideos(state, payload) {
            state.videosID = payload;

        },
        setNameVideo(state, payload){
            state.nameVideo = payload;
        },
        setCountVideoSearch(state, payload){
          state.countVideoSearch  = payload;
        },
        setSaveSearch(state, payload){
            state.saveSearch = payload;
        },
        setToken(state, payload){
            state.token = payload;
        },
        destroyToken(state) {
            state.token = null;
            console.log('mutation token clear')
        },
        setUser(state, payload){
            state.userId = payload;
            console.log('state user', state.userId)
        },
        destroyUserInfo(state){
            state.userId = null;
        },
        editObj(state, payload){
            state.editObj = payload
            console.log('editObj',payload)
        }
    },
    getters: {
        GET_VIDEOS(state) {
            return state.videosID;
        },
        GET_SAVE_VIDEOS(state){
            return state.saveSearch;
        },
        LOGGED_IN(state) {
            return state.token !== null;
        },

    },
    actions: {
        async fetchAPI({state, commit, dispatch}, nameVideo) {
            const {data} = await axios.get(QUERY_URL + nameVideo + '&key=' + API_KEY, {
                params: {
                    maxResults: state.maxResults
                }

            })
            commit('setCountVideoSearch', data.pageInfo.totalResults)
            console.log('Количество найдено:', data.pageInfo.totalResults)
            commit('setNameVideo', nameVideo)
            dispatch('sortedVideo', data)


        },
        sortedVideo({dispatch, commit}, payload) {
            console.log('sort', payload)
            const videos = payload.items.map((item) => {

                return item.snippet
            })
            commit('setVideos', videos)

            // dispatch('getVideo', videos)
        },
        saveSearchRequest({commit, state, dispatch}, payload){
            let saveSearch = state.saveSearch || [];
            saveSearch.push(payload);
            dispatch("addCartLocalStorage", saveSearch);
            console.log('Принимаем данные для сохранения',payload)
        },
        addCartLocalStorage({ commit,dispatch }, payload) {
            localStorage.setItem("saveSearch", JSON.stringify(payload));
            dispatch("updateStateCart");
            console.log('Добавляем в local', payload)
        },
        updateStateCart({commit}, payload) {
            let loadSaveSearch= localStorage.getItem("saveSearch");

            commit("setSaveSearch", JSON.parse(loadSaveSearch));

            console.log('Загрузка local favorite', loadSaveSearch)
        },
        getUpdateSearchQuery({commit, state}, payload){

            const editQuery = state.saveSearch.find(item => item === payload)
            if(editQuery){
                console.log('editQuery',payload)
                commit('editObj', payload)
            }
        },
        updateSearchQuery({commit,state}, payload){
            console.log('updateSearchQuery',payload)
            const updateQuery = state.saveSearch.map(item => {
                if (item.id === payload.id) {
                    return payload;
                }
                return item;
            });
            commit('setSaveSearch', updateQuery)
            localStorage.setItem("saveSearch", JSON.stringify(updateQuery));

        },
        getSearchFavorite({commit, state, dispatch}, payload){
            dispatch('runSearchFavorite',payload)
            router.push('/search')
        },
        async runSearchFavorite({state, commit, dispatch}, payload){
            console.log('получил', payload)
            const {data} = await axios.get(QUERY_URL + payload.title + '&key=' + API_KEY, {
                params: {
                    maxResults: payload.maxResults
                }

            })

            commit('setNameVideo', payload.title)
            dispatch('sortedVideo', data)
        },
        loggedUser({commit, state}, payload){
            console.log('Получил данные о пользователе',payload)
           let userAuth = users.find(user => user.name === payload.name && user.password === payload.password)
            if (userAuth){
                console.log('данные о польщзовтаеле', userAuth)
                localStorage.setItem("userInfo", userAuth.id )

                commit('setUser', parseInt(userAuth.id))
                commit('setToken', userAuth.token)
                localStorage.setItem("access_token", userAuth.token);
                axios.defaults.headers.common["Authorization"] =
                    "Bearer " + state.token
                router.push('/search')

            }else{
                console.log('Очистил token')
                localStorage.removeItem("access_token");
                localStorage.removeItem("userInfo");
                commit('destroyToken')
                commit('destroyUserInfo')
            }


        },
        unLoggedUser({commit, state}){
            localStorage.removeItem("access_token");
            localStorage.removeItem("userInfo");
            commit('destroyToken')
            commit('destroyUserInfo')
            state.nameVideo = ''
            state.videosID = []
            router.push('/auth')
        }


    },

    modules: {}
})
