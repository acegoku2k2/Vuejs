<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// khai báo các state
const students = ref([]); //reactive array chứa danh sách sinh viên
const loading = ref(true); // reactive boolean để theo dõi trạng thái tải dữ liệu
const error = ref(null); // reactive string để lưu lỗi khi gọi API

// Hàm fetchStudents để lấy danh sách sinh viên từ API
const fetchStudents = async () => {
  try {
    // Gọi API để lấy danh sách sinh viên từ API
    const response = await axios.get("http://localhost:3000/students");
    students.value = response.data; // lưu dữ liệu sinh viên vào state `students`
  } catch (err) {
    // lưu lỗi nếu có trong quá trình gọi API
    error.value = "Lỗi khi tải dữ liệu: " + err.message;
  } finally {
    loading.value = false;
  }
};
// Gọi fetchStudents khi component được mount
onMounted(fetchStudents);
// Hàm xác nhận xóa sinh viên
const confirmDelete = async (id) => {
  // Hiển thị hộp thoại xác nhận trc khi xóa
  if(window.confirm("Bạn có chắc chắn muốn xóa sinh viên này không?")){
    // Nếu ng dùng bấm "OK", gọi hàm xóa
    await deleteStudent(id);
  };
}

const deleteStudent = async (id) => {
  try {
    // Gửi yêu cầu DELETE tới API để xóa sinh viên có id tương ứng
    await axios.delete(`http://localhost:3000/students/${id}`);
    // Cập nhật danh sách sinh viên sau khi xóa
    students.value = students.value.filter((students) => students.id != id);
    alert("Xóa sinh viên thành công!"); //Hiển thị thông báo thành công
  } catch (err) {
    // Hiển thị lỗi nếu xóa thất bại
    alert("Lỗi khi xóa sinh viên: " + err.message);
  }
};
</script>

<template>
  <div class="card card-header">
    <h1 class="text-center text-success">Danh sách sinh viên</h1>
    <!-- Hiên thị khi đang tải dữ liệu  -->
    <p v-if="loading">Đang tải dữ liệu....</p> <!-- hiển thị nếu trạng thái loading là true  -->
    <!-- Hiên thị khi gặp lỗi  -->
    <p v-if="error">{{ error }}</p> <!-- hiển thị nếu biến error không phải là null  -->
    <!-- Hiển thị danh sách sinh viên  -->
    <p v-if="!loading && !error"> <!-- chỉ hiển thị danh sách khi không còn tải dữ liệu và không có lỗi  -->
      <!-- Liên kết tới trang thêm sinh viên  -->
      <router-link to="/add" class="btn btn-success">Thêm sinh viên</router-link>
      <!-- Bảng danh sách người dùng  -->
      <table class="table table-hover table-striped table-bordered bg-danger">
        <thead class="text-center text-opacity-50">
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Image</th>
          <th>Action</th> <!-- Cột thao tác chứa các nút Sửa/Xóa  -->
        </thead>
        <tbody v-for="(students, index) in students" :key="index"> <!-- lặp qua từng sinh viên trong danh sách `students`  -->
          <tr>
            <td>{{ students.id }}</td>
            <td>{{ students.name }}</td>
            <td>{{ students.age }}</td>
            <td>{{ students.email }}</td>
            <td><img :src=" students.image" width="50px" ></td>
            <td>
              <!-- Liên kết tới trang chi tiết sinh viên với id tương ứng -->
               <router-link :to="`/detail/${students.id}`" class="btn btn-warning">Chi tiết</router-link>

              <!-- Liên kết tới trang sửa sinh viên với id tương ứng -->
               <router-link :to="`/edit/${students.id}`" class="btn btn-primary">Sửa</router-link>

              <!-- Nút xóa với sự kiện click gọi hàm confirmDelete -->
                <button @click="confirmDelete(students.id)" class="btn btn-danger">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </p>
  </div>
</template>
<style>
  .btn-success{
    margin-bottom: 20px;
  }
  .btn-primary{
    margin-right: 10px;
  }
  .btn-warning{
    margin-right: 10px;
  }
</style>
