const topbarMenu = document.getElementById("topbar-menu");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (topbarMenu) {

  if (currentUser) {
    topbarMenu.innerHTML = `
      <div class="topbar-right">

        <div class="top-actions">
          <a href="index.html" class="nav-link" data-page="index.html">Home</a>
          <a href="my-event.html" class="nav-link" data-page="my-event.html">My Event</a>
        </div>

        <!-- ต้องเป็นก้อนเดียวแบบนี้เท่านั้น -->
        <div class="user-menu">
          <span class="user-name">👤 ${currentUser.username}</span>
          <button class="logout-btn" id="logoutBtn">Log Out</button>
        </div>

      </div>
    `;

    document.getElementById("logoutBtn")?.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    });

  } else {
    topbarMenu.innerHTML = `
      <a href="login.html" class="login">Log In</a>
    `;
  }

}

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-link").forEach(link => {
  if (link.dataset.page === currentPage) {
    link.classList.add("active");
  }
});

