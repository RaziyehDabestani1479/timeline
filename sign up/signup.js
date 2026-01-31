document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    
    // مدیریت نمایش/مخفی کردن رمز عبور
    togglePasswordBtn.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePasswordBtn.textContent = '👁';
        } else {
            passwordInput.type = 'password';
            togglePasswordBtn.textContent = '👁️';
        }
    });
    
    // اعتبارسنجی فرم
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // بررسی تطابق رمزهای عبور
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('رمزهای عبور وارد شده مطابقت ندارند!');
            passwordInput.focus();
            return;
        }
        
        // بررسی قبول قوانین
        const termsCheckbox = document.getElementById('terms');
        if (!termsCheckbox.checked) {
            alert('لطفاً قوانین و مقررات را بپذیرید.');
            return;
        }
        
        // در اینجا می‌توانید اطلاعات را به سرور ارسال کنید
        alert('ثبت نام با موفقیت انجام شد!');
        form.reset();
    });
    
    // افزودن انیمیشن به حباب‌های پس‌زمینه
    const bubbles = document.querySelectorAll('.bubble');
    
    bubbles.forEach(bubble => {
        // موقعیت تصادفی برای حباب‌ها
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        const randomDelay = Math.random() * 5;
        
        // انیمیشن شناور
        bubble.style.animation = `
            float ${15 + randomDelay}s ease-in-out infinite,
            fade ${20 + randomDelay}s ease-in-out infinite
        `;
        
        // حرکت دادن حباب‌ها با ماوس
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            bubble.style.transform = `translate(${x * randomX}px, ${y * randomY}px)`;
        });
    });
    
    // حل مشکل اسکرول در موبایل هنگام فوکوس روی input
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            // برای جلوگیری از مشکلات اسکرول در iOS
            document.body.classList.add('fixed-position');
        });
        
        input.addEventListener('blur', function() {
            // بازگرداندن حالت عادی پس از فوکوس
            setTimeout(function() {
                document.body.classList.remove('fixed-position');
            }, 100);
        });
    });
});

// انیمیشن‌های CSS برای حباب‌ها (اضافه شده از طریق JS)
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(5deg);
        }
    }
    
    @keyframes fade {
        0%, 100% {
            opacity: 0.7;
        }
        50% {
            opacity: 0.9;
        }
    }
    
    .fixed-position {
        position: fixed;
        width: 100%;
    }
`;
document.head.appendChild(style);
