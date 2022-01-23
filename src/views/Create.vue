<template>
  <div class="createPage">
    <Modal v-if="addedModal.show" :name="addedModal.name" message="added" />
    <div class="container">
      <div class="backButton" @click="goToBack">Return to List</div>
      <div class="textAlignLeft">
        <h1 class="title">Add New Link</h1>
      </div>
      <div class="addForm">
        <div class="item">
          <div class="label">Link Name:</div>
          <input class="input" v-model="name" placeholder="e.g Alphabet" />
        </div>
        <div class="item">
          <div class="label">Link Url:</div>
          <input class="input" v-model="url" placeholder="e.g http://abc.xyz" />
        </div>
      </div>
      <div class="buttonContainer">
        <Button text="ADD" :onClick="submitForm" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/app/Button.vue';
import Modal from '@/components/app/Modal.vue';
import LinkList from '@/store/linkList.js';

export default {
  name: 'Create',
  components: {
    Button,
    Modal
  },
  data: function () {
    return {
      name: '',
      url: '',
      addedModal: {
        show: false,
        name: ''
      }
    };
  },
  methods: {
    goToBack() {
      this.$router.go(-1);
    },
    submitForm() {
      const list = new LinkList();
      list.addLink(this.name, this.url);
      this.$set(this.addedModal, 'show', true);
      this.$set(this.addedModal, 'name', this.name);
      setTimeout(() => {
        this.$set(this.addedModal, 'show', false);
      }, 3000);
    }
  }
};
</script>
