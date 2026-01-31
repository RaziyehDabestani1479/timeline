// notes.js
// منطق کامل صفحه یادداشت‌ها با کامنت‌گذاری خط به خط

// -----------------------------
// داده‌های نمونه (ماک)
// -----------------------------
let notes = [
  {
    note_id: 1,
    user_id: 7,
    color_id: 1,
    title: "برنامه سه‌شنبه",
    created_date: "2025-12-23T00:30:00Z",
    text: "مرور وظایف و اولویت‌ها برای روز سه‌شنبه و آماده‌سازی گزارش هفتگی"
  },
  {
    note_id: 2,
    user_id: 7,
    color_id: 3,
    title: "ایده‌ها",
    created_date: "2025-12-22T21:10:00Z",
    text: "ایده طراحی داشبورد فانتزی با گرادیان و سایه‌های نرم برای گزارش‌ها"
  }
];

// -----------------------------
// نگاشت رنگ‌ها بر اساس color_id (۲۰ رنگ + پیش‌فرض سبز)
// -----------------------------
const colorMap = {
  0: "#ffffff", // سفید
  1: "#f8d7da", // قرمز ملایم
  2: "#d1ecf1", // آبی ملایم
  3: "#d4edda", // سبز ملایم (پیش‌فرض)
  4: "#fff3cd", // زرد ملایم
  5: "#e2e3e5", // خاکستری
  6: "#fde2e4", // صورتی روشن
  7: "#cce2cb", // سبز نعناعی
  8: "#b5ead7", // فیروزه‌ای
  9: "#ffdac1", // هلویی
  10: "#e0bbe4", // بنفش روشن
  11: "#957dad", // بنفش تیره
  12: "#d291bc", // صورتی بنفش
  13: "#fec8d8", // صورتی پاستلی
  14: "#ffdfd3", // کرم صورتی
  15: "#cde7be", // سبز روشن
  16: "#a0ced9", // آبی خاکستری
  17: "#d5cabd", // بژ
  18: "#f7dad9", // صورتی خاکستری
  19: "#e2f0cb", // سبز لیمویی
  20: "#c9bbcf"  // یاسی
};

// -----------------------------
// تابع کوتاه‌سازی متن یادداشت
// -----------------------------
function truncateText(text, limit = 50) {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
}

// -----------------------------
// رندر لیست یادداشت‌ها
// -----------------------------
function renderNotes(filter = "") {
  const list = document.getElementById("notesList");
  list.innerHTML = ""; // پاک کردن محتوای قبلی
  list.className = "notes-list";

  notes
    .filter(n =>
      n.title.includes(filter) || (n.text && n.text.includes(filter))
    )
    .forEach(note => {
      // ساخت کارت یادداشت
      const card = document.createElement("div");
      card.className = "note-card p-3 mb-3";
      card.style.backgroundColor = colorMap[note.color_id] || "#fff";

      // ردیف بالای کارت: چک‌باکس + دکمه ویرایش
      const topRow = document.createElement("div");
      topRow.className = "d-flex justify-content-between align-items-start";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "form-check-input mt-1 select-note";
      checkbox.dataset.id = note.note_id;

      const editBtn = document.createElement("button");
      editBtn.className = "btn btn-sm btn-outline-secondary edit-note";
      editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
      editBtn.onclick = e => {
        e.stopPropagation();
        openEditNote(note); // باز کردن فرم ویرایش
      };

      topRow.appendChild(checkbox);
      topRow.appendChild(editBtn);

      const title = document.createElement("h5");
      title.className = "fw-bold";
      title.textContent = note.title;

      const text = document.createElement("p");
      text.className = "text-muted";
      text.textContent = truncateText(note.text || "");

      const date = document.createElement("small");
      date.className = "text-secondary d-block mt-1";
      date.textContent = "تاریخ: " + new Date(note.created_date).toLocaleDateString("fa-IR");

      // کلیک روی کارت → نمایش یادداشت در صفحه وسط‌چین
      card.onclick = e => {
        if (!e.target.classList.contains("form-check-input") &&
            !e.target.classList.contains("edit-note")) {
          openViewNote(note);
        }
      };

      card.appendChild(topRow);
      card.appendChild(title);
      card.appendChild(text);
      card.appendChild(date);

      list.appendChild(card);
    });
}

// -----------------------------
// حذف یادداشت‌های انتخاب‌شده
// -----------------------------
function deleteSelectedNotes() {
  const selected = Array.from(document.querySelectorAll(".select-note:checked"))
    .map(cb => parseInt(cb.dataset.id)); // گرفتن ID یادداشت‌های انتخاب‌شده
  notes = notes.filter(n => !selected.includes(n.note_id)); // حذف از آرایه
  renderNotes(); // رندر دوباره لیست
}

