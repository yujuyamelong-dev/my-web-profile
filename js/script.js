// 테마 토글 기능
function initTheme() {
  const themeIcon = document.getElementById('theme-icon');
  const isLight = document.documentElement.classList.contains('light');
  themeIcon.textContent = isLight ? '☀️' : '🌙';
}

function toggleTheme() {
  const html = document.documentElement;
  const isLight = html.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  document.getElementById('theme-icon').textContent = isLight ? '☀️' : '🌙';
}

// 테마 토글 버튼 이벤트 리스너
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// 페이지 로드 시 테마 초기화
initTheme();

// 이메일 복사 기능
const emailCopyBtn = document.getElementById('email-copy-btn');
if (emailCopyBtn) {
  emailCopyBtn.addEventListener('click', async () => {
    const email = 'yujuyamelong@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      const originalText = emailCopyBtn.textContent;
      emailCopyBtn.textContent = '✓ 복사되었습니다!';
      emailCopyBtn.classList.add('bg-green-600', 'border-green-400');
      emailCopyBtn.classList.remove('bg-gray-800', 'border-gray-700');

      setTimeout(() => {
        emailCopyBtn.textContent = originalText;
        emailCopyBtn.classList.remove('bg-green-600', 'border-green-400');
        emailCopyBtn.classList.add('bg-gray-800', 'border-gray-700');
      }, 2000);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
      emailCopyBtn.textContent = '✗ 복사 실패';
      setTimeout(() => {
        emailCopyBtn.textContent = '📧 이메일로 연락하기';
      }, 2000);
    }
  });
}

// 모바일 햄버거 메뉴 토글
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  // 햄버거 아이콘 애니메이션
  hamburger.classList.toggle('active');
});

// 모바일 메뉴 링크 클릭 시 메뉴 닫기
const menuLinks = mobileMenu.querySelectorAll('a');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    hamburger.classList.remove('active');
  });
});

// 스크롤 시 헤더 스타일 변경
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// 부드러운 스크롤 (앵커 링크)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    // 내부 링크일 때만 preventDefault
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Intersection Observer를 사용한 요소 페이드인 애니메이션
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// 섹션에 observer 적용
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(section);
});
