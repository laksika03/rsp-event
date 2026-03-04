const events = [
  {
    id: 0,
    title: "Back in Business",
    image: "assets/event3.jpg",
    date: "22–25 กันยายน 2030",
    time: "09:00 – 11:00 น.",
    status: "closed", // open | almost | closed
  },
  {
    id: 1,
    title: "Food Festival",
    image: "assets/event1.jpg",
    date: "15–20 พฤษภาคม 2030",
    time: "12:00 – 15:00 น."
  },
  {
    id: 2,
    title: "Music Festival",
    image: "assets/event2.jpg",
    date: "21 มิถุนายน 2030",
    time: "13:00 – 15:00 น."
  },
  {
    id: 3,
    title: "Business Talk",
    image: "assets/event4.jpg",
    date: "25–26 พฤศจิกายน 2030",
    time: "10:00 – 11:00 น."
  }
];

// ตัวแปรสำหรับเก็บข้อมูล events ทั้งหมด
let allEventsData = events;
let filteredEventsData = events;

const eventsContainer = document.getElementById("events");

// ฟังก์ชันแสดง Events
function displayEvents(eventsList) {
  eventsContainer.innerHTML = ''; // ล้างก่อน
  
  if (eventsList.length === 0) {
    eventsContainer.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: white;">
        <p style="font-size: 18px; margin-bottom: 8px;">ไม่พบกิจกรรมที่ค้นหา</p>
        <p style="font-size: 14px; opacity: 0.8;">ลองใช้คำค้นหาอื่น</p>
      </div>
    `;
    return;
  }
  
  eventsList.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <img src="${event.image}" alt="event">
      <div class="info">
        <p>${event.title}</p>
        <span>${event.date} | ${event.time}</span>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.href = `detail.html?id=${event.id}`;
    });

    eventsContainer.appendChild(card);
  });
}

// แสดง events ครั้งแรก
displayEvents(events);

/* =========================
   ฟังก์ชันค้นหา Events
========================= */

function searchEvents(query) {
  const searchTerm = query.toLowerCase().trim();
  const searchInfo = document.getElementById('search-info');
  const clearBtn = document.getElementById('clear-search');
  
  if (searchTerm === '') {
    // ไม่มีการค้นหา - แสดงทั้งหมด
    filteredEventsData = allEventsData;
    if (searchInfo) searchInfo.classList.remove('show');
  } else {
    // ค้นหาจากชื่อกิจกรรม, วันที่, และเวลา
    filteredEventsData = allEventsData.filter(event => {
      const titleMatch = event.title ? event.title.toLowerCase().includes(searchTerm) : false;
      const dateMatch = event.date ? event.date.toLowerCase().includes(searchTerm) : false;
      const timeMatch = event.time ? event.time.toLowerCase().includes(searchTerm) : false;
      return titleMatch || dateMatch || timeMatch;
    });
    
    // แสดงผลการค้นหา
    if (searchInfo) {
      searchInfo.textContent = `พบ ${filteredEventsData.length} กิจกรรมจาก "${query}"`;
      searchInfo.classList.add('show');
    }
  }
  
  // อัพเดตการแสดงผล
  displayEvents(filteredEventsData);
  
  // แสดง/ซ่อนปุ่มลบ
  if (clearBtn) {
    clearBtn.style.display = query ? 'flex' : 'none';
  }
}

/* =========================
   Event Listeners สำหรับการค้นหา
========================= */

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('event-search-input');
  const clearBtn = document.getElementById('clear-search');
  
  if (searchInput) {
    // ค้นหาแบบ real-time
    searchInput.addEventListener('input', (e) => {
      searchEvents(e.target.value);
    });
    
    // กด Enter เพื่อค้นหา
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchEvents(e.target.value);
      }
    });
  }
  
  if (clearBtn) {
    // ปุ่มลบข้อความ
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchEvents('');
      searchInput.focus();
    });
  }
});
