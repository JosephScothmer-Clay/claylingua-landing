document.addEventListener('DOMContentLoaded', function() {
  // Targets
  const targetStudents = 50;
  const targetTutors = 25;

  // Current signups
  const currentStudents = 1;
  const currentTutors = 0;

  // Calculations
  const totalTarget = targetStudents + targetTutors;
  const totalJoined = currentStudents + currentTutors;
  const totalRemaining = totalTarget - totalJoined;
  const percentage = Math.round((totalJoined / totalTarget) * 100);

  // Update DOM
  document.getElementById('joined').textContent =
    `${totalJoined} joined (${totalRemaining} spots left)`;

  const bar = document.getElementById('progress-bar');
  bar.style.width = percentage + '%';

  // Label inside bar
  document.getElementById('progress-label').textContent = percentage + '%';

  // Text below bar
  document.getElementById('progress-text').textContent =
    `${percentage}% of target reached`;
});
