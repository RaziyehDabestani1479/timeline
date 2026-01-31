// تغییر تاریخ نمایشی
// تغییر تاریخ نمایشی
function changeDate(offset) {
  const dateDisplay = document.getElementById("dateDisplay");
  if (dateDisplay.textContent.includes("امروز")) {
    dateDisplay.textContent = "۱۴۰۴/۰۸/۲۳";
  } else {
    dateDisplay.textContent = "امروز، ۱۴۰۴/۰۸/۲۴";
  }
}



//بخش جستوجو 
//بخش جستوجو 
function searchActivities() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) {
    alert("لطفاً نام فعالیت را وارد کنید.");
    return;
  }
 
  // مثال ساده: جست و جو کردن فعالیت‌ها بر اساس نام
  const activities = document.querySelectorAll("#activityList .activity-box");
  activities.forEach(box => {
    const title = box.querySelector("strong").textContent;
    box.style.display = title.includes(query) ? "block" : "none";
  });
}

// اعمال فیلتر ها
// اعمال فیلتر ها
function applyFilters() {
  const priority = document.getElementById("priorityFilter").value;
  const done = document.getElementById("doneFilter").checked;
  const undone = document.getElementById("undoneFilter").checked;

  alert("اعمال فیلترها:\nاولویت: " + priority + "\nکامل‌شده: " + done + "\nناتمام: " + undone);
}



// فعال‌سازی امتیازدهی و تجربه پس از تیک انجام
// فعال‌سازی امتیازدهی و تجربه پس از تیک انجام
function enableRating(checkbox) {
  const activityBox = checkbox.closest('.activity-box');
  const ratingBox = activityBox.querySelector('.star-rating');
  const experienceBox = activityBox.querySelector('.experience-box');

  if (checkbox.checked) {
    ratingBox.style.display = 'flex';
    experienceBox.style.display = 'block';
  } else {
    ratingBox.style.display = 'none';
    experienceBox.style.display = 'none';

    // ریست ستاره‌ها و متن تجربه
    const stars = ratingBox.querySelectorAll('i');
    stars.forEach(star => star.className = 'bi bi-star');
    experienceBox.querySelector('textarea').value = '';
  }
}

// امتیازدهی ستاره‌ای
function rate(star) {
  const stars = star.parentElement.querySelectorAll('i');
  const index = Array.from(stars).indexOf(star);
  stars.forEach((s, i) => {
    s.className = i <= index ? 'bi bi-star-fill' : 'bi bi-star';
  });
}


// حذف فعالیت‌های انتخاب‌شده
// حذف فعالیت‌های انتخاب‌شده
function deleteSelected() {
  const selected = document.querySelectorAll('.select-task:checked');
  if (selected.length === 0) {
    alert("هیچ فعالیتی انتخاب نشده است.");
    return;
  }
  if (confirm("آیا از حذف فعالیت‌های انتخاب‌شده مطمئن هستید؟")) {
    selected.forEach(box => {
      const activity = box.closest('.activity-box');
      activity.remove();
    });
  }
}



//پنجره ویرایش فعالیت
//پنجره ویرایش فعالیت
// باز کردن پنجره ویرایش با انیمیشن و قفل اسکرول پس‌زمینه
function editActivity() {
  const overlay = document.getElementById("editModal");
  overlay.classList.add("open");
  document.body.classList.add("modal-open");
}

// بستن پنجره ویرایش
function closeModal() {
  const overlay = document.getElementById("editModal");
  overlay.classList.remove("open");
  document.body.classList.remove("modal-open");
}

// نمایش یا پنهان‌سازی فیلدهای زمان اختصاصی
function toggleTimeFields() {
  const toggle = document.getElementById("customTimeToggle");
  const fields = document.getElementById("timeFields");
  fields.style.display = toggle.checked ? "block" : "none";
}

// تغییر حالت زمان (تکی یا بازه)
function switchTimeMode() {
  const mode = document.getElementById("timeMode").value;
  const singleBox = document.getElementById("singleTimeBox");
  const rangeBox = document.getElementById("rangeTimeBox");

  if (mode === "single") {
    singleBox.style.display = "block";
    rangeBox.style.display = "none";
  } else {
    singleBox.style.display = "none";
    rangeBox.style.display = "block";
  }
}

