<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">ADD FRIEND</header>
        <form @submit="save">
          <section class="modal-body">
            <amplify-phone-field
              :required="true"
              dial-code="+91"
              :value="mobileNo"
              @input="handleMobileInput"
            >
            </amplify-phone-field>
          </section>
          <amplify-loader />
          <footer class="modal-footer">
            <amplify-button @click="close" class="close">
              Cancel
            </amplify-button>
            <amplify-button type="submit"> Save </amplify-button>
          </footer>
        </form>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "AddFriendModal",
  data() {
    return {
      mobileNo: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save(event) {
      event.preventDefault();
      this.$emit("save", `+91${this.mobileNo}`);
    },
    handleMobileInput(event) {
      this.mobileNo = event.target.value;
    },
  },
};
</script>
<style>
.modal-backdrop {
  z-index: 10;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  color: var(--amplify-primary-color);
  justify-content: space-between;
}

.modal-footer {
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.close button {
  background: transparent;
  color: var(--amplify-primary-color);
  border: 1px solid var(--amplify-primary-color);
  padding: 15px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>