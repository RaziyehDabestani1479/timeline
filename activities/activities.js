// ===============================
// ابزارهای کمکی و نرمال‌سازی متن فارسی
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // تابع نرمال‌سازی متن فارسی (برای جستجو)
  const norm = (s) =>
    (s || "")
      .trim()
      .toLowerCase()
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/\u200c/g, ""); // حذف نیم‌فاصله

  // گرفتن همه گروه‌ها
  const groups = () => document.querySelectorAll("#groupList .group-box");

  // ===============================
  // حذف گروه‌های انتخاب‌شده
  // ===============================
  const deleteBtn = document.getElementById("deleteGroupsBtn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      const checked = document.querySelectorAll("#groupList input[type='checkbox']:checked");
      if (checked.length === 0) {
        alert("هیچ گروهی انتخاب نشده است!");
        return;
      }
      checked.forEach((chk) => chk.closest(".group-box")?.remove());
      alert("گروه‌های انتخاب‌شده حذف شدند.");
    });
  }

  // ===============================
  // عناصر جستجو
  // ===============================
  const nameInput = document.getElementById("searchGroupInput");
  const nameBtn   = document.getElementById("searchGroupBtn");
  const actInput  = document.getElementById("searchActivityInput");
  const actBtn    = document.getElementById("searchActivityBtn");

  // ===============================
  // جستجو بر اساس نام گروه
  // ===============================
  const runNameSearch = () => {
    const q = norm(nameInput.value);
    let found = false;

    groups().forEach((group) => {
      const nameText = norm(group.querySelector(".fw-bold")?.textContent || "");
      const match = q !== "" && nameText.includes(q);
      group.classList.toggle("d-none", !match);
      if (match) found = true;
    });

    if (!found && q !== "") {
      alert("هیچ گروهی با این نام پیدا نشد!");
    }
    if (q === "") {
      groups().forEach((g) => g.classList.remove("d-none"));
    }
  };

  // ===============================
  // جستجو بر اساس فعالیت‌های زیرمجموعه
  // ===============================
  const runActivitySearch = () => {
    const q = norm(actInput.value);
    let found = false;

    groups().forEach((group) => {
      const activities = group.querySelectorAll(".activities li");
      let match = false;

      activities.forEach((act) => {
        const text = norm(act.textContent);
        if (q !== "" && text.includes(q)) {
          match = true;
        }
      });

      group.classList.toggle("d-none", !match);
      if (match) found = true;
    });

    if (!found && q !== "") {
      alert("هیچ گروهی با این فعالیت پیدا نشد!");
    }
    if (q === "") {
      groups().forEach((g) => g.classList.remove("d-none"));
    }
  };

  // اتصال رویدادها به دکمه‌ها و ورودی‌ها
  if (nameBtn && nameInput) {
    nameBtn.addEventListener("click", runNameSearch);
    nameInput.addEventListener("keydown", (e) => { if (e.key === "Enter") runNameSearch(); });
  }
  if (actBtn && actInput) {
    actBtn.addEventListener("click", runActivitySearch);
    actInput.addEventListener("keydown", (e) => { if (e.key === "Enter") runActivitySearch(); });
  }

  // حالت اولیه → همه گروه‌ها نمایش داده شوند
  groups().forEach((g) => g.classList.remove("d-none"));
});

// ===============================
// مدیریت پنجره انتخاب فعالیت‌ها
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("activityModal");
  const closeBtn = document.getElementById("closeActivityModal");
  const confirmBtn = document.getElementById("confirmActivity");
  const createBtn = document.getElementById("createNewActivity");
  const activityBoxes = document.querySelectorAll(".activity-box");

  let selectedActivity = null;

  // نمایش پنجره با کلیک روی دکمه "فعالیت‌ها"
  document.querySelectorAll(".btn-primary").forEach(btn => {
    if (btn.textContent.includes("فعالیت‌ها")) {
      btn.addEventListener("click", () => {
        modal.classList.remove("d-none");
      });
    }
  });



  // بستن پنجره
  closeBtn.addEventListener("click", () => {
    modal.classList.add("d-none");
    confirmBtn.disabled = true;
    activityBoxes.forEach(b => b.classList.remove("selected"));
    selectedActivity = null;
  });


const deleteBtn = document.getElementById("deleteSelectedActivities");
if (deleteBtn) {
  deleteBtn.addEventListener("click", () => {
    const selectedCheckboxes = document.querySelectorAll("#activityModal .activity-box input[type='checkbox']:checked");
    if (selectedCheckboxes.length === 0) {
      alert("هیچ فعالیتی انتخاب نشده است!");
      return;
    }
    selectedCheckboxes.forEach(cb => cb.closest(".activity-box")?.remove());
    alert("فعالیت‌های انتخاب‌شده حذف شدند.");
  });
}




  // ایجاد فعالیت جدید → رفتن به بخش دیگر
  createBtn.addEventListener("click", () => {
    console.log("رفتن به بخش ایجاد فعالیت جدید");
    // اینجا می‌توانی به صفحه ساخت فعالیت هدایت کنی
  });
});

