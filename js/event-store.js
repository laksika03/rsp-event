/* ===============================
   EVENT STORE
=============================== */

/* ===== MOCK DATA ===== */
const mockEvents = [
  {
    id: "m12",
    title: "กิจกรรมตัวอย่าง",
    description: "ใช้สำหรับทดสอบระบบ",
    room: "ห้องประชุม A",
    start: "2025-12-20T09:00",
    end: "2025-12-20T12:00",
    speaker1: "Mock Speaker",
    speaker2: "",
    capacity: 100,
    image: "assets/default.jpg",
    isMock: true
  }
];

/* ===== LOCAL STORAGE ===== */
function getLocalEvents() {
  return JSON.parse(localStorage.getItem("events")) || [];
}

function saveLocalEvents(events) {
  localStorage.setItem("events", JSON.stringify(events));
}

/* ===== PUBLIC API ===== */
function getAllEvents() {
  return [...mockEvents, ...getLocalEvents()];
}

function getEventById(id) {
  return getAllEvents().find(e => e.id == id);
}

function addEvent(event) {
  const localEvents = getLocalEvents();
  localEvents.push(event);
  saveLocalEvents(localEvents);
}

function updateEvent(updatedEvent) {
  const localEvents = getLocalEvents();
  const index = localEvents.findIndex(e => e.id == updatedEvent.id);

  if (index === -1) return false;

  localEvents[index] = updatedEvent;
  saveLocalEvents(localEvents);
  return true;
}
