<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute(); // sử dụng hook useRoute để lấy thông tin về route hiện tại, ví dụ: lấy các parameter từ URL
const router = useRouter(); // sử dụng hook useRouter để thực hiện các hành động như chuyển hướng (push) hoặc quay lại (back)

const editingStudent = ref({}); // khởi tạo một biến reactive để lưu thông tin sinh viên đang chỉnh sửa, mặc định là một object rỗng
const errors = ref({}); // để lưu trữ các lỗi cho từng trường

const fetchStudent = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/students/${route.params.id}`);
    editingStudent.value = response.data
  } catch (err) {
    alert ("lỗi " + err.message);
  }
}
// Hàm kiểm tra tính hợp lệ của các trường trong form
const validateForm = () => {
  errors.value = {}; // reset các lỗi cũ
  let isValid = true;

  // Kiểm tra họ tên là chuỗi ký tự hợp lệ
  // const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/; // regex để kiểm tra chuỗi chỉ chứa chữ cái và khoảng trắng
  // if (!editingStudent.value.name || !nameRegex.test(editingStudent.value.name.trim())) {
  //   errors.value.name = "Họ tên phải là chuỗi ký tự (chỉ bao gồm chữ cái và khoảng trắng)";
  //   isValid = false;
  // }

  // Kiểm tra họ tên không được để trống
  if (!editingStudent.value.name) {
    errors.value.name = "Họ tên không được để trống";
    isValid = false;
  }

  // Kiểm tra tuổi là số nguyên và trong khoảng hợp lý
  if (
    !editingStudent.value.age ||
    !Number.isInteger(Number(editingStudent.value.age)) || // Kiểm tra là số nguyên
    editingStudent.value.age < 1 ||
    editingStudent.value.age > 100
  ) {
    errors.value.age = "Tuổi phải là số nguyên từ 1 đến 100";
    isValid = false;
  }
  // Kiểm tra email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (
    !editingStudent.value.email ||
    !emailRegex.test(editingStudent.value.email)
  ) {
    errors.value.email = "Email không hợp lệ";
    isValid = false;
  }

  // Kiểm tra hình ảnh (có thể tùy chỉnh nếu cần)
  const imageUrlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg))$/i;
  if (
    !editingStudent.value.image ||
    !imageUrlRegex.test(editingStudent.value.image)
  ) {
    errors.value.image =
      "Hình ảnh phải là một URL hợp lệ (với định dạng png, jpg, jpeg, gif, bmp, svg)";
    isValid = false;
  }
  return isValid;
};

const updateStudent = async() => {
  if(validateForm()){
    try {
      await axios.put(`http://localhost:3000/students/${route.params.id}`,editingStudent.value);
      alert ("Cập nhật sinh viên thành công");
      router.push("/")
    } catch (err) {
      alert ("Cập nhật thất bại: " + err.message);
    }
  };
}



onMounted(fetchStudent);
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center mb-4 text-primary">Sửa sinh viên</h1>
        <form @submit.prevent="updateStudent" class="card shadow p-4">
          <div class="form-group mb-3">
            <label for="name">Họ tên</label>
            <input type="text" id="name" v-model="editingStudent.name" class="form-control" placeholder="Nhập họ tên"/>
            <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
          </div>

          <div class="form-group mb-3">
            <label for="name">Tuổi</label>
            <input type="number" id="age" v-model="editingStudent.age" class="form-control" placeholder="Nhập tuổi"/>
            <span v-if="errors.age" class="text-danger">{{ errors.age }}</span>
          </div>

          <div class="form-group mb-3">
            <label for="name">Email</label>
            <input type="email" id="email" v-model="editingStudent.email" class="form-control" placeholder="Nhập email"/>
            <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
          </div>

          <div class="form-group mb-3">
            <label for="name">Hình ảnh</label>
            <input type="text" id="image" v-model="editingStudent.image" class="form-control" placeholder="Nhập hình ảnh"/>
            <span v-if="errors.image" class="text-danger">{{ errors.image }}</span>
          </div>

          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary">Cập nhật</button>
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
