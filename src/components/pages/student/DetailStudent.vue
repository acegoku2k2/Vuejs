<script setup>
import {ref, onMounted} from "vue";
import {useRoute} from 'vue-router';
import axios from "axios";

const route = useRoute();

const detailStudent = ref({});

const fetchStudent = async () => {
  try {
    // gửi yêu cầu GET đến API để lấy thông tin sinh viên theo id từ route parameters
    const response = await axios.get(`http://localhost:3000/students/${route.params.id}`);
    detailStudent.value = response.data;

  } catch (err) {
    // xử lý lỗi nếu không thể lấy dữ liệu từ API, ví dụ như kết nối thất bại hoặc không tìm thấy sinh viên
    alert("Lỗi khi tải dữ liệu sinh viên: " + err.message);
  }
};

onMounted(fetchStudent);
</script>
<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center mb-4 text-primary">Thông tin chi tiết sinh viên</h1>
        <form @submit.prevent="updateStudent" class="card shadow p-4">
          <div class="form-group mb-3">
            <label for="name">Họ tên</label>
            <input type="text" id="name" v-model="detailStudent.name" class="form-control">
          </div>
          <div class="form-group mb-3">
            <label for="name">Tuổi</label>
            <input type="number" id="age" v-model="detailStudent.age" class="form-control">
          </div>
          <div class="form-group mb-3">
            <label for="name">Email</label>
            <input type="email" id="email" v-model="detailStudent.email" class="form-control">
          </div>
          <div class="form-group mb-3">
            <label for="name">Hình ảnh</label>
            <input type="text" id="image" v-model="detailStudent.image" class="form-control">
          </div>
          <div class="d-flex justify-content-center">
            <router-link to="/" class="btn btn-success">Danh sách sinh viên</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script scope=""></script>
