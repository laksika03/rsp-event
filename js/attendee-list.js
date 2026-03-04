const tbody = document.getElementById("attendeeBody");
const searchInput = document.getElementById("searchInput");

const totalCount = document.getElementById("totalCount");
const checkedCount = document.getElementById("checkedCount");
const pendingCount = document.getElementById("pendingCount");

const statusFilter = document.getElementById("statusFilter");
const filterToggle = document.getElementById("filterToggle");
const filterMenu = document.getElementById("filterMenu");

let currentStatusFilter = "all";


let attendees = JSON.parse(localStorage.getItem("attendees")) || [];

function render(data) {
  currentView = data;
  tbody.innerHTML = "";

  data.forEach((a, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${a.name}</td>
        <td>${a.position || "-"}</td>
        <td>${a.organization || "-"}</td>
        <td>
          <span class="status ${a.checkedIn ? "ok" : "wait"}">
            ${a.checkedIn ? "เช็คอินแล้ว" : "ยังไม่เช็คอิน"}
          </span>
        </td>
      </tr>
    `;
  });
}

function updateSummary() {
  totalCount.textContent = attendees.length;
  checkedCount.textContent = attendees.filter(a => a.checkedIn).length;
  pendingCount.textContent = attendees.filter(a => !a.checkedIn).length;
}

searchInput.oninput = applyFilters;
// เพิ่ม class active ให้ปุ่มเมื่อเปิดเมนู
if (filterToggle && filterMenu) {
  filterToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    filterMenu.classList.toggle("show");
    filterToggle.classList.toggle("active"); // เพิ่มบรรทัดนี้
  });

  filterMenu.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    currentStatusFilter = li.dataset.value;

    filterMenu.querySelectorAll("li").forEach(x => {
      x.classList.toggle("active", x === li);
    });

    filterMenu.classList.remove("show");
    filterToggle.classList.remove("active"); // เพิ่มบรรทัดนี้
    applyFilters();
  });

  document.addEventListener("click", (e) => {
    if (!filterMenu.contains(e.target) && !filterToggle.contains(e.target)) {
      filterMenu.classList.remove("show");
      filterToggle.classList.remove("active"); // เพิ่มบรรทัดนี้
    }
  });
}


function applyFilters() {
  const k = searchInput.value.toLowerCase();

  const filtered = attendees.filter(a => {
    const matchText =
      a.name.toLowerCase().includes(k) ||
      (a.organization || "").toLowerCase().includes(k);

    const matchStatus =
      currentStatusFilter === "all" ||
      (currentStatusFilter === "checked" && a.checkedIn) ||
      (currentStatusFilter === "pending" && !a.checkedIn);

    return matchText && matchStatus;
  });

  render(filtered);
}
updateSummary();
applyFilters();

const pdfBtn = document.querySelector("button.pdf");
const excelBtn = document.querySelector("button.excel");

pdfBtn?.addEventListener("click", exportPDF);
excelBtn?.addEventListener("click", exportExcel);

function escapeHTML(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function buildExportTableHTML(data, coloredStatus = false) {
  const rows = data.map((a, i) => {
    const statusText = a.checkedIn ? "เช็คอินแล้ว" : "ยังไม่เช็คอิน";
    const statusHTML = coloredStatus
      ? `<span class="tag ${a.checkedIn ? "ok" : "wait"}">${statusText}</span>`
      : statusText;

    return `
      <tr>
        <td style="text-align:center;">${i + 1}</td>
        <td>${escapeHTML(a.name || "")}</td>
        <td>${escapeHTML(a.position || "-")}</td>
        <td>${escapeHTML(a.organization || "-")}</td>
        <td style="text-align:center;">${statusHTML}</td>
      </tr>
    `;
  }).join("");

  return `
    <table>
      <thead>
        <tr>
          <th style="width:60px;">ลำดับ</th>
          <th>ชื่อ</th>
          <th>ตำแหน่ง</th>
          <th>หน่วยงาน</th>
          <th style="width:140px;">สถานะ</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function getEventMeta() {
  const keys = ["currentEvent", "selectedEvent", "activeEvent", "event", "eventDetail", "eventData"];
  let ev = null;

  for (const k of keys) {
    const raw = localStorage.getItem(k);
    if (!raw) continue;
    try {
      const obj = JSON.parse(raw);
      if (obj && (obj.title || obj.room || obj.start || obj.end)) { ev = obj; break; }
    } catch (_) {}
  }

  const title = ev?.title || "รายชื่อผู้เข้าร่วม";
  const room = ev?.room || "-";

  const start = ev?.start || "";
  const end = ev?.end || "";

  const formatTH = (d) => {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return "";
    return dt.toLocaleString("th-TH", { year:"numeric", month:"2-digit", day:"2-digit", hour:"2-digit", minute:"2-digit" });
  };

  const startTxt = start ? formatTH(start) : "";
  const endTxt = end ? formatTH(end) : "";

  let rangeTxt = "-";
  if (startTxt && endTxt) rangeTxt = `${startTxt} - ${endTxt}`;
  else if (startTxt) rangeTxt = startTxt;
  else if (endTxt) rangeTxt = endTxt;

  return { title, room, rangeTxt };
}


function exportPDF() {
  let w;
  try {
    w = window.open("", "_blank");
    if (!w) {
      alert("Popup ถูกบล็อก กรุณาอนุญาต popup ก่อน");
      return;
    }

    const data =
      (typeof currentView !== "undefined" && Array.isArray(currentView) && currentView.length >= 0)
        ? currentView
        : (Array.isArray(attendees) ? attendees : []);

    // ถ้า buildExportTableHTML ไม่อยู่ จะไม่พัง
    const tableHTML =
      (typeof buildExportTableHTML === "function")
        ? buildExportTableHTML(data, true)
        : `<div style="color:red">ไม่พบฟังก์ชัน buildExportTableHTML()</div>`;

    const meta = getEventMeta();
    w.document.open();
    w.document.write(`
      <!doctype html>
      <html lang="th">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Attendees Export</title>
        <style>
        *{
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        body{ font-family: Arial, sans-serif; padding: 24px; }
        .meta{ color:#555; margin-bottom: 16px; font-size: 13px; }

        table{ width:100%; border-collapse: collapse; }
        th, td{ border:1px solid #d9e2f1; padding: 10px 8px; font-size: 13px; }
        th{ background-color:#2f5597 !important; color:#fff !important; text-align:center; font-weight:700; }
        tbody tr:nth-child(even){ background-color:#f6f9ff !important; }

        .tag{ display:inline-block; padding:6px 10px; border-radius:999px; font-weight:700; font-size:12px; color:#fff; }
        .tag.ok{ background-color:#22c55e !important; }
        .tag.wait{ background-color:#f97316 !important; }
      </style>

      </head>
      <body>
        <h2>รายชื่อผู้เข้าร่วม</h2>
        <div class="meta">รวม ${data.length} รายการ</div>
        ${tableHTML}
        <script>
          window.onload = function(){ window.print(); };
        </script>
      </body>
      </html>
    `);
    w.document.close();
  } catch (err) {
    console.error(err);
    if (w) {
      w.document.open();
      w.document.write(`<pre style="font:14px/1.4 monospace; padding:16px; color:#b00020;">
Export PDF Error:
${String(err && err.stack ? err.stack : err)}
</pre>`);
      w.document.close();
    } else {
      alert("Export PDF error: " + (err?.message || err));
    }
  }
}

function exportExcel() {
  if (typeof XLSX === "undefined") {
    alert("ยังไม่ได้โหลดไลบรารี Excel (xlsx). ตรวจสอบ script xlsx-js-style ใน HTML");
    return;
  }

  const data = currentView || [];
  const header = ["ลำดับ", "ชื่อ", "ตำแหน่ง", "หน่วยงาน", "สถานะ"];

  const rows = data.map((a, i) => ([
    i + 1,
    a.name || "",
    a.position || "-",
    a.organization || "-",
    a.checkedIn ? "เช็คอินแล้ว" : "ยังไม่เช็คอิน"
  ]));

  const ws = XLSX.utils.aoa_to_sheet([header, ...rows]);

  // ตั้งความกว้างคอลัมน์
  ws["!cols"] = [
    { wch: 6 },
    { wch: 26 },
    { wch: 20 },
    { wch: 26 },
    { wch: 14 }
  ];

  const borderThin = {
    top: { style: "thin", color: { rgb: "D9E2F1" } },
    bottom: { style: "thin", color: { rgb: "D9E2F1" } },
    left: { style: "thin", color: { rgb: "D9E2F1" } },
    right: { style: "thin", color: { rgb: "D9E2F1" } }
  };

  // helper: ใส่ style ให้ cell
  function setCellStyle(addr, style) {
    if (!ws[addr]) return;
    ws[addr].s = style;
  }

  // range ทั้งหมด
  const range = XLSX.utils.decode_range(ws["!ref"]);

  // Header row (row 0)
  for (let C = range.s.c; C <= range.e.c; C++) {
    const addr = XLSX.utils.encode_cell({ r: 0, c: C });
    setCellStyle(addr, {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "2F5597" } },
      alignment: { horizontal: "center", vertical: "center" },
      border: borderThin
    });
  }

  // Body rows
  for (let R = 1; R <= range.e.r; R++) {
    const isEven = (R % 2 === 0); // zebra
    for (let C = range.s.c; C <= range.e.c; C++) {
      const addr = XLSX.utils.encode_cell({ r: R, c: C });

      const base = {
        font: { color: { rgb: "111827" } },
        fill: isEven ? { fgColor: { rgb: "F6F9FF" } } : undefined,
        alignment: {
          horizontal: (C === 0 || C === 4) ? "center" : "left",
          vertical: "center"
        },
        border: borderThin
      };

      // สถานะคอลัมน์สุดท้าย (C=4) ใส่สีเฉพาะ cell นั้น
      if (C === 4) {
        const checkedIn = data[R - 1]?.checkedIn;
        base.font = { bold: true, color: { rgb: "FFFFFF" } };
        base.fill = { fgColor: { rgb: checkedIn ? "22C55E" : "F97316" } }; // เขียว/ส้ม
        base.alignment = { horizontal: "center", vertical: "center" };
      }

      setCellStyle(addr, base);
    }
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Attendees");

  const filename = `attendees_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(wb, filename);
}
