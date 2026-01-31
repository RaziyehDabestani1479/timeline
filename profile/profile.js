// متغیرهای عمومی
const imageUpload = document.getElementById("imageUpload");
const profileImage = document.getElementById("profileImage");
const saveChanges = document.getElementById("saveChanges");
const bio = document.getElementById("bio");

let changesMade = false;

// تابع فعال‌سازی دکمه کلی
function activateSave() {
  changesMade = true;
  saveChanges.disabled = false;
}

// -------------------- تصویر کاربری --------------------
imageUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.src = e.target.result;
      activateSave();
    };
    reader.readAsDataURL(file);
  } else {
    alert("لطفاً یک فایل تصویری معتبر انتخاب کنید.");
  }
});

// -------------------- نام کاربری --------------------
const editUsername = document.getElementById("editUsername");
const usernameModal = document.getElementById("usernameModal");
const closeUsername = document.getElementById("closeUsername");
const saveUsername = document.getElementById("saveUsername");
const newUsername = document.getElementById("newUsername");
const usernameField = document.getElementById("username");

editUsername.addEventListener("click", () => usernameModal.classList.add("active"));
closeUsername.addEventListener("click", () => usernameModal.classList.remove("active"));

newUsername.addEventListener("input", () => {
  saveUsername.disabled = (newUsername.value.trim() === "" || newUsername.value === usernameField.value);
});

saveUsername.addEventListener("click", () => {
  usernameField.value = newUsername.value;
  usernameModal.classList.remove("active");
  saveUsername.disabled = true;
  activateSave();
});

// -------------------- رمز عبور --------------------
const editPassword = document.getElementById("editPassword");
const passwordModal = document.getElementById("passwordModal");
const closePassword = document.getElementById("closePassword");
const savePassword = document.getElementById("savePassword");
const newPassword = document.getElementById("newPassword");
const repeatPassword = document.getElementById("repeatPassword");
const passwordError = document.getElementById("passwordError");
const repeatError = document.getElementById("repeatError");

editPassword.addEventListener("click", () => passwordModal.classList.add("active"));
closePassword.addEventListener("click", () => passwordModal.classList.remove("active"));

function validatePasswords() {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8}$/;
  let valid = true;

  if (!regex.test(newPassword.value)) {
    passwordError.textContent = "رمز عبور باید ۸ کاراکتر و شامل عدد و حروف بزرگ و کوچک باشد.";
    valid = false;
  } else {
    passwordError.textContent = "";
  }

  if (repeatPassword.value !== newPassword.value) {
    repeatError.textContent = "تکرار رمز عبور باید برابر باشد.";
    valid = false;
  } else {
    repeatError.textContent = "";
  }

  savePassword.disabled = !valid;
}

newPassword.addEventListener("input", validatePasswords);
repeatPassword.addEventListener("input", validatePasswords);

savePassword.addEventListener("click", () => {
  alert("رمز عبور تغییر یافت!");
  passwordModal.classList.remove("active");
  savePassword.disabled = true;
  activateSave();
});

// نمایش/مخفی کردن رمز
document.querySelectorAll(".toggle-eye").forEach(icon => {
  icon.addEventListener("click", () => {
    const target = document.getElementById(icon.dataset.target);
    const eyeIcon = icon.querySelector("i");
    if (target.type === "password") {
      target.type = "text";
      eyeIcon.classList.replace("bi-eye-slash", "bi-eye");
    } else {
      target.type = "password";
      eyeIcon.classList.replace("bi-eye", "bi-eye-slash");
    }
  });
});

// -------------------- بخش شرح --------------------
bio.addEventListener("input", () => {
  if (bio.value.trim() !== "" && bio.value.trim() !== "بیوگرافی و اهداف من !") {
    activateSave();
  }
});

// -------------------- دکمه کلی ثبت تغییرات --------------------
saveChanges.addEventListener("click", () => {
  if (changesMade) {
    alert("همه تغییرات ذخیره شد!");
    changesMade = false;
    saveChanges.disabled = true;
  }
});