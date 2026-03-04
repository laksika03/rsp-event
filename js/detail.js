const events = [
  {
    id: 0,
    title: "Back in Business",
    image: "assets/event3.jpg",
    date: "22–25 กันยายน 2030",
    time: "09:00 – 11:00 น.",
    speaker: "วิทยากร: คุณสุขใจ สบายดี",
    description: `
      🔔 แนวคิดของงาน (Event Concept)
      
      งานอีเว้นท์แนว Creative / Networking / Experience-based
      ที่เน้นการเชื่อมโยงผู้เข้าร่วมกับแบรนด์ผ่านกิจกรรม
      ที่มีส่วนร่วม สนุก และสร้างแรงบันดาลใจ

      🌟 เปิดพื้นที่ให้ผู้เข้าร่วม
      แลกเปลี่ยนไอเดีย สร้างเครือข่าย
      และสร้างประสบการณ์ที่น่าจดจำ
    `,
    target: [
      "📍 ผู้ประกอบการรุ่นใหม่",
      "📍 นักศึกษาและบุคคลทั่วไปที่สนใจธุรกิจ",
      "📍 ผู้ที่ต้องการแรงบันดาลใจในการทำงาน"
    ],
    benefits: [
      "✨ แนวคิดสร้างสรรค์ในการพัฒนาธุรกิจ",
      "✨ แรงบันดาลใจจากประสบการณ์จริง",
      "✨ โอกาสแลกเปลี่ยนมุมมองกับผู้เข้าร่วมอื่น"
    ],
    location: "ห้องประชุมอุทยานวิทยาศาสตร์ภาคใต้ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่"
  },

  {
    id: 1,
    title: "Food Festival",
    image: "assets/event1.jpg",
    date: "15–20 พฤษภาคม 2030",
    time: "12:00 – 15:00 น.",
    speaker: "ทีมผู้จัดงาน",
    description: `
      🍽️ เทศกาลอาหารสุดพิเศษ
      รวมร้านอาหารชื่อดังจากทั่วภาคใต้

      🌶️ พบกับอาหารพื้นถิ่น
      และเมนูยอดนิยมที่คัดสรรมาเป็นพิเศษ
      ในบรรยากาศสบาย ๆ เป็นกันเอง
    `,
    target: [
      "📍 ประชาชนทั่วไป",
      "📍 ผู้ที่ชื่นชอบอาหาร",
      "📍 นักท่องเที่ยว"
    ],
    benefits: [
      "✨ ลิ้มลองอาหารพื้นถิ่นและอาหารยอดนิยม",
      "✨ สนับสนุนผู้ประกอบการท้องถิ่น"
    ],
    location: "ลานกิจกรรมกลางแจ้ง อุทยานวิทยาศาสตร์ภาคใต้"
  },

  {
    id: 2,
    title: "Music Festival",
    image: "assets/event2.jpg",
    date: "21 มิถุนายน 2030",
    time: "13:00 – 15:00 น.",
    speaker: "วงดนตรีชื่อดังจากกรุงเทพฯ",
    description: `
      🎶 เทศกาลดนตรีสุดยิ่งใหญ่
      รวบรวมศิลปินและวงดนตรีชื่อดังมากมาย

      🎤 สนุกไปกับเสียงเพลง
      และบรรยากาศงานดนตรีกลางแจ้ง
      ที่เต็มไปด้วยพลังและความมันส์
    `,
    target: [
      "📍 เยาวชนและวัยรุ่น",
      "📍 ผู้ที่ชื่นชอบดนตรี"
    ],
    benefits: [
      "✨ ความบันเทิงจากศิลปินชื่อดัง",
      "✨ ประสบการณ์งานดนตรีขนาดใหญ่"
    ],
    location: "ลานกิจกรรมกลางแจ้ง"
  },

  {
    id: 3,
    title: "Business Talk",
    image: "assets/event4.jpg",
    date: "25–26 พฤศจิกายน 2030",
    time: "10:00 – 11:00 น.",
    speaker: "วิทยากร: คุณธนกฤต วิจิตรพงศ์",
    description: `
      💼 กิจกรรม Business Talk
      เวทีเสวนาและแลกเปลี่ยนประสบการณ์ด้านธุรกิจ

      🌐 เหมาะสำหรับผู้ที่ต้องการ
      เริ่มต้น พัฒนา และต่อยอดธุรกิจ
      ในยุคเศรษฐกิจและเทคโนโลยีที่เปลี่ยนแปลงอย่างรวดเร็ว
    `,
    target: [
      "📍 ผู้ประกอบการและเจ้าของกิจการ",
      "📍 นักศึกษาและผู้ที่สนใจเริ่มต้นธุรกิจ",
      "📍 ผู้ที่ต้องการพัฒนาทักษะด้านการบริหาร"
    ],
    benefits: [
      "✨ แนวคิดเชิงกลยุทธ์จากประสบการณ์จริง",
      "✨ แนวทางการปรับตัวในยุคดิจิทัล",
      "✨ โอกาสสร้างเครือข่ายทางธุรกิจ"
    ],
    location: "ห้องประชุมอุทยานวิทยาศาสตร์ภาคใต้ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่"
  }
];

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
const event = events.find(e => e.id === id);

if (event) {
  document.getElementById("title").innerText = event.title;
  document.getElementById("poster").src = event.image;
  document.getElementById("date").innerText = "📅 " + event.date;
  document.getElementById("time").innerText = "⏰ " + event.time;
  document.getElementById("speaker").innerText = "👤 " + event.speaker;
  document.getElementById("description").innerText = event.description;
}

const extraContainer = document.getElementById("extra-sections");

function createSection(title, items) {
  if (!items || items.length === 0) return "";

  return `
    <div class="detail-section">
      <h3>${title}</h3>
      <ul class="detail-list">
        ${items.map(item => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
}

if (event) {
  extraContainer.innerHTML = `
    ${createSection("เหมาะสำหรับ", event.target)}
    ${createSection("สิ่งที่จะได้รับจากกิจกรรม", event.benefits)}
    ${
      event.location
        ? `<div class="detail-section">
            <h3>สถานที่จัดกิจกรรม</h3>
            <p class="detail-location">📍 ${event.location}</p>
          </div>`
        : ""
    }
  `;
}
  