// ===============================
// متغیرهای عمومی برای ایجاد فعالیت
// ===============================
let createActivity_selectedPriority = null; // اولویت انتخاب‌شده
let createActivity_selectedIcon = null;     // آیکون انتخاب‌شده

// ===============================
// اتصال بین دو پنجره فعالیت‌ها
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const activityModal = document.getElementById("activityModal");      // پنجره لیست فعالیت‌ها
  const newActivityModal = document.getElementById("newActivityModal"); // پنجره ایجاد فعالیت جدید
  const createNewActivityBtn = document.getElementById("createNewActivity"); // دکمه "ایجاد فعالیت جدید"

  // باز کردن پنجره ایجاد فعالیت جدید و بستن پنجره لیست فعالیت‌ها
  if (createNewActivityBtn) {
    createNewActivityBtn.addEventListener("click", () => {
      activityModal.classList.add("d-none");      
      newActivityModal.classList.remove("d-none"); 

      // پاک کردن فرم
      document.getElementById("createActivity_activityName").value = "";
      document.getElementById("createActivity_date").value = "";
      document.getElementById("createActivity_iconPreview").src = "../shared/icons/placeholder.png";
      document.getElementById("createActivity_finishBtn").disabled = true;
    });
  }
});

// ===============================
// مدیریت زمان اختصاصی
// ===============================
function createActivity_toggleTimeFields() {
  const toggle = document.getElementById("createActivity_customTimeToggle");
  const fields = document.getElementById("createActivity_timeFields");
  fields.style.display = toggle.checked ? "block" : "none";
  createActivity_validateForm();
}

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
  createActivity_validateForm();
}

// ===============================
// مدیریت اولویت
// ===============================
function createActivity_selectPriority(el) {
  const circles = document.querySelectorAll('.priority-circles .circle');
  circles.forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');

  // کلاس دوم مثل "low" یا "highest" ذخیره می‌شود
  createActivity_selectedPriority = el.classList[1];
  createActivity_validateForm();
}

// ===============================
// مدیریت گالری آیکون
// ===============================

// باز کردن گالری آیکون
function createActivity_openIconGallery() {
  const modal = document.getElementById("createActivity_iconGalleryModal");
  modal.classList.remove("d-none");   // نمایش پنجره
  modal.classList.add("open");        // حالت فعال
  createActivity_selectedIcon = null; // پاک کردن انتخاب قبلی
  document.getElementById("createActivity_confirmIconBtn").disabled = true;
}

// بستن گالری آیکون
function createActivity_closeIconGallery() {
  const modal = document.getElementById("createActivity_iconGalleryModal");
  modal.classList.add("d-none");      // مخفی کردن پنجره
  modal.classList.remove("open");     // حذف حالت فعال
  createActivity_selectedIcon = null;
  document.getElementById("createActivity_confirmIconBtn").disabled = true;
}

// انتخاب آیکون از گالری
function createActivity_selectIcon(img) {
  document.querySelectorAll(".icon-gallery img")
    .forEach(i => i.classList.remove("selected"));
  img.classList.add("selected");
  createActivity_selectedIcon = img.dataset.icon; // ذخیره مسیر آیکون انتخابی
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
  createActivity_validateForm(); // بررسی اعتبار فرم پس از انتخاب آیکون
}

// ===============================
// مدیریت دکمه‌ها در ایجاد فعالیت
// ===============================

// بستن کامل صفحه ایجاد فعالیت (بازگشت به صفحه اصلی)
function createActivity_closeModal() {
  const newActivityModal = document.getElementById("newActivityModal");
  newActivityModal.classList.add("d-none");
}

// بازگشت به پنجره قبلی: لیست فعالیت‌ها
function createActivity_goBack() {
  const activityModal = document.getElementById("activityModal");
  const newActivityModal = document.getElementById("newActivityModal");
  newActivityModal.classList.add("d-none");
  activityModal.classList.remove("d-none");
}

// ثبت نهایی فعالیت
function createActivity_finish() {
  const activityName = document.getElementById("createActivity_activityName").value.trim();
  const date = document.getElementById("createActivity_date").value;
  let timeInfo = "";

  // بررسی زمان اختصاصی
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

  // مقدار پیش‌فرض اولویت و آیکون
  const priority = createActivity_selectedPriority || "medium";
  const icon = createActivity_selectedIcon || "../shared/icons/placeholder.png";
  const ratingEnabled = document.getElementById("createActivity_ratingToggle").checked;

  // شبیه‌سازی ثبت فعالیت (در نسخه نهایی باید به پایگاه داده ارسال شود)
  alert(`فعالیت ایجاد شد:
نام فعالیت: ${activityName}
تاریخ: ${date}
زمان: ${timeInfo}
اولویت: ${priority}
آیکون: ${icon}
امتیازدهی فعال: ${ratingEnabled ? "بله" : "خیر"}`);

  // بستن پنجره پس از ثبت
  createActivity_closeModal();
}

// ===============================
// اعتبارسنجی فرم ایجاد فعالیت
// ===============================
function createActivity_validateForm() {
  const name = document.getElementById("createActivity_activityName").value.trim();
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
  const allValid = !!name && !!date && timeValid && priorityValid && iconValid;
  document.getElementById("createActivity_finishBtn").disabled = !allValid;
}