// انتخاب اولویت و ذخیره در localStorage
function selectPriority(el) {
  const circles = document.querySelectorAll('.priority-circles .circle');
  circles.forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');

  // ذخیره انتخاب
  localStorage.setItem("selectedPriority", el.classList[1]);
}

// بارگذاری پیش‌فرض اولویت از localStorage
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("selectedPriority");
  const circles = document.querySelectorAll('.priority-circles .circle');

  if (saved) {
    circles.forEach(c => {
      if (c.classList.contains(saved)) {
        c.classList.add("selected");
      } else {
        c.classList.remove("selected");
      }
    });
  } else {
    const defaultCircle = document.querySelector('.priority-circles .circle.highest');
    if (defaultCircle) defaultCircle.classList.add("selected");
  }
});

// مدیریت آیکون‌ها
// مدیریت آیکون‌ها
let selectedIcon = null;

function openIconGallery() {
  document.getElementById("iconGalleryModal").classList.add("open");
  selectedIcon = null;
  document.getElementById("confirmIconBtn").disabled = true;
}

function closeIconGallery() {
  document.getElementById("iconGalleryModal").classList.remove("open");
  selectedIcon = null;
  document.getElementById("confirmIconBtn").disabled = true;
}

function selectIcon(img) {
  document.querySelectorAll(".icon-gallery img").forEach(i => i.classList.remove("selected"));
  img.classList.add("selected");
  selectedIcon = img.dataset.icon;
  document.getElementById("confirmIconBtn").disabled = false;
}

function confirmIcon() {
  if (!selectedIcon) {
    alert("لطفاً یک آیکون انتخاب کنید.");
    return;
  }
  document.getElementById("currentIcon").src = selectedIcon;
  closeIconGallery();
}

// ذخیره‌سازی فعالیت (شبیه‌سازی)
function saveActivity() {
  alert("تغییرات ذخیره شد (شبیه‌سازی). در نسخه نهایی، اطلاعات به پایگاه داده ارسال می‌شود.");
  closeModal();
}
// بستن مودال با کلیک روی پس‌زمینه
document.addEventListener("click", (e) => {
  const overlay = document.getElementById("editModal");
  if (!overlay.classList.contains("open")) return;
  const content = overlay.querySelector(".modal-content");
  if (e.target === overlay) {
    closeModal();
  }
});

// بستن مودال با کلید Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});


// -------------------- ایجاد فعالیت جدید --------------------
// -------------------- متغیرهای عمومی --------------------
// -------------------- متغیرهای عمومی --------------------
// -------------------- متغیرهای عمومی --------------------
let currentStepCommon = 1; // مدیریت مراحل
let selectedGroupOne = null; // گروه انتخاب‌شده در مرحله 1
let selectedActivityTwo = null; // فعالیت انتخاب‌شده در مرحله 2

// -------------------- داده‌ها --------------------
const activitiesByGroupTwo = {
  "یادگیری": [
    { name: "مطالعه کتاب", icon: "../shared/icons/book.png" },
    { name: "تمرین برنامه‌نویسی", icon: "../shared/icons/code.png" },
    { name: "یادداشت‌برداری", icon: "../shared/icons/note.png" }
  ],
  "تندرستی": [
    { name: "خواب مناسب", icon: "../shared/icons/sleep.png" },
    { name: "ورزش", icon: "../shared/icons/exercise.png" },
    { name: "تغذیه سالم", icon: "../shared/icons/food.png" },
    { name: "نوشیدن آب", icon: "../shared/icons/water.png" }
  ]
};

// -------------------- مرحله 1 (One) --------------------
function createActivityOne() {
  const overlay = document.getElementById("newActivityModal");
  if (!overlay) {
    alert("مودال ایجاد فعالیت پیدا نشد.");
    return;
  }

  overlay.classList.add("open");
  document.body.classList.add("modal-open");

  currentStepCommon = 1;
  selectedGroupOne = null;
  selectedActivityTwo = null;

  document.querySelectorAll(".group-box").forEach(box => box.classList.remove("selected"));
  document.getElementById("nextStepBtnOne").disabled = true;

  showStepOne(currentStepCommon);
}

