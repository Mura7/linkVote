<template>
  <div class="modalComponent">
    <div class="modalWrapper">
      <div class="modalText">
        <b>{{ name }}</b> {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    name: String,
    message: String
  }
};
</script>
