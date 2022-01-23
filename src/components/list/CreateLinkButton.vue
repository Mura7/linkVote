<template>
  <div class="createLinkButton">
    <div @click="goToCreatePage" class="buttonContainer">
      <div class="iconContainer">
        <div class="icon">+</div>
      </div>
      <div class="textContainer">
        <h1>SUBMIT A LINK</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateLinkButton',
  props: {
    msg: String
  },
  methods: {
    goToCreatePage() {
      this.$router.push('/create');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
