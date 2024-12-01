<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";

const router = useRouter(); // sử dụng hook useRouter để quản lý điều hướng, ví dụ như chuyển hướng ng dùng sau khi thêm thành công.
const errors = ref({}); // để lưu trữ các lỗi cho từng trường
const newStudent = ref({name: "", age: "", email: "", image: ""}); // khởi tạo một biến reactive để lưu thông tin ng dùng mới, mặc định với các trường rỗng.

const validateForm = () => {
  errors.value = {}; // reset các lỗi cũ
  let isValid = true;

  // Kiểm tra họ tên là chuỗi ký tự hợp lệ
  // const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/; // regex để kiểm tra chuỗi chỉ chứa chữ cái và khoảng trắng
  // if (!newStudent.value.name || !nameRegex.test(newStudent.value.name.trim())) {
  //   errors.value.name = "Họ tên phải là chuỗi ký tự (chỉ bao gồm chữ cái và khoảng trắng)";
  //   isValid = false;
  // }

  // Kiểm tra họ tên không được để trống
  if (!newStudent.value.name) {
    errors.value.name = "Họ tên không được để trống";
    isValid = false;
  }

  // Kiểm tra tuổi là số nguyên và trong khoảng hợp lý
  if (
    !newStudent.value.age ||
    !Number.isInteger(Number(newStudent.value.age)) || // Kiểm tra là số nguyên
    newStudent.value.age < 1 ||
    newStudent.value.age > 100
  ) {
    errors.value.age = "Tuổi phải là số nguyên từ 1 đến 100";
    isValid = false;
  }
  // Kiểm tra email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (
    !newStudent.value.email ||
    !emailRegex.test(newStudent.value.email)
  ) {
    errors.value.email = "Email không hợp lệ";
    isValid = false;
  }

  // Kiểm tra hình ảnh (có thể tùy chỉnh nếu cần)
  const imageUrlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg))$/i;
  if (
    !newStudent.value.image ||
    !imageUrlRegex.test(newStudent.value.image)
  ) {
    errors.value.image =
      "Hình ảnh phải là một URL hợp lệ (với định dạng png, jpg, jpeg, gif, bmp, svg)";
    isValid = false;
  }
  return isValid;
};

const addStudent = async () => {
  if (validateForm()) {
    try {
      // gửi yêu cầu POST đến API để thêm một sinh viên với dữ liệu trong newStudent
      await axios.post("http://localhost:3000/students", newStudent.value);
      alert("Thêm sinh viên thành công!"); // hiển thị thông báo khi thêm thành công
      router.push("/"); // sau khi thêm thành công, chuyển hướng ng dùng về trang danh sách sinh viên
    } catch (err) {
      // xử lý lỗi nếu quá trình thêm thất bại, ví dụ như dữ liệu không hợp lệ hoặc server gặp sự cố
      alert("Lối khi thêm sinh viên: " + err.message);
    }
  }
};

</script>
<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col md-6">
        <h1 class="text-center mb-4 text-primary">Thêm mới sinh viên</h1>
        <form @submit.prevent="addStudent" class="card shadow p-4">
          <div class="form-group mb-3">
            <label for="name">Họ tên</label>
            <input type="text" id="name" v-model="newStudent.name" class="form-control" placeholder="Nhập họ tên" >
            <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
          </div>
          <div class="form-group mb-3">
            <label for="name">Tuổi</label>
            <input type="number" id="age" v-model="newStudent.age" class="form-control" placeholder="Nhập tuổi" >
            <span v-if="errors.age" class="text-danger">{{ errors.age }}</span>
          </div>
          <div class="form-group mb-3">
            <label for="name">Email</label>
            <input type="email" id="email" v-model="newStudent.email" class="form-control" placeholder="Nhập email" >
            <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
          </div>
          <div class="form-group mb-3">
            <label for="name">Hình ảnh</label>
            <input type="text" id="image" v-model="newStudent.image" class="form-control" placeholder="Nhập hình ảnh" >
            <span v-if="errors.image" class="text-danger">{{ errors.image }}</span>
          </div>
          <div class="d-fex justify-content-between">
            <button type="submit" class="btn btn-success">Thêm mới</button>
            <router-link to="/" class="btn btn-secondary">Danh sách sinh viên</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-danger {
  font-size: 0.875rem;
}
</style>
