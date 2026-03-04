const uploadBtn = document.getElementById("uploadBtn");
const createQRBtn = document.getElementById("createQRBtn");
const exportQRBtn = document.getElementById("exportQRBtn");
const fileInput = document.getElementById("fileInput");
const tbody = document.getElementById("attendeeBody");
const searchInput = document.getElementById("searchInput");

/* ===== DATA ===== */
let attendees = JSON.parse(localStorage.getItem("attendees")) || [];

/* ===== RENDER ===== */
function renderTable(data) {
  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="empty">ยังไม่มีข้อมูล</td></tr>`;
    return;
  }

  data.forEach((a, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${a.name}</td>
        <td>${a.position}</td>
        <td>${a.organization}</td>
        <td>
          <button type="button" onclick="editAttendee(${i})">✏️</button>
          <button type="button" onclick="showQR(${i})">QR</button>
        </td>
      </tr>
    `;
  });
}
//alert('Export QR Code สำเร็จ')

function editAttendee(index) {
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get("eventId");

  window.location.href =
    `edit-attendee.html?eventId=${eventId}&index=${index}`;
}


renderTable(attendees);

/* ===== UPLOAD ===== */
uploadBtn.onclick = () => fileInput.click();

fileInput.onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    const data = new Uint8Array(evt.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    // 1️⃣ normalize header
    const normalizedRows = rows.map(row => {
      const clean = {};
      Object.keys(row).forEach(k => {
        clean[k.trim()] = row[k];
      });
      return clean;
    });

    // 2️⃣ ดึงของเก่า
    const oldAttendees = JSON.parse(localStorage.getItem("attendees")) || [];

    // 3️⃣ แปลงไฟล์ใหม่
    const newAttendees = normalizedRows.map((r) => ({
      qrId: "att_" + crypto.randomUUID(),
      name: `${r["ชื่อ"]} ${r["นามสกุล"]}`,
      position: r["ตำแหน่ง"],
      organization: r["หน่วยงาน"],
      email: r["อีเมล"] || "",
      phone: r["เบอร์โทรศัพท์"] || "",
      checkedIn: false
    }));

    // 4️⃣ รวมของเก่า + ใหม่
    attendees = [...oldAttendees, ...newAttendees];

    // 5️⃣ save + render
    localStorage.setItem("attendees", JSON.stringify(attendees));
    renderTable(attendees);
  };

  reader.readAsArrayBuffer(file);
};



/* ===== CREATE QR ===== */
createQRBtn.onclick = () => {
    attendees = attendees.map(a => ({
        ...a,
        qr: `QR-${Date.now()}`
    }));
    localStorage.setItem("attendees", JSON.stringify(attendees));
    alert("สร้าง QR Code เรียบร้อย");
};

/* ===== EXPORT QR TO ZIP ===== */
exportQRBtn.onclick = async () => {
  if (!attendees.length) {
    alert("ไม่มีข้อมูลผู้เข้าร่วม");
    return;
  }

  const zip = new JSZip();
  const folder = zip.folder("QR_Code");

  for (let i = 0; i < attendees.length; i++) {
    const a = attendees[i];

    // สร้าง canvas ชั่วคราว
    const tempDiv = document.createElement("div");

    tempDiv.style.padding = "32px";
    tempDiv.style.background = "#ffffff";

    // สร้าง QR (ขนาดเล็กลง เพื่อให้มีขอบขาว)
    new QRCode(tempDiv, {
      text: a.qrId,
      width: 240,
      height: 240,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });

    // รอให้ QR สร้างเสร็จ
    await new Promise(r => setTimeout(r, 50));

    const canvas = tempDiv.querySelector("canvas");
    const base64 = canvas
      .toDataURL("image/png")
      .replace(/^data:image\/png;base64,/, "");

    const safeName = a.name.replace(/\s+/g, "_");
    folder.file(`${i + 1}_${safeName}.png`, base64, { base64: true });
  }

  zip.generateAsync({ type: "blob" }).then(blob => {
    saveAs(blob, "attendee-qrcode.zip");
  });
};

/* ===== SEARCH ===== */
searchInput.oninput = () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = attendees.filter(a =>
        a.name.toLowerCase().includes(keyword) ||
        a.organization.toLowerCase().includes(keyword)
    );
    renderTable(filtered);
};

const params = new URLSearchParams(window.location.search);
const eventId = params.get("eventId");

if (!eventId) {
    alert("ไม่พบข้อมูลกิจกรรม");
    location.href = "my-event.html";
}
function showQR(index) {
  const attendee = attendees[index];
  if (!attendee || !attendee.qrId) {
    alert("ไม่มี QR ID");
    return;
  }

  const qrBox = document.getElementById("qrBox");
  qrBox.innerHTML = "";

  new QRCode(qrBox, {
    text: attendee.qrId,
    width: 220,
    height: 220
  });

  document.getElementById("qrModal").style.display = "flex";
}

window.showQR = showQR;

function closeQR() {
  document.getElementById("qrModal").style.display = "none";
}

window.showQR = showQR;
window.closeQR = closeQR;