function selectGroupOne(el) {
  document.querySelectorAll(".group-box").forEach(box => box.classList.remove("selected"));
  el.classList.add("selected");
  selectedGroupOne = el.dataset.group;
  localStorage.setItem("selectedGroupOne", selectedGroupOne);
  document.getElementById("nextStepBtnOne").disabled = false;
}

function goNextOne() {
  if (!selectedGroupOne && currentStepCommon === 1) return;
  currentStepCommon = 2;
  showStepTwo(currentStepCommon);
}

// -------------------- مرحله 2 (Two) --------------------
function loadActivitiesTwo(group) {
  const container = document.getElementById("activitiesContainerTwo");
  container.innerHTML = "";

  if (!activitiesByGroupTwo[group]) return;

  activitiesByGroupTwo[group].forEach(act => {
    const box = document.createElement("div");
    box.className = "activity-box-two";
    box.innerHTML = `
      <img src="${act.icon}" alt="${act.name}">
      <div class="activity-info-two"><h4>${act.name}</h4></div>
    `;
    box.onclick = () => selectActivityTwo(box, act.name);
    container.appendChild(box);
  });
}

function selectActivityTwo(el, name) {
  document.querySelectorAll(".activity-box-two").forEach(box => box.classList.remove("selected"));
  el.classList.add("selected");
  selectedActivityTwo = name;
  document.getElementById("nextStepBtnTwo").disabled = false;
}

function goNextTwo() {
  if (!selectedActivityTwo && currentStepCommon === 2) return;
  currentStepCommon = 3;
  showStepCommon(currentStepCommon);
}

function goBackTwo() {
  if (currentStepCommon > 1) {
    currentStepCommon--;
    showStepOne(currentStepCommon);
  }
}

// -------------------- مشترک (Common) --------------------
function showStepOne(step) {
  const title = document.querySelector(".wizard-modal h2");
  const groupList = document.querySelector(".group-list");
  const activityList = document.querySelector(".activity-list-two");
  const nextBtn = document.getElementById("nextStepBtnOne");

  const actionsOne = document.querySelector(".edit-actions-one");
  const actionsTwo = document.querySelector(".edit-actions-two");

  if (step === 1) {
    title.textContent = "ایجاد فعالیت جدید";
    groupList.style.display = "block";
    activityList.style.display = "none";

    actionsOne.style.display = "flex";
    actionsTwo.style.display = "none";

    nextBtn.disabled = !selectedGroupOne;

    const savedGroup = localStorage.getItem("selectedGroupOne");
    if (savedGroup) {
      document.querySelectorAll(".group-box").forEach(box => {
        if (box.dataset.group === savedGroup) {
          box.classList.add("selected");
          selectedGroupOne = savedGroup;
          document.getElementById("nextStepBtnOne").disabled = false;
        }
      });
    }
  }
}

function showStepTwo(step) {
  const title = document.querySelector(".wizard-modal h2");
  const groupList = document.querySelector(".group-list");
  const activityList = document.querySelector(".activity-list-two");
  const nextBtn = document.getElementById("nextStepBtnTwo");

  const actionsOne = document.querySelector(".edit-actions-one");
  const actionsTwo = document.querySelector(".edit-actions-two");

  if (step === 2) {
    title.textContent = "ایجاد فعالیت جدید";
    groupList.style.display = "none";
    activityList.style.display = "block";

    actionsOne.style.display = "none";
    actionsTwo.style.display = "flex";

    nextBtn.disabled = true;
    loadActivitiesTwo(selectedGroupOne);
  }
}

function showStepCommon(step) {
  const actionsOne = document.querySelector(".edit-actions-one");
  const actionsTwo = document.querySelector(".edit-actions-two");

  if (step === 3) {
    actionsOne.style.display = "none";
    actionsTwo.style.display = "none";
    createActivity_showStepThree();    // نمایش مرحله سوم
  }
}

function closeNewActivityModalCommon() {
  const overlay = document.getElementById("newActivityModal");
  overlay.classList.remove("open");
  document.body.classList.remove("modal-open");
}

/* -------------------------------
   مدیریت مرحله سوم ایجاد فعالیت
   ------------------------------- */

