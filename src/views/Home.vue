<template>
  <div>
    <Modal v-if="deleteModal.show" :name="deleteModal.name" message="removed" />
    <ApproveModal
      v-if="approveModal.show"
      :name="approveModal.item && approveModal.item.name"
      title="Remove Link"
      message="Do yo want to remove:"
      :acceptFunc="removeLink"
      :cancelFunc="approveRemoveModalToggle"
    />
    <div class="list">
      <CreateLinkButton />
    </div>
    <div class="listHr" />
    <div class="orderByContainer" v-if="list.length > 0">
      <div class="orderByButton" @click="orderBy('mostVote')">Most Voted</div>
      <div class="orderByButton" @click="orderBy('lessVote')">Less Voted</div>
    </div>

    <div class="listLink" v-if="list.length > 0">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="deleteButton" @click="approveRemoveModal(item)">x</div>
        <div class="voteContainer">
          <div class="voteNumber">{{ item.vote }}</div>
          <div class="voteLabel">POINTS</div>
        </div>
        <div class="infoContainer">
          <div class="linkName">{{ item.name }}</div>
          <div class="linkUrl">({{ item.url }})</div>
          <div class="voteButtonsContainer">
            <div class="voteButton" @click="upVote(item.id)">Up Vote</div>
            <div class="voteButton" @click="downVote(item.id)">Down Vote</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination" v-if="totalPage">
      <div
        class="pageNumber"
        :class="{ active: pageItem === page }"
        v-for="pageItem in totalPage"
        :key="pageItem"
        @click="setPage(pageItem)"
      >
        {{ pageItem }}
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateLinkButton from '@/components/list/CreateLinkButton.vue';
import Modal from '@/components/app/Modal.vue';
import ApproveModal from '@/components/app/ApproveModal.vue';
import LinkList from '@/store/linkList.js';
let linkList = new LinkList();

export default {
  name: 'Home',
  components: {
    CreateLinkButton,
    Modal,
    ApproveModal
  },
  data: function () {
    return {
      list: [],
      page: 1,
      totalPage: null,
      deleteModal: {
        show: false,
        name: ''
      },
      approveModal: {
        show: false,
        item: null
      }
    };
  },
  beforeMount: function () {
    this.getList();
  },
  watch: {
    list: function () {
      const allList = linkList.getList();
      const page = Math.ceil(allList.length / 5);
      this.totalPage = page;
    }
  },
  methods: {
    getList() {
      this.$nextTick(function () {
        const listItem = linkList.getPaginationList(this.page);
        this.list = [...listItem];
      });
    },
    upVote(index) {
      linkList.upVote(index);
      this.getList();
    },
    downVote(index) {
      linkList.downVote(index);
      this.getList();
    },
    orderBy(type) {
      linkList.setOrderBy(type);
      this.getList();
    },
    setPage(page) {
      this.page = page;
      this.getList();
    },
    approveRemoveModal(item) {
      this.approveRemoveModalToggle();
      this.$set(this.approveModal, 'item', item);
    },
    removeLink() {
      const item = this.approveModal.item;
      this.$set(this.deleteModal, 'show', true);
      this.$set(this.deleteModal, 'name', item.name);
      linkList.removeLink(item.id);
      this.getList();
      setTimeout(() => {
        this.$set(this.deleteModal, 'show', false);
      }, 3000);
    },
    approveRemoveModalToggle() {
      this.$set(this.approveModal, 'show', !this.approveModal.show);
    }
  }
};
</script>
