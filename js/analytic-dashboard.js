// ===== MOCK DATA (เปลี่ยนเป็นข้อมูลจริงได้) =====
const total = 200;
const checkedIn = 175;

// Update summary
document.getElementById("totalCount").textContent = `${total} คน`;
document.getElementById("checkinCount").textContent = `${checkedIn} คน`;

// ===== DONUT CHART =====
new Chart(document.getElementById("donutChart"), {
  type: "doughnut",
  data: {
    labels: ["เช็คอินแล้ว", "ยังไม่เช็คอิน"],
    datasets: [{
      data: [175, 25],
      backgroundColor: [
        "#2f5597",
        "#d6e2f5"
      ],
      hoverBackgroundColor: [
        "#24467d",
        "#c5d6f0"
      ],
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "72%",     // ⭐ บางขึ้น ดู modern
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 14,
          boxHeight: 14,
          padding: 16,
          font: {
            size: 13,
            weight: "600"
          },
          color: "#334155"
        }
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 10
      }
    }
  }
});


// ===== BAR CHART =====
new Chart(document.getElementById("barChart"), {
  type: "bar",
  data: {
    labels: ["วิทยากร", "เจ้าหน้าที่", "ผู้ลงทะเบียน", "ยกเลิก"],
    datasets: [{
      label: "จำนวนผู้ลงทะเบียน",
      data: [45, 20, 30, 5],
      backgroundColor: [
        "#4a7bd0",
        "#6c8cff",
        "#90aaff",
        "#d6e2f5"
      ],
      borderRadius: 10,
      barThickness: 42
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false   // ❌ ไม่ต้องโชว์ undefined
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 10
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 13, weight: "600" },
          color: "#475569"
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0,0,0,0.06)",
          borderDash: [6, 6]
        },
        ticks: {
          font: { size: 12 },
          color: "#64748b"
        }
      }
    }
  }
});


// ===== LINE CHART =====
new Chart(document.getElementById("lineChart"), {
  type: "line",
  data: {
    labels: ["08:20", "09:00", "10:00", "11:00"],
    datasets: [{
      label: "Check-in",
      data: [85, 12, 22, 42],
      borderColor: "#5b7cfa",
      borderWidth: 3,
      tension: 0.45,
      fill: true,
      backgroundColor: ctx => {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 260);
        g.addColorStop(0, "rgba(91,124,250,0.35)");
        g.addColorStop(1, "rgba(91,124,250,0.02)");
        return g;
      },
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: "#fff",
      pointBorderWidth: 3,
      pointBorderColor: "#5b7cfa"
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 10,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#64748b",
          font: { size: 13 }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0,0,0,0.06)",
          borderDash: [6, 6]
        },
        ticks: {
          color: "#64748b",
          font: { size: 12 }
        }
      }
    }
  }
});


