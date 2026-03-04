const posterInput = document.getElementById("posterInput");
const uploadBox = document.getElementById("uploadBox");
const saveBtn = document.getElementById("saveEventBtn");

let posterBase64 = "";

uploadBox.addEventListener("click", () => {
  posterInput.click();
});

/* อัปโหลด + preview รูป */
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

/* save event */
saveBtn.addEventListener("click", () => {
  const event = {
    id: Date.now(),
    title: document.getElementById("eventTitle").value,
    description: document.getElementById("eventDesc").value,
    room: document.getElementById("eventRoom").value,
    start: document.getElementById("startDate").value,
    end: document.getElementById("endDate").value,
    speaker1: document.getElementById("speaker1").value,
    speaker2: document.getElementById("speaker2").value,
    capacity: document.getElementById("capacity").value,
    image: posterBase64 || "assets/default.jpg"
  };

  if (!event.title || !event.start || !event.end) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  const events = JSON.parse(localStorage.getItem("events")) || [];
  events.push(event);
  localStorage.setItem("events", JSON.stringify(events));

  window.location.href = "my-event.html";
});
 