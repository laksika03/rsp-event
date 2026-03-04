const names = [
  ["ชลธิชา พรหมศักดิ์", "PSU PHUKET"],
  ["ณัฐวุฒิ เสริมสุข", "PSU HATYAI"],
  ["รวิวานต์ ธีร์โชติ", "TTB HATYAI"],
  ["กิตติคุณ วัฒนเดช", "SCB"],
  ["ธิดารัตน์ วงศ์ประเสริฐ", "PSU HATYAI"],
  ["พรเทพ แสงจิตต์", "ABC CO.,LTD"],
  ["ศศิประภา อยู่เย็น", "XYZ CO.,LTD"],
];

const TOTAL = 50;                 // 🔒 จำนวนผู้เข้าร่วมจริง
let liveCount = 0;
let index = 0;

const tbody = document.getElementById("latestBody");
const liveEl = document.getElementById("liveCount");

/* CLOCK */
setInterval(() => {
  const now = new Date();

  const time = now.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const date = now.toLocaleDateString("th-TH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  document.getElementById("clock").innerHTML = `
    ${time}
    <div style="font-size:12px;color:#777;margin-top:4px">
      ${date}
    </div>
  `;
}, 1000);


/* MOCK CHECK-IN (ทุก 5 วิ) */
setInterval(() => {
  // ⛔ ถ้าครบ 50 แล้ว หยุดเพิ่ม
  if (liveCount >= TOTAL) return;

  // เพิ่ม live ตามจริง
  liveCount++;
  liveEl.innerText = liveCount;

  // วนชื่อเมื่อหมด list
  const name = names[index % names.length];

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${liveCount}</td>
    <td>${name[0]}</td>
    <td>${name[1]}</td>
    <td>
      <span class="time-pill">
        ${new Date().toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit"
        })}
      </span>
    </td>
  `;

  tbody.prepend(tr);

  // จำกัดแถวล่าสุด 
  if (tbody.children.length > liveCount) {
    tbody.removeChild(tbody.lastChild);
  }

  index++;
}, 3000);

