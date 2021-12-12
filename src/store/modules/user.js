import { FriendService } from "../../api";
import { Friend, Message, User } from "../../models";
import { MUTATION_TYPES as BASE_MUTATION_TYPES } from "../mutations";

const MUTATION_TYPES = BASE_MUTATION_TYPES.USER
const state = {
  user: null,
  friends: [],
  areFriendsLoading: false,
  messages: [],
  areMessagesLoaded: false
};

const mutations = {
  [MUTATION_TYPES.SET_USER]: (state, user) => {
    state.user = new User(user);
  },
  [MUTATION_TYPES.SET_FRIENDS]: (state, friends = []) => {
    state.friends = new Friend.fromList(friends);
    state.areFriendsLoading = false;
  },
  [MUTATION_TYPES.SET_MESSAGES]: (state, messages) => {
    state.messages =Array.isArray(messages)?Message.fromList(messages):[
      ...state.messages,
      new Message(messages)
    ];
    state.areMessagesLoaded = true;
  },
  [MUTATION_TYPES.SET_MESSAGES_LOADED]: (state, areMessagesLoaded) => {
    state.areMessagesLoaded = areMessagesLoaded;
  },

  [MUTATION_TYPES.ADD_FRIEND]: (state, friend) => {
    state.friends = [...state.friends, new Friend(friend)];
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
      const { data: friends } = await FriendService.getAll()
      commit(MUTATION_TYPES.SET_FRIENDS, friends)
      return Promise.resolve()
    } catch (error) {
      commit(MUTATION_TYPES.SET_FRIENDS_LOADING, false)
      return Promise.reject(error)
    }
  },
  async addFriends({ commit }, mobile) {
    commit(MUTATION_TYPES.SET_FRIENDS_LOADING, true)
    try {
      const { data: friend } = await FriendService.add(mobile)
      commit(MUTATION_TYPES.ADD_FRIEND, friend)
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