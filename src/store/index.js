import {createStore} from 'vuex'
import axios from "axios";
import users from '@/localAPI/users.json'
import router from "@/router";

const QUERY_URL = 'https://www.googleapis.com/youtube/v3/search?' //QUERY URL YOUTUBE
const API_KEY = '' //API YOUTUBE KEY

export default createStore({
    state: {
        isErrorFetch: false,
        isLoading: false,
        editObj: [], //Редактируемый объект из избранного
        userId: parseInt(localStorage.getItem("userInfo")) || null, // id пользователя для поиска постов
        videosID: [], //Массив с результатом поиска
        nameVideo: '', //Имя запроса для сохранения в избранное
        saveSearch: [], //Сохраненные запросы в localStorage
        token: localStorage.getItem("access_token") || null, // token пользователя
        countVideoSearch: '', //Количество найденных видео

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
        },
        isLoading(state, payload){
            return state.isLoading = payload
        },
        isErrorFetch(state, payload){
            return state.isErrorFetch = payload
        }
    },
    getters: {
        GET_VIDEOS(state) {
            return state.videosID;
        },//Получаю видео
        GET_SAVE_VIDEOS(state){
            return state.saveSearch;
        }, //Получаю сохранные избранные
        LOGGED_IN(state) {
            return state.token !== null;
        }, //Проверка что пользователь авторизирован

    },
    actions: {
        async fetchAPI({state, commit, dispatch}, payload) {
            console.log(payload)
            try {
                commit('isLoading', true)
                const {data} = await axios.get(QUERY_URL, {
                    params: {
                        part: 'snippet',
                        maxResults: payload.maxResults,
                        q: payload.title,
                        key: API_KEY,

                    }

                })
                commit('setCountVideoSearch', data.pageInfo.totalResults)
                console.log('Количество найдено:', data.pageInfo.totalResults)
                commit('setNameVideo', payload.title)
                dispatch('sortedVideo', data)
                router.push('/')
            }catch (e){
                commit('isErrorFetch', true)
            }finally {
                commit('isLoading', false)
                setTimeout(()=>{
                    commit('isErrorFetch', false)
                }, 5000)
            }



        },  //Получем данные для поиска и отправляем запрос на получение видео
        sortedVideo({dispatch, commit}, payload) {
            console.log('sort', payload)
            const videos = payload.items.map((item) => {

                return item.snippet
            })
            commit('setVideos', videos)

            // dispatch('getVideo', videos)
        },//Перебераем полученные видео
        saveSearchRequest({commit, state, dispatch}, payload){
            let saveSearch = state.saveSearch || [];
            saveSearch.push(payload);
            dispatch("addCartLocalStorage", saveSearch);
            console.log('Принимаем данные для сохранения',payload)
        }, //Получаем данные для сохранения в избранное
        addCartLocalStorage({ commit,dispatch }, payload) {
            localStorage.setItem("saveSearch", JSON.stringify(payload));
            dispatch("updateStateCart");
            console.log('Добавляем в local', payload)
        },//Добавляем избранное в  localStorage
        updateStateCart({commit}, ) {
            let loadSaveSearch = localStorage.getItem("saveSearch");

            commit("setSaveSearch", JSON.parse(loadSaveSearch));

            console.log('Загрузка local favorite', loadSaveSearch)
        }, //Обновляем state и подгружаем данные из localStorage
        getUpdateSearchQuery({commit, state}, payload){

            const editQuery = state.saveSearch.find(item => item === payload)
            if(editQuery){
                console.log('editQuery',payload)
                commit('editObj', payload)
            }
        },//Получаем данные из избранного о редактируемом объекте, ищем его и сохраняем
        updateSearchQuery({commit,state}, payload){
            console.log('updateSearchQuery',payload)
            const updateQuery = state.saveSearch.map(item => {
                if (item.id === payload.id) {
                    return payload;
                }
                return item;
            }); //Обновляем данный объект и
            commit('setSaveSearch', updateQuery)
            localStorage.setItem("saveSearch", JSON.stringify(updateQuery));

        },//Обновляем данный объект и обновляем localStorage
        getSearchFavorite({commit, state, dispatch}, payload){
            dispatch('runSearchFavorite',payload)
            router.push('/')
        }, //Получем объект для поиска избранного
        loggedUser({commit, state}, payload){
            console.log('Получил данные о пользователе',payload)
           let userAuth = users.find(user => user.name === payload.name && user.password === payload.password)
            if (userAuth){
                console.log('данные о польщзовтаеле', userAuth)
                localStorage.setItem("userInfo", userAuth.id )

                commit('setUser', parseInt(userAuth.id))
                commit('setToken', userAuth.token)
                localStorage.setItem("access_token", userAuth.token);
                router.push('/')

            }else{
                console.log('Очистил token')

                localStorage.removeItem("access_token");
                localStorage.removeItem("userInfo");
                commit('destroyToken')
                commit('destroyUserInfo')
            }


        }, //Проверям данные логин/пароль сравниваем и при успехе впускаем пользователя
        unLoggedUser({commit, state}){
            localStorage.removeItem("access_token");
            localStorage.removeItem("userInfo");
            commit('destroyToken')
            commit('destroyUserInfo')
            commit('setNameVideo', '')
            commit('setVideos', [])

            state.videosID = []
            router.push('/auth')
        } // logout user
    },

    modules: {}
})