// -----------------------------
// نمایش یادداشت در صفحه وسط‌چین
// -----------------------------
function openViewNote(note) {
  // عنوان و متن یادداشت
  document.getElementById("viewNoteTitle").textContent = note.title;
  document.getElementById("viewNoteText").textContent = note.text;

  // رنگ پس‌زمینه کل صفحه شناور (سکشن بیرونی) → رنگ یادداشت
 

  // رنگ باکس داخلی → سفید برای خوانایی بهتر
  document.getElementById("viewNoteBox").style.backgroundColor = "#ffffff";

  // رنگ اسکرول‌بار هماهنگ با رنگ یادداشت
  document.getElementById("viewNoteContent").style.setProperty("--note-scroll-color", colorMap[note.color_id]);

  // نمایش سکشن
  document.getElementById("viewNoteSection").classList.remove("d-none");

  document.getElementById("viewNoteBox").style.setProperty("--note-halo-color", colorMap[note.color_id]);
  document.getElementById("viewNoteSection").style.setProperty("--note-halo-color", colorMap[note.color_id]);
}

// -----------------------------
// بستن صفحه نمایش یادداشت
// -----------------------------
function closeViewNote() {
  document.getElementById("viewNoteSection").classList.add("d-none");
}

// -----------------------------
// نمایش فرم ایجاد یادداشت داخل صفحه
// -----------------------------
function openCreateNoteSection() {
  document.getElementById("createNoteSection").classList.remove("d-none");

  // پاک‌سازی و مقداردهی اولیه فرم
  document.getElementById("newNoteTitle").value = "";
  document.getElementById("newNoteText").value = "";
  document.getElementById("noteColor").value = "3"; // رنگ سبز پیش‌فرض
  document.getElementById("saveCreateNote").disabled = true;
}

// -----------------------------
// بستن فرم ایجاد یادداشت
// -----------------------------
function closeCreateNoteSection() {
  document.getElementById("createNoteSection").classList.add("d-none");
  document.getElementById("newNoteTitle").value = "";
  document.getElementById("newNoteText").value = "";
  document.getElementById("noteColor").value = "3"; // بازگشت به سبز
  document.getElementById("saveCreateNote").disabled = true;
}

// -----------------------------
// ذخیره یادداشت جدید از فرم داخل صفحه
// -----------------------------
function saveNewNote() {
  const title = document.getElementById("newNoteTitle").value.trim();
  const text = document.getElementById("newNoteText").value.trim();
  const color = parseInt(document.getElementById("noteColor").value) || 3;

  if (!title) {
    alert("لطفاً تیتر یادداشت را وارد کنید.");
    return;
  }

  const newNote = {
    note_id: Date.now(),
    user_id: 7,
    color_id: color,
    title: title,
    created_date: new Date().toISOString(),
    text: text
  };

  notes.push(newNote);
  renderNotes();

  // پاک‌سازی فرم و بستن
  closeCreateNoteSection();
}

// -----------------------------
// ویرایش یادداشت‌ها
// -----------------------------
let editingNoteId = null; // یادداشت در حال ویرایش

function openEditNote(note) {
  editingNoteId = note.note_id;
  document.getElementById("editNoteTitle").value = note.title;
  document.getElementById("editNoteText").value = note.text;
  document.getElementById("editNoteColor").value = note.color_id.toString();
  document.getElementById("editNoteSection").classList.remove("d-none");
}

function closeEditNote() {
  editingNoteId = null;
  document.getElementById("editNoteSection").classList.add("d-none");
}

function saveEditNote() {
  const title = document.getElementById("editNoteTitle").value.trim();
  const text = document.getElementById("editNoteText").value.trim();
  const color = parseInt(document.getElementById("editNoteColor").value) || 3;

  if (!title) {
    alert("لطفاً تیتر یادداشت را وارد کنید.");
    return;
  }

  const note = notes.find(n => n.note_id === editingNoteId);
  if (note) {
    note.title = title;
    note.text = text;
    note.color_id = color;
    renderNotes();
  }

  closeEditNote();
}

// -----------------------------
// اتصال رویدادها پس از بارگذاری صفحه
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderNotes(); // نمایش اولیه یادداشت‌ها

  // دکمه ایجاد یادداشت → نمایش فرم
  document.querySelector(".btn-success").addEventListener("click", openCreateNoteSection);

  // دکمه بستن فرم ایجاد
  document.getElementById("closeCreateNote").addEventListener("click", closeCreateNoteSection);

  // دکمه ذخیره یادداشت
  document.getElementById("saveCreateNote").addEventListener("click", saveNewNote);

  // فعال‌سازی دکمه ذخیره فقط وقتی تیتر وارد شده
  document.getElementById("newNoteTitle").addEventListener("input", e => {
    document.getElementById("saveCreateNote").disabled = !e.target.value.trim();
  });

  // دکمه حذف انتخاب‌شده‌ها
  document.getElementById("deleteSelected").addEventListener("click", deleteSelectedNotes);

  // بخش جستجو
  document.getElementById("searchNotes").addEventListener("input", e => {
    renderNotes(e.target.value.trim());
  });

  // اتصال رویدادهای فرم ویرایش
  document.getElementById("closeEditNote").addEventListener("click", closeEditNote);
  document.getElementById("saveEditNote").addEventListener("click", saveEditNote);

  // اتصال رویدادهای صفحه نمایش یادداشت
  document.getElementById("closeViewNote").addEventListener("click", closeViewNote);
});