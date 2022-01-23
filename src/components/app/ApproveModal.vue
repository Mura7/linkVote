<template>
  <div class="approveModalComponent">
    <div class="container">
      <div class="headerContainer">
        <div class="headerTitle">{{ title }}</div>
        <div class="cancel" @click="cancelFunc">X</div>
      </div>
      <div class="content">
        <div class="contentBody">
          <div class="message">{{ message }}</div>
          <div class="name">{{ name }}</div>
        </div>

        <div class="buttons">
          <Button text="OK" :onClick="accept" />
          <Button text="CANCEL" :onClick="cancelFunc" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/app/Button.vue';

export default {
  name: 'ApproveModal',
  components: {
    Button
  },
  props: {
    title: String,
    name: String,
    message: String,
    acceptFunc: Function,
    cancelFunc: Function
  },
  methods: {
    accept() {
      this.acceptFunc();
      this.cancelFunc();
    }
  }
};
</script>
