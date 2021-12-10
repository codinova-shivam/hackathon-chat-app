<template>
  <div>
    <amplify-greetings :username="user.name"></amplify-greetings>
    <chat-window
      :current-user-id="user.id"
      :loading-rooms="areFriendsLoading"
      :rooms="friends"
      :rooms-loaded="!!friends.length"
      @add-room="handleAddFriendButtonClick"
    />
    <add-friend-modal
      v-show="showAddFriendModal"
      @close="handleAddFriendClose"
      @save="handleAddFriend"
    />
  </div>
</template>

<script>
import ChatWindow from "vue-advanced-chat";
import "vue-advanced-chat/dist/vue-advanced-chat.css";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("user");
import { CognitoAuth } from "../models";
import AddFriendModal from "./AddFriendModal.vue";
export default {
  name: "Layout",
  data() {
    return {
      showAddFriendModal: false,
    };
  },
  components: {
    ChatWindow,
    AddFriendModal,
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
    ...mapActions(["fetchFriends", "addFriends"]),
    handleAddFriendButtonClick() {
      this.showAddFriendModal = true;
    },
    handleAddFriendClose() {
      this.showAddFriendModal = false;
    },
    async handleAddFriend(mobile) {
      this.showAddFriendModal = false;

      await this.addFriends(mobile);
    },
  },
};
</script>

<style scoped>
</style>
