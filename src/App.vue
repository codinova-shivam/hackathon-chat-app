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
    <div v-if="user">
      <layout />
    </div>
  </amplify-authenticator>
</template>

<script>
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
const resetPasswordFormFields = [
  {
    type: "phone_number",
    dialCode: "+91",
  },
];
const signInFormFields = [
  ...resetPasswordFormFields,
  {
    type: "password",
    required: true,
  },
];
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("user");
import { MUTATION_TYPES } from "./store/mutations";
import Layout from "./components/Layout.vue";
export default {
  name: "App",
  components: {
    Layout,
  },
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((_, authData) => {
      if (authData?.attributes) {
        this.setUser(authData.attributes);
      }
    });
  },
  beforeDestroy() {
    this.unsubscribeAuth();
  },
  data() {
    return {
      unsubscribeAuth: undefined,
      resetPasswordFormFields,
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
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapMutations({
      setUser: MUTATION_TYPES.USER.SET_USER,
    }),
  },
};
</script>
<style >
:root {
  --amplify-primary-color: #4791ff;
  --amplify-primary-tint: #598eff;
  --amplify-primary-shade: #563ee0;
}
.vac-room-header{
  z-index: 0;
}
.vac-room-footer{
  z-index: 0;
}
</style>