// متغیرهای عمومی برای ذخیره انتخاب‌ها
let createActivity_selectedGroup = null;   // نام گروه انتخاب‌شده از مرحله 1
let createActivity_selectedActivity = null; // نام فعالیت انتخاب‌شده از مرحله 2
let createActivity_selectedPriority = null; // اولویت انتخاب‌شده
let createActivity_selectedIcon = null;     // آیکون انتخاب‌شده

// نمایش مرحله سوم
function createActivity_showStepThree() {
  const title = document.querySelector(".wizard-modal h2");
  const groupList = document.querySelector(".group-list");
  const activityList = document.querySelector(".activity-list-two");
  const settingsThree = document.querySelector(".activity-settings-three");

  // مخفی کردن مراحل قبلی
  groupList.style.display = "none";
  activityList.style.display = "none";

  // نمایش مرحله سوم
  settingsThree.style.display = "block";
  title.textContent = "تنظیمات فعالیت";

  // نمایش نام گروه و فعالیت انتخاب‌شده
  document.getElementById("createActivity_groupName").textContent = createActivity_selectedGroup || "---";
  document.getElementById("createActivity_activityName").textContent = createActivity_selectedActivity || "---";
}

/* -------------------------------
   مدیریت زمان اختصاصی
   ------------------------------- */

// نمایش یا پنهان‌سازی فیلدهای زمان
function createActivity_toggleTimeFields() {
  const toggle = document.getElementById("createActivity_customTimeToggle");
  const fields = document.getElementById("createActivity_timeFields");
  fields.style.display = toggle.checked ? "block" : "none";
//برای اعتبار سنجی
  createActivity_validateForm();
}

// تغییر حالت زمان (تکی یا بازه)
function createActivity_switchTimeMode() {
  const mode = document.getElementById("createActivity_timeMode").value;
  const singleBox = document.getElementById("createActivity_singleTimeBox");
  const rangeBox = document.getElementById("createActivity_rangeTimeBox");

  if (mode === "single") {
    singleBox.style.display = "block";
    rangeBox.style.display = "none";
  } else {
    singleBox.style.display = "none";
    rangeBox.style.display = "block";
  }
//برای اعتبار سنجی
  createActivity_validateForm();
}

/* -------------------------------
   مدیریت اولویت
   ------------------------------- */

// انتخاب اولویت
function createActivity_selectPriority(el) {
  const circles = document.querySelectorAll('.priority-circles .circle');
  circles.forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');

  // ذخیره انتخاب
  createActivity_selectedPriority = el.classList[1]; // کلاس دوم مثل "low" یا "highest"
  localStorage.setItem("createActivity_selectedPriority", createActivity_selectedPriority);
  //برای اعتبار سنجی 
  createActivity_validateForm();
}

// بارگذاری پیش‌فرض اولویت از localStorage
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("createActivity_selectedPriority");
  const circles = document.querySelectorAll('.priority-circles .circle');

  if (saved) {
    circles.forEach(c => {
      if (c.classList.contains(saved)) {
        c.classList.add("selected");
      } else {
        c.classList.remove("selected");
      }
    });
  } else {
    const defaultCircle = document.querySelector('.priority-circles .circle.medium');
    if (defaultCircle) defaultCircle.classList.add("selected");
    createActivity_selectedPriority = "medium";
  }
});
/* -------------------------------
   مدیریت گالری آیکون ایجاد فعالیت
   ------------------------------- */

// باز کردن گالری آیکون
function createActivity_openIconGallery() {
  document.getElementById("createActivity_iconGalleryModal").classList.add("open");
  createActivity_selectedIcon = null;
  document.getElementById("createActivity_confirmIconBtn").disabled = true;
}

// بستن گالری آیکون
function createActivity_closeIconGallery() {
  document.getElementById("createActivity_iconGalleryModal").classList.remove("open");
  createActivity_selectedIcon = null;
  document.getElementById("createActivity_confirmIconBtn").disabled = true;
}

// انتخاب آیکون از گالری
function createActivity_selectIcon(img) {
  document.querySelectorAll("#createActivity_iconGalleryModal .icon-gallery img")
    .forEach(i => i.classList.remove("selected"));
  img.classList.add("selected");
  createActivity_selectedIcon = img.dataset.icon;
  document.getElementById("createActivity_confirmIconBtn").disabled = false;
}

