const myEventGrid = document.getElementById("myEventGrid");

/* mock event (ค่าเริ่มต้น) */
const mockEvents = [
  {
    id: "m1",
    title: "Food Festival",
    image: "assets/event1.jpg",
    createdAt: 1
  },
  {
    id: "m2",
    title: "Back in Business",
    image: "assets/event2.jpg",
    createdAt: 2
  },
  {
    id: "m3",
    title: "Tech Conference",
    image: "assets/event3.jpg",
    createdAt: 3
  },
  {
    id: "m4",
    title: "Art Exhibition",
    image: "assets/event4.jpg",
    createdAt: 4
  },
  {
    id: "m5",
    title: "Music Festival",
    image: "assets/event5.png",
    createdAt: 5
  },
  {
    id: "m6",
    title: "Startup Pitch Night",
    image: "assets/event6.png",
    createdAt: 6
  },
  {
    id: "m7",
    title: "Health & Wellness Fair",
    image: "assets/event7.png",
    createdAt: 7
  },
  {
    id: "m8",
    title: "Marathon 2025",
    image: "assets/event8.png",
    createdAt: 8
  },
  {
    id: "m9",
    title: "Tree Planting Drive",
    image: "assets/event9.png",
    createdAt: 9
  },
  {
    id: "m10",
    title: "Punla NG Pag-ASA",
    image: "assets/event10.png",
    createdAt: 10
  },
  {
    id: "m11",
    title: "Hanad Barangay",
    image: "assets/event11.png",
    createdAt: 11
  },
  {
    id: "m12",
    title: "Barangay",
    image: "assets/event12.png",
    createdAt: 12
  }
];

/* event ที่ user สร้างจริง */
const savedEvents = JSON.parse(localStorage.getItem("events")) || [];

/* รวม mock + real */
const allEvents = [...mockEvents, ...savedEvents];

/* render */
allEvents.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

/* render */
myEventGrid.innerHTML = allEvents.map(e => `
  <div class="event-card">
    <img src="${e.image || 'assets/default.jpg'}">

    <div class="event-title">
      ${e.title || "ไม่มีชื่อกิจกรรม"}
    </div>

    <div class="card-actions">
      <button type="button" onclick="editEvent('${e.id}')">Edit</button>
      <button type="button" onclick="openDashboard('${e.id}')">Dashboard</button>
      <button type="button" onclick="scanQR('${e.id}')">Scan QR</button>
    </div>
  </div>
`).join("");

function editEvent(id) {
  window.location.href = `edit-event.html?id=${id}`;
}
function openDashboard(id) {
  window.location.href = `event-dashboard.html?eventId=${id}`;
}
function scanQR(id) {
  window.location.href = `scan.html?eventId=${id}`;
}