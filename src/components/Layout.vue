<template>
  <div>
    <amplify-greetings :username="user.name"></amplify-greetings>
    <chat-window
      :current-user-id="user.id"
      :loading-rooms="areFriendsLoading"
      :rooms="friends"
      :rooms-loaded="!!friends.length"
      @add-room="handleAddFriendButtonClick"
      @fetch-messages="fetchMessages"
      :messages="messages"
      :messages-loaded="areMessagesLoaded"
      @send-message="sendMessage"
      :show-files="false"
      :show-audio="false"
      :show-reaction-emojis="false"
      :message-actions="[]"
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
const { mapState, mapActions, mapMutations } = createNamespacedHelpers("user");
import { CognitoAuth } from "../models";
import AddFriendModal from "./AddFriendModal.vue";
import { MUTATION_TYPES } from "../store/mutations";
export default {
  name: "Layout",
  data() {
    return {
      showAddFriendModal: false,
      connection: null,
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
      messages: (state) => state.messages,
      areMessagesLoaded: (state) => state.areMessagesLoaded,
    }),
  },
  destroyed(){
    this.connection.close()
  },
  async created() {
    await CognitoAuth.refreshToken();
    this.connection = new WebSocket(
      `wss://kmeod0w4za.execute-api.us-east-2.amazonaws.com/dev?Auth=${CognitoAuth.acessToken}`
    );
    this.connection.clo = (event) => {
      const messages = JSON.parse(event.data);
      this.setMessages(messages);
    };

    this.connection.onopen = function () {
      console.log("Successfully connected to the echo websocket server...");
    };
    await this.fetchFriends();
  },
  methods: {
    ...mapActions(["fetchFriends", "addFriends"]),
    ...mapMutations({
      setMessages: MUTATION_TYPES.USER.SET_MESSAGES,
      setMessagesLoaded: MUTATION_TYPES.USER.SET_MESSAGES_LOADED,
    }),
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

    fetchMessages({ room }) {
      this.setMessagesLoaded(false);
      this.connection?.send(
        JSON.stringify({ action: "getMessages", friendId: room.roomId })
      );
    },
    sendMessage({ roomId, content }) {
      this.connection?.send(
        JSON.stringify({
          action: "sendMessage",
          friendId: roomId,
          message: content,
        })
      );
    },
  },
};
</script>

<style scoped>
</style>
