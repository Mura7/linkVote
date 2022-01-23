<template>
  <div class="button" @click="onClick">
    <div class="buttonText">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: String,
    onClick: Function
  }
};
</script>
