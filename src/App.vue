<script setup>
import StudentHeader from "./components/blocks/StudentHeader.vue";
import StudentFooter from "./components/blocks/StudentFooter.vue";
</script>

<template>
  <!-- Header  -->
  <StudentHeader/>
  <div class="container">

      <main class="col-12">
          <router-view></router-view>
      </main>
  </div>
  <StudentFooter />
</template>

<script scope="">
</script>
