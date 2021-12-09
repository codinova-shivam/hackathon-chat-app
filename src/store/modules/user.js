import { FriendService } from "../../api";
import { Friend, User } from "../../models";
import { MUTATION_TYPES as BASE_MUTATION_TYPES} from "../mutations";

const MUTATION_TYPES = BASE_MUTATION_TYPES.USER
const state = {
    user: null,
    friends:[],
    areFriendsLoading:false
};

const mutations = {
    [MUTATION_TYPES.SET_USER]: (state, user) => {
        state.user = new User(user);
    },
    [MUTATION_TYPES.SET_FRIENDS]: (state, friends=[]) => {
        state.friends = new Friend.fromList(friends);
        state.areFriendsLoading = false;
    },

    [MUTATION_TYPES.SET_FRIENDS_LOADING]: (state, areFriendsLoading) => {
        state.areFriendsLoading = areFriendsLoading;
    },
}

const actions = {
    async fetchFriends({ commit }) {
        commit(MUTATION_TYPES.SET_FRIENDS_LOADING, true)
        try {
          const {data:friends} = await FriendService.getAll()
          commit(MUTATION_TYPES.SET_FRIENDS, friends)
          return Promise.resolve()
        } catch (error) {
          commit(MUTATION_TYPES.SET_FRIENDS_LOADING, false)
          return Promise.reject(error)
        }
      }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}