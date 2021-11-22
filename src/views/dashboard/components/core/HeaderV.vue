<template>
  <header @click="redirect">
    <img
      :src="image"
      alt="logo"
    >
  </header>
</template>

<script>
  export default {
    data () {
      return {
        image: require('@/assets/CRPLogo.png'),
      }
    },
    methods: {
      redirect () {
        this.$router.replace({ name: 'Dashboard' })
      },
    },
  }
</script>

<style>
    header{
        background-color: transparent;
    }
    header img{
      width: 250px;
      margin:1rem 2rem;
    }
</style>