// ===============================
// مدیریت بستن با کلیک روی پس‌زمینه یا کلید Escape
// ===============================
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

// ===============================
// مدیریت بخش ویرایش گروه (نسخه ساده‌شده)
// ===============================
let editGroup_originalName = "";
let editGroup_originalDescription = "";
let editGroup_hasChanges = false;

// باز کردن پنجره ویرایش با اطلاعات اولیه
function editGroup_openModal(groupName, groupDescription) {
  document.getElementById("editGroupModal").classList.remove("d-none");

  // مقداردهی اولیه
  document.getElementById("editGroup_name").value = groupName;
  document.getElementById("editGroup_description").value = groupDescription;
  editGroup_originalName = groupName;
  editGroup_originalDescription = groupDescription;

  // ریست دکمه‌ها
  document.getElementById("editGroup_submitBtn").disabled = true;
  editGroup_hasChanges = false;
}

// بررسی تغییرات (فقط نام و توضیحات)
function editGroup_checkChanges() {
  const name = document.getElementById("editGroup_name").value.trim();
  const desc = document.getElementById("editGroup_description").value.trim();

  const changed =
    (name !== editGroup_originalName) ||
    (desc !== editGroup_originalDescription);

  editGroup_hasChanges = changed;
  document.getElementById("editGroup_submitBtn").disabled = !changed;
}

// بستن پنجره ویرایش
function editGroup_closeModal() {
  document.getElementById("editGroupModal").classList.add("d-none");
}

// ثبت تغییرات
function editGroup_submitChanges() {
  if (!editGroup_hasChanges) return;
  const name = document.getElementById("editGroup_name").value.trim();
  const desc = document.getElementById("editGroup_description").value.trim();

  alert(`تغییرات ثبت شد:
نام جدید: ${name}
توضیحات: ${desc}`);

  editGroup_closeModal();
}
// ===============================
// مدیریت ایجاد گروه جدید
// ===============================

// باز کردن پنجره ایجاد گروه و ریست کردن فیلدها
function openCreateGroupModal() {
  document.getElementById("createGroupModal").classList.remove("d-none");
  document.getElementById("newGroup_name").value = "";
  document.getElementById("newGroup_description").value = "";
  const modalCreateBtn = document.querySelector("#createGroupModal #createGroupBtn");
  if (modalCreateBtn) modalCreateBtn.disabled = true;
}

// بستن پنجره ایجاد گروه
function closeCreateGroupModal() {
  document.getElementById("createGroupModal").classList.add("d-none");
}

// بررسی پر بودن هر دو فیلد برای فعال‌سازی دکمه ایجاد گروه
function checkCreateGroupFields() {
  const name = document.getElementById("newGroup_name").value.trim();
  const desc = document.getElementById("newGroup_description").value.trim();
  const modalCreateBtn = document.querySelector("#createGroupModal #createGroupBtn");
  if (modalCreateBtn) modalCreateBtn.disabled = !(name && desc);
}

// ساخت گروه جدید با اطلاعات واردشده توسط کاربر
function createGroup() {
  const name = document.getElementById("newGroup_name").value.trim();
  const desc = document.getElementById("newGroup_description").value.trim();

  // ساخت شیء گروه جدید با پوشه آبی و بدون فعالیت
  const newGroup = {
    name: name,
    description: desc,
    icon: "../shared/icons/folder-blue.png", // مسیر آیکون پوشه آبی
    activities: [] // گروه بدون فعالیت اولیه
  };

  // نمایش یا ذخیره‌سازی گروه جدید (در نسخه نهایی باید به DOM یا دیتابیس اضافه شود)
  console.log("گروه جدید ایجاد شد:", newGroup);
  alert(`گروه «${name}» با موفقیت ایجاد شد.`);

  // بستن پنجره پس از ایجاد
  closeCreateGroupModal();

  // در صورت نیاز: افزودن گروه به لیست DOM
  // این بخش اختیاری است و بستگی دارد بخواهی گروه‌ها را در صفحه نشان دهی یا نه
  const groupList = document.getElementById("groupList");
  if (groupList) {
    const box = document.createElement("div");
    box.className = "group-box user-group p-3 shadow-sm rounded";
    box.innerHTML = `
      <div class="group-actions d-flex gap-2">
        <button class="btn btn-outline-secondary btn-sm">
          <i class="bi bi-pencil"></i> ویرایش
        </button>
        <button class="btn btn-primary btn-sm">
          <i class="bi bi-list-task"></i> فعالیت‌ها
        </button>
      </div>
      <div class="group-info d-flex align-items-center gap-2">
        <input type="checkbox" class="form-check-input">
        <i class="bi bi-folder-fill group-icon"></i>
        <div>
          <div class="fw-bold">${newGroup.name}</div>
          <small class="text-muted">${newGroup.description}</small>
        </div>
      </div>
      <ul class="activities ps-4 mb-2"></ul>
    `;
    groupList.appendChild(box);
  }
}