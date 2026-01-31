// تغییر تاریخ نمایشی
function changeDate(offset) {
  const dateDisplay = document.getElementById("dateDisplay");
  if (dateDisplay.textContent.includes("امروز")) {
    dateDisplay.textContent = "۱۴۰۴/۰۸/۲۳";
  } else {
    dateDisplay.textContent = "امروز، ۱۴۰۴/۰۸/۲۴";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // تنظیمات مشترک برای همه نمودارها
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 12, bottom: 12, left: 8, right: 8 }
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "#4b0082",
          font: { family: "Shabnam", size: 14, weight: "500" },
          boxWidth: 16,
          padding: 12
        }
      },
      tooltip: {
        backgroundColor: "#6f42c1",
        titleFont: { family: "Shabnam", size: 13 },
        bodyFont: { family: "Shabnam", size: 12 },
        cornerRadius: 6,
        padding: 10
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#6f42c1",
          font: { family: "Shabnam", size: 12 },
          padding: 6
        },
        grid: { display: false }
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: "#6f42c1",
          font: { family: "Shabnam", size: 12 },
          padding: 6
        },
        grid: { color: "rgba(111,66,193,0.1)" }
      }
    }
  };

  // تابع ساخت نمودار عمومی
  const createChart = (id, type, labels, data, label, colors, showLegend = false) => {
    const canvas = document.getElementById(id);
    if (!canvas) return; // اگر شناسه در HTML وجود نداشت، خطا نده
    new Chart(canvas, {
      type: type,
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          borderColor: colors.border,
          backgroundColor: colors.fill,
          tension: type === "line" ? 0.4 : 0,
          borderRadius: type === "bar" ? 6 : 0
        }]
      },
      options: {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          legend: { ...baseOptions.plugins.legend, display: showLegend }
        }
      }
    });
  };

  // ------------------ بخش روزانه ------------------
  const dailyLabels = ["شنبه", "یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];
  const dailyScores = [91, 85, 78, 88, 92, 95, 90];
  const dailyCompletions = [100, 98, 96, 97, 99, 100, 100];

  createChart("scoreBarChart", "bar", dailyLabels, dailyScores, "میانگین امتیازها", {
    border: "#237379ff",
    fill: "#51d4cdff"
  });

  createChart("completionBarChart", "bar", dailyLabels, dailyCompletions, "میانگین تکمیل‌ها", {
    border: "#237379ff",
    fill: "#51d4cdff"
  });

  // ------------------ بخش هفتگی ------------------
  const weeklyLabels = ["هفته ۱", "هفته ۲", "هفته ۳", "هفته ۴"];
  const weeklyScores = [40, 55, 60, 70];
  const weeklyCompletions = [12, 18, 25, 30];

  createChart("weeklyScores", "line", weeklyLabels, weeklyScores, "امتیازها", {
    border: "#0099cc",
    fill: "rgba(0,153,204,0.2)"
  }, true);

  createChart("weeklyActivities", "bar", weeklyLabels, weeklyCompletions, "تعداد تکمیل", {
    border: "#00cc99",
    fill: ["#00cc99", "#33cccc", "#66ffcc", "#99ffcc"]
  });

  // ------------------ بخش ماهانه ------------------
  const monthlyLabels = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
  const monthlyScores = [75, 80, 85, 90, 70, 75, 80, 65, 40, 35, 60, 75]; // داده‌های نمونه
  const monthlyCompletions = [80, 82, 78, 85, 88, 80, 70, 60, 74, 86, 60, 78]; // داده‌های نمونه

  createChart("monthlyScores", "line", monthlyLabels, monthlyScores, "امتیازها", {
    border: "#0099cc",
    fill: "rgba(0,153,204,0.2)"
  }, true);

  createChart("monthlyActivities", "bar", monthlyLabels, monthlyCompletions, "تعداد تکمیل", {
    border: "#ffffffff",
    fill: ["#00ff0dff", "#aefe02ff", "#d4ff00ff", "#ffbb00ff", "#ff8800ff", "#ff4400ff","#00ffaeff","#00fffbff","#00b3ffff","#00a2ffff","#0055ffff","#4000ffff"]
  });
});