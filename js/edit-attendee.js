const params = new URLSearchParams(window.location.search);
const index = params.get("index");

/* ใช้ attendees เป็น array ตรง ๆ */
const attendees = JSON.parse(localStorage.getItem("attendees")) || [];
const attendee = attendees[index];

if (!attendee) {
  alert("ไม่พบข้อมูล");
  history.back();
}

/* แยกชื่อจาก name (เพราะตอน upload ใช้ name รวม) */
const [firstName = "", lastName = ""] = (attendee.name || "").split(" ");

/* fill form */
document.getElementById("firstName").value = firstName;
document.getElementById("lastName").value = lastName;
document.getElementById("position").value = attendee.position || "";
document.getElementById("organization").value = attendee.organization || "";
document.getElementById("email").value = attendee.email || "";
document.getElementById("phone").value = attendee.phone || "";

/* save */
document.getElementById("saveBtn").onclick = () => {
  attendee.name =
    `${document.getElementById("firstName").value} ${document.getElementById("lastName").value}`.trim();

  attendee.position = document.getElementById("position").value;
  attendee.organization = document.getElementById("organization").value;
  attendee.email = document.getElementById("email").value;
  attendee.phone = document.getElementById("phone").value;

  attendees[index] = attendee;
  localStorage.setItem("attendees", JSON.stringify(attendees));

  history.back();
};
