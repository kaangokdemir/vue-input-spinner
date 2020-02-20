<template>
  <div>
    <h1>Vue Input Spinner</h1>
    <VueInputSpinner
      :inputShown="true"
      v-model="testValue"
      minValue='0'
      maxValue='10'
    ></VueInputSpinner>
  </div>
</template>

<script>
export default {
  components: {
    VueInputSpinner: () => import("../src/VueInputSpinner")
  },
  data() {
    return {
      testValue: 1
    };
  }
};
</script>

<style>
</style>