document.addEventListener("DOMContentLoaded", () => {
  const roleButtons = document.querySelectorAll(".role-btn");
  const roleField = document.getElementById("role-field");

  roleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      roleButtons.forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");

      roleField.value = btn.dataset.role;
    });
  });
});