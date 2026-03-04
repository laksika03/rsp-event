document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm-password").value;

  if (password !== confirm) {
    alert("รหัสผ่านไม่ตรงกัน");
    return;
  }

  const user = {
    firstname: document.getElementById("fname").value,
    lastname: document.getElementById("lname").value,
    username: document.getElementById("username").value,
    password: password
  };

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.find(u => u.username === user.username);
  if (exists) {
    alert("ชื่อผู้ใช้นี้มีอยู่แล้ว");
    return;
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert("สร้างบัญชีสำเร็จ");
  window.location.href = "login.html";
});
