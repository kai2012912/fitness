// Sample fitness plan for 30 days
const fitnessPlan = [
  "Day 1: 20 Push-ups, 30 Squats, 1-minute Plank",
  "Day 2: 30 Push-ups, 40 Squats, 2-minute Plank",
  "Day 3: 20 Jumping Jacks, 30 Crunches, 1-minute Plank",
  "Day 4: Rest Day",
  "Day 5: 40 Push-ups, 50 Squats, 1-minute Plank",
  "Day 6: 30 Push-ups, 30 Lunges, 2-minute Plank",
  "Day 7: 20 Burpees, 30 Mountain Climbers, 1-minute Plank",
  "Day 8: Rest Day",
  "Day 9: 40 Push-ups, 40 Squats, 2-minute Plank",
  "Day 10: 20 Jumping Jacks, 40 Crunches, 1-minute Plank",
  "Day 11: 30 Push-ups, 50 Squats, 1-minute Plank",
  "Day 12: Rest Day",
  "Day 13: 50 Push-ups, 60 Squats, 2-minute Plank",
  "Day 14: 30 Push-ups, 30 Lunges, 1-minute Plank",
  "Day 15: 40 Jumping Jacks, 40 Mountain Climbers, 1-minute Plank",
  "Day 16: Rest Day",
  "Day 17: 50 Push-ups, 50 Squats, 3-minute Plank",
  "Day 18: 30 Push-ups, 40 Lunges, 2-minute Plank",
  "Day 19: 40 Burpees, 40 Crunches, 1-minute Plank",
  "Day 20: Rest Day",
  "Day 21: 60 Push-ups, 70 Squats, 3-minute Plank",
  "Day 22: 40 Push-ups, 50 Lunges, 2-minute Plank",
  "Day 23: 50 Jumping Jacks, 40 Mountain Climbers, 1-minute Plank",
  "Day 24: Rest Day",
  "Day 25: 70 Push-ups, 80 Squats, 3-minute Plank",
  "Day 26: 40 Push-ups, 50 Crunches, 2-minute Plank",
  "Day 27: 60 Burpees, 60 Squats, 1-minute Plank",
  "Day 28: Rest Day",
  "Day 29: 100 Push-ups, 100 Squats, 5-minute Plank",
  "Day 30: 150 Push-ups, 150 Squats, 5-minute Plank",
];

let currentDay = 1;
let exercises = [];
let currentExerciseIndex = 0;
let timer = null;
let isPaused = false;
let remainingTime = 0;

// Function to parse exercises for the day
function parseExercises(dayPlan) {
  exercises = dayPlan.split(',').map(ex => ex.trim());
  currentExerciseIndex = 0;
  showNextExercise();
}

// Function to show the current exercise
function showNextExercise() {
  const contentDiv = document.getElementById("day-content");

  if (currentExerciseIndex < exercises.length) {
      const exercise = exercises[currentExerciseIndex];
      contentDiv.innerHTML = `<h2>${exercise}</h2>`;
      
      // Check if the exercise has a timer
      const timeMatch = exercise.match(/(\d{2}:\d{2})/);
      if (timeMatch) {
          startTimer(timeMatch[1]);
      } else {
          stopTimer(); // No timer needed for this exercise
      }
  } else {
      contentDiv.innerHTML = `<h2>You've completed all exercises for Day ${currentDay}!</h2>`;
      stopTimer();
  }
}

// Function to show the fitness plan for a specific day
function showDay(dayNumber) {
  if (dayNumber >= 1 && dayNumber <= 30) {
      currentDay = dayNumber;
      const dayPlan = fitnessPlan[dayNumber - 1];
      document.getElementById("day-content").innerHTML = `<h2>${dayPlan}</h2>`;
      parseExercises(dayPlan);
  } else {
      document.getElementById("day-content").innerHTML = "<h2>Choose a day from 1 to 30!</h2>";
  }
}

// Function to change day dynamically based on button clicks
function changeDay(dayNumber) {
  stopTimer();
  showDay(dayNumber);
}

// Timer functionality
function startTimer(duration) {
  const totalSeconds = durationToSeconds(duration);
  remainingTime = remainingTime || totalSeconds;
  isPaused = false;

  updateTimerDisplay(remainingTime);
  clearInterval(timer);
  timer = setInterval(() => {
      if (!isPaused) {
          remainingTime--;
          updateTimerDisplay(remainingTime);
          if (remainingTime <= 0) {
              clearInterval(timer);
              currentExerciseIndex++;
              showNextExercise();
          }
      }
  }, 1000);
}

function updateTimerDisplay(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.getElementById("timer-display").innerText = `Remaining Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
  remainingTime = 0;
  document.getElementById("timer-display").innerText = "Remaining Time: 0:00";
}

function durationToSeconds(duration) {
  const [minutes, seconds] = duration.split(':').map(Number);
  return minutes * 60 + seconds;
}

// Pause and Start controls
function pauseExercise() {
  isPaused = true;
  clearInterval(timer);
}

function startCurrentExercise() {
  if (remainingTime > 0 || isPaused) {
      startTimer(""); // Resume timer
  } else {
      showNextExercise(); // Start new exercise
  }
}

function nextExercise() {
  stopTimer(); // Skip the current timer
  currentExerciseIndex++;
  showNextExercise();
}
