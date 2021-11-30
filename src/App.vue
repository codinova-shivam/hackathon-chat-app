<template>
  <amplify-authenticator username-alias="phone_number">
    <amplify-sign-up
      slot="sign-up"
      username-alias="phone_number"
      :form-fields.prop="signUpformFields"
    ></amplify-sign-up>
    <amplify-sign-in
      slot="sign-in"
      :form-fields.prop="signInFormFields"
      username-alias="phone_number"
    >
      <div slot="federated-buttons"></div>
    </amplify-sign-in>
    <amplify-sign-out></amplify-sign-out>
    <chat-window
      :current-user-id="currentUserId"
      :rooms="rooms"
      :messages="messages"
    />
  </amplify-authenticator>
</template>

<script>
import ChatWindow from "vue-advanced-chat";
import "vue-advanced-chat/dist/vue-advanced-chat.css";
const signInFormFields = [
  {
    type: "phone_number",
    dialCode: 91,
  },
  {
    type: "password",
    required: true,
  },
];
export default {
  name: "App",
  components: {
    ChatWindow,
  },
  data() {
    return {
      rooms: [
        {
          roomId: 1,
          roomName: "Room 1",
          avatar: "assets/imgs/people.png",
          unreadCount: 1,
          index: 3,
          lastMessage: {
            content: "Last message received",
            senderId: 1234,
            username: "John Doe",
            timestamp: "10:20",
            saved: true,
            distributed: false,
            seen: true,
            new: false,
          },
          users: [
            {
              _id: 1234,
              username: "John Doe",
              avatar: "assets/imgs/doe.png",
              status: {
                state: "online",
                lastChanged: "today, 14:30",
              },
            },
          ],
        },
      ],
      messages: [],
      currentUserId: 1234,
      signInFormFields,
      signUpformFields: [
        {
          type: "name",
          placeholder: "Enter your name",
          required: true,
          label: "Name",
        },
        ...signInFormFields,
      ],
    };
  },
};
</script>

