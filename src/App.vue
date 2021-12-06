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
     <amplify-forgot-password
      username-alias="phone_number"
     :form-fields.prop="resetPasswordFormFields"
    slot="forgot-password"
  ></amplify-forgot-password>
    <amplify-greetings
      v-if="user"
      :username="user.attributes.phone_number"
    ></amplify-greetings>
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
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
const resetPasswordFormFields = [
    {
    type: "phone_number",
    dialCode: "+91",
  },
]
const signInFormFields = [
...resetPasswordFormFields,
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
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    });
  },
  beforeDestroy() {
    this.unsubscribeAuth();
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined,
      resetPasswordFormFields,
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
<style >
:root {
  --amplify-primary-color: #4791ff;
  --amplify-primary-tint: #598eff;
  --amplify-primary-shade: #563ee0;
}
</style>

