<template>
  <amplify-authenticator username-alias="phone_number">
    <!-- eslint-disable -->
    <amplify-sign-up
      slot="sign-up"
      username-alias="phone_number"
      :formFields="signUpInformFields"
    ></amplify-sign-up>
    <amplify-sign-in
      slot="sign-in"
      username-alias="phone_number"
    ></amplify-sign-in>
    <!-- eslint-enable -->
    <amplify-sign-out></amplify-sign-out>
  </amplify-authenticator>
</template>

<script lang="ts">
import { FormFieldTypes } from "@aws-amplify/ui-components";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",

  data() {
    return {
      signUpInformFields: [] as FormFieldTypes,
    };
  },
  mounted() {
    setTimeout(() => {
      this.signUpInformFields = [
        {
          type: "name",
          placeholder: "Enter your name",
          required: true,
          label: "Name",
        },
        {
          type: "phone_number",
        },
        {
          type: "password",
          required: true,
        },
      ] as FormFieldTypes;
    }, 1);
  },
});
</script>
