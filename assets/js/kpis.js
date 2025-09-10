document.addEventListener('DOMContentLoaded', function() {
  const targetStudents = 50;
  const targetTutors = 25;

  const currentStudents = 2;
  const currentTutors = 1;

  const totalTarget = targetStudents + targetTutors;
  const totalJoined = currentStudents + currentTutors;
  const totalRemaining = totalTarget - totalJoined;
  const percentage = Math.round((totalJoined / totalTarget) * 100);

  function t(key, vars = {}) {
    let keys = key.split(".");
    let value = window.translations;
    keys.forEach(k => value = value?.[k]);
    if (!value) return key;

    return value.replace(/\{(\w+)\}/g, (_, v) => vars[v] ?? "");
  }

  document.getElementById('joined').textContent =
    t("kpi.joined_text", { joined: totalJoined, remaining: totalRemaining });

  const bar = document.getElementById('progress-bar');
  bar.style.width = percentage + '%';

  document.getElementById('progress-label').textContent = percentage + '%';

  document.getElementById('progress-text').textContent =
    t("kpi.progress_text", { percent: percentage });
});