// تأیید آیکون انتخاب‌شده
function createActivity_confirmIcon() {
  if (!createActivity_selectedIcon) {
    alert("لطفاً یک آیکون انتخاب کنید.");
    return;
  }
  document.getElementById("createActivity_iconPreview").src = createActivity_selectedIcon;
  createActivity_closeIconGallery();
 
  //برای اعتبار سنجی
  createActivity_validateForm();

}

/* -------------------------------
   مدیریت دکمه‌های مرحله سوم
   ------------------------------- */

// بستن مودال اصلی ایجاد فعالیت
function createActivity_closeModal() {
  const overlay = document.getElementById("newActivityModal");
  overlay.classList.remove("open");
  document.body.classList.remove("modal-open");
}

// بازگشت به مرحله دوم
function createActivity_goBackThree() {
  // تنظیم مرحله جاری به ۲
  currentStepCommon = 2;

  // مخفی کردن تنظیمات مرحله سوم
  const settingsThree = document.querySelector(".activity-settings-three");
  settingsThree.style.display = "none";

  // نمایش دوباره مرحله دوم با منطق کامل
  showStepTwo(currentStepCommon);
}



// ثبت نهایی فعالیت
function createActivity_finish() {
  // گرفتن داده‌ها از فیلدها
  const date = document.getElementById("createActivity_date").value;
  let timeInfo = "";

  const customTimeEnabled = document.getElementById("createActivity_customTimeToggle").checked;
  if (customTimeEnabled) {
    const mode = document.getElementById("createActivity_timeMode").value;
    if (mode === "single") {
      timeInfo = document.getElementById("createActivity_singleTime").value;
    } else {
      const start = document.getElementById("createActivity_rangeStart").value;
      const end = document.getElementById("createActivity_rangeEnd").value;
      timeInfo = `${start} تا ${end}`;
    }
  }

  const priority = createActivity_selectedPriority || "medium";
  const icon = createActivity_selectedIcon || "../shared/icons/placeholder.png";
  const ratingEnabled = document.getElementById("createActivity_ratingToggle").checked;

  // شبیه‌سازی ثبت فعالیت (در نسخه نهایی باید به پایگاه داده ارسال شود)
  alert(`فعالیت ایجاد شد:\n
  گروه: ${createActivity_selectedGroup}\n
  فعالیت: ${createActivity_selectedActivity}\n
  تاریخ: ${date}\n
  زمان: ${timeInfo}\n
  اولویت: ${priority}\n
  آیکون: ${icon}\n
  امتیازدهی فعال: ${ratingEnabled ? "بله" : "خیر"}`);

  // بستن مودال پس از ثبت
  createActivity_closeModal();
}

function createActivity_validateForm() {
  const date = document.getElementById("createActivity_date").value;

  // بررسی زمان
  const customTimeEnabled = document.getElementById("createActivity_customTimeToggle").checked;
  let timeValid = true;
  if (customTimeEnabled) {
    const mode = document.getElementById("createActivity_timeMode").value;
    if (mode === "single") {
      timeValid = !!document.getElementById("createActivity_singleTime").value;
    } else {
      const start = document.getElementById("createActivity_rangeStart").value;
      const end = document.getElementById("createActivity_rangeEnd").value;
      timeValid = !!start && !!end;
    }
  }

  // بررسی اولویت
  const priorityValid = !!createActivity_selectedPriority;

  // بررسی آیکون
  const iconSrc = document.getElementById("createActivity_iconPreview").src;
  const iconValid = iconSrc && !iconSrc.includes("placeholder.png");

  // بررسی نهایی
  const allValid = !!date && timeValid && priorityValid && iconValid;
  document.getElementById("createActivity_finishBtn").disabled = !allValid;
}

/* -------------------------------
   مدیریت بستن با کلیک روی پس‌زمینه یا کلید Escape
   ------------------------------- */
document.addEventListener("click", (e) => {
  const overlay = document.getElementById("createActivity_iconGalleryModal");
  if (!overlay.classList.contains("open")) return;
  const content = overlay.querySelector(".modal-content");
  if (e.target === overlay) {
    createActivity_closeIconGallery();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    createActivity_closeIconGallery();
    createActivity_closeModal();
  }
});
