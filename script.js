// ===============================
// 📊 COUNT CONTRIBUTORS FROM HTML
// ===============================

function getContributorCount() {
  return document.querySelectorAll("#wall .card").length;
}

// ===============================
// 🔢 COUNTER ANIMATION
// ===============================

function animateNumber(el, target) {
  if (!el) return;

  let start = parseInt(el.textContent) || 0;
  const duration = 600;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min(1, (now - startTime) / duration);

    const value = Math.round(
      start + (target - start) * (1 - Math.pow(1 - progress, 3)),
    );

    el.textContent = value;

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

// ===============================
// 📈 UPDATE STATS
// ===============================

function updateCounters() {
  const count = getContributorCount();

  const contribEl = document.getElementById("contribCount");
  const prEl = document.getElementById("prCount");

  animateNumber(contribEl, count);
  animateNumber(prEl, count);
}

// ===============================
// 🎉 MODAL
// ===============================

const modal = document.getElementById("modal");

function openModal(message) {
  const msg = document.getElementById("modalMsg");
  if (msg) msg.textContent = message;

  modal?.classList.add("show");
}

function closeModal() {
  modal?.classList.remove("show");
}

// modal events
document.getElementById("closeModal")?.addEventListener("click", closeModal);

modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ===============================
// 📋 LINKEDIN POST
// ===============================

const LINKEDIN_POST = `🚀 I just made my FIRST Open Source Pull Request!

Forked repo → edited index.html → submitted PR ✨

#FirstPR #OpenSource #GitHub #LearningInPublic`;

async function copyLinkedin() {
  try {
    await navigator.clipboard.writeText(LINKEDIN_POST);
    showToast("LinkedIn post copied 🚀");
  } catch {
    showToast("Copy failed — please copy manually");
  }
}

// ===============================
// 🍞 TOAST
// ===============================

const toast = document.getElementById("toast");

function showToast(msg) {
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

// ===============================
// 🔘 BUTTON EVENTS (your existing HTML buttons)
// ===============================

document
  .getElementById("copyLinkedinHero")
  ?.addEventListener("click", copyLinkedin);
document
  .getElementById("copyLinkedin")
  ?.addEventListener("click", copyLinkedin);
document
  .getElementById("shareLinkedin")
  ?.addEventListener("click", copyLinkedin);

// ===============================
// 🚀 INIT
// ===============================

window.addEventListener("load", () => {
  updateCounters();
});

const searchInput = document.getElementById("searchInput");

searchInput?.addEventListener("input", function () {
  const value = this.value.toLowerCase().trim();
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const name = card.querySelector(".card-name")?.textContent.toLowerCase();

    const match = name && name.includes(value);

    if (match) {
      card.style.display = "flex";
      card.style.opacity = "1";
      card.style.transform = "scale(1)";
    } else {
      card.style.opacity = "0.2";
      card.style.transform = "scale(0.95)";
    }
  });
});
