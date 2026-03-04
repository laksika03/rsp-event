/* ===== ELEMENT ===== */
const popup = document.getElementById("scanPopup");
const titleEl = document.getElementById("popupTitle");
const nameEl = document.getElementById("popupName");
const orgEl = document.getElementById("popupOrg");
const timeEl = document.getElementById("popupTime");

/* ===== SOUND ===== */
const beep = new Audio("beep.mp3");

/* ===== LOCK ===== */
let lock = false;
let lastScan = "";

/* ===== TIME ===== */
function nowTime() {
    const d = new Date();
    return d.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit"
    }) + " น.";
}

/* ===== POPUP ===== */
function showPopup(type, attendee) {
    popup.className = `scan-popup ${type}`;

    titleEl.textContent =
        type === "success" ? "ลงทะเบียนสำเร็จ" : "ลงทะเบียนซ้ำ";

    nameEl.textContent = attendee.name || "-";
    orgEl.textContent = attendee.organization || "-";
    timeEl.textContent = nowTime();

    popup.classList.remove("hidden");

    setTimeout(() => {
        popup.classList.add("hidden");
        // 🔓 ปลดล็อกให้สแกนใหม่
        lock = false;
        lastScan = "";
    }, 2500);
}

/* ===== SCAN SUCCESS ===== */
function onScanSuccess(decodedText) {
    if (lock || decodedText === lastScan) return;

    lock = true;
    lastScan = decodedText;

    const attendees = JSON.parse(localStorage.getItem("attendees")) || [];
    const attendee = attendees.find(a => a.qrId === decodedText);

    if (!attendee) {
        showPopup("error", { name: "ไม่พบข้อมูล", organization: "-" });
        return;
    }

    if (attendee.checkedIn) {
        showPopup("error", attendee);
        return;
    }

    attendee.checkedIn = true;
    attendee.checkinTime = new Date().toISOString();
    localStorage.setItem("attendees", JSON.stringify(attendees));

    showPopup("success", attendee);

    beep.currentTime = 0;
    beep.play().catch(() => { });
}

/* ===== INIT CAMERA ===== */
const scanner = new Html5Qrcode("qr-reader");

Html5Qrcode.getCameras().then(devices => {
    if (!devices.length) {
        alert("ไม่พบกล้อง");
        return;
    }

    scanner.start(
        devices[0].id,
        { fps: 10 },
        onScanSuccess
    );
});
