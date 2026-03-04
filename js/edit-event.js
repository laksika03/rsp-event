/* ===============================
   EDIT EVENT
=============================== */

/* element */
const posterInput = document.getElementById("posterInput");
const posterPreview = document.getElementById("posterPreview");
const uploadBox = document.getElementById("uploadBox");
const updateBtn = document.getElementById("updateEventBtn");

/* ===============================
   get event id from url
=============================== */
const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

/* ===============================
   load event data
=============================== */
const events = JSON.parse(localStorage.getItem("events")) || [];
const event = events.find(e => e.id == eventId);

if (!event) {
  alert("ไม่พบข้อมูลกิจกรรม");
  window.location.href = "my-event.html";
}

/* ===============================
   fill form with existing data
=============================== */
document.getElementById("eventTitle").value = event.title || "";
document.getElementById("eventDesc").value = event.description || "";
document.getElementById("eventRoom").value = event.room || "";
document.getElementById("startDate").value = event.start || "";
document.getElementById("endDate").value = event.end || "";
document.getElementById("speaker1").value = event.speaker1 || "";
document.getElementById("speaker2").value = event.speaker2 || "";
document.getElementById("capacity").value = event.capacity || "";

/* ===============================
   poster preview (existing)
=============================== */
let posterBase64 = event.image || "";

if (posterBase64) {
  posterPreview.src = posterBase64;
  posterPreview.style.display = "block";
  uploadBox.classList.add("has-image");
}

/* ===============================
   upload box click
=============================== */
uploadBox.addEventListener("click", () => {
  posterInput.click();
});

/* ===============================
   upload & preview new poster
=============================== */
posterInput.addEventListener("change", () => {
  const file = posterInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    posterBase64 = reader.result;
    posterPreview.src = reader.result;
    posterPreview.style.display = "block";
    uploadBox.classList.add("has-image");
  };
  reader.readAsDataURL(file);
});

/* ===============================
   update event
=============================== */
updateBtn.addEventListener("click", () => {

  if (
    !document.getElementById("eventTitle").value ||
    !document.getElementById("startDate").value ||
    !document.getElementById("endDate").value
  ) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  /* update event object */
  event.title = document.getElementById("eventTitle").value;
  event.description = document.getElementById("eventDesc").value;
  event.room = document.getElementById("eventRoom").value;
  event.start = document.getElementById("startDate").value;
  event.end = document.getElementById("endDate").value;
  event.speaker1 = document.getElementById("speaker1").value;
  event.speaker2 = document.getElementById("speaker2").value;
  event.capacity = document.getElementById("capacity").value;
  event.image = posterBase64 || "assets/default.jpg";

  /* save back to localStorage */
  localStorage.setItem("events", JSON.stringify(events));

  /* redirect */
  window.location.href = "my-event.html";
});

const manageBtn = document.getElementById("manageAttendeeBtn");

manageBtn.href = `manage-attendent.html?eventId=${event.id}`;
