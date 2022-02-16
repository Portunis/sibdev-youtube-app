import {createStore} from 'vuex'
import axios from "axios";

const QUERY_URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='
const API_KEY = ''

export default createStore({
    state: {
        videosID: [],
        maxResults: 12,
        nameVideo: '',
        saveSearch: []

    },
    mutations: {
        setVideos(state, payload) {
            state.videosID = payload;

        },
        setNameVideo(state, payload){
            state.nameVideo = payload;
        },
        setSaveSearch(state, payload){
            state.saveSearch = payload;
        },
    },
    getters: {
        GET_VIDEOS(state) {
            return state.videosID;
        },
        GET_SAVE_VIDEOS(state){
            return state.saveSearch
        }
    },
    actions: {
        async fetchAPI({state, commit, dispatch}, nameVideo) {
            const {data} = await axios.get(QUERY_URL + nameVideo + '&key=' + API_KEY, {
                params: {
                    maxResults: state.maxResults
                }

            })

            commit('setNameVideo', nameVideo)
            dispatch('sortedVideo', data.items)


        },
        sortedVideo({dispatch, commit}, payload) {
            const videos = payload.map((item) => {

                return item.snippet
            })
            commit('setVideos', videos)

            // dispatch('getVideo', videos)
        },
        saveSearchRequest({commit, state, dispatch}, saveSearchQuery){
            let saveSearch = state.saveSearch || [];
            if (saveSearch.find(it => it.id === saveSearchQuery.id) === undefined) {
                saveSearch.push(saveSearchQuery);
            }
            dispatch("addCartLocalStorage", saveSearch);
            console.log(saveSearchQuery)
        },
        addCartLocalStorage({ commit,dispatch }, payload) {
            window.localStorage.setItem("saveSearch", JSON.stringify(payload));
            dispatch("updateStateCart");
        },
        updateStateCart({commit}, payload) {
            let loadSaveSearch= window.localStorage.getItem("saveSearch");

            commit("setSaveSearch", JSON.parse(loadSaveSearch));
        },


    },

    modules: {}
})
