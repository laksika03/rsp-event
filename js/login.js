document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    document.getElementById("login-error").innerText =
      "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
    return;
  }

  // login สำเร็จ
  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "index.html";
});
