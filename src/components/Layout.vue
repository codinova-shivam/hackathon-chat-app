<template>
  <div>
    <amplify-greetings :username="user.name"></amplify-greetings>
    <chat-window
      :current-user-id="user.id"
      :loading-rooms="areFriendsLoading"
      :rooms="friends"
      :rooms-loaded="!!friends.length"
      @add-room="handleFriendAdd"
    />
  </div>
</template>

<script>
import ChatWindow from "vue-advanced-chat";
import "vue-advanced-chat/dist/vue-advanced-chat.css";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("user");
import { CognitoAuth } from "../models";
export default {
  name: "Layout",
  components: {
    ChatWindow,
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
      areFriendsLoading: (state) => state.areFriendsLoading,
      friends: (state) => state.friends,
    }),
  },
  async created() {
    await CognitoAuth.refreshToken();
    await this.fetchFriends();
  },
  methods: {
    ...mapActions(["fetchFriends"]),
    handleFriendAdd(event){
      console.log(event)
    }
  },
};
</script>

<style scoped>
</style>
