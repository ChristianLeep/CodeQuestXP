let xp = 0;
let level = 1;
let player = "";

// Called when user clicks "Enter the Realm"
function startGame() {
  const nameInput = document.getElementById("playerName").value.trim();
  if (!nameInput) {
    alert("Please enter your name, brave adventurer.");
    return;
  }

  const savedPlayer = localStorage.getItem("player");

  if (savedPlayer !== nameInput) {
    // New player: reset progress
    xp = 0;
    level = 1;
    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);
  } else {
    // Returning player: load saved progress
    xp = parseInt(localStorage.getItem("xp")) || 0;
    level = parseInt(localStorage.getItem("level")) || 1;
  }

  player = nameInput;
  localStorage.setItem("player", player);

  document.getElementById("greetingText").innerText = `Greetings, ${player}! Your journey begins...`;
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  updateHUD();
}

// Adds XP and checks for level-up
function gainXP(amount) {
  xp += amount;
  if (xp >= level * 10) {
    level++;
    alert(`🎉 You leveled up! You are now Level ${level}!`);
  }
  localStorage.setItem("xp", xp);
  localStorage.setItem("level", level);
  updateHUD();
}

// Updates XP bar display
function updateHUD() {
  document.getElementById("xpBar").innerText = `XP: ${xp} | Level: ${level}`;
}

// Loads Quest 1 into the quest area
function startQuest() {
  const quest = document.getElementById("questArea");
  quest.innerHTML = `
    <h2>Quest 1: Print Magic 🔮</h2>
    <p>Write a line of code that casts your first spell:<br><code>print("Hello, world!")</code></p>
    <textarea id="codeInput" rows="4" cols="50">// Type your code here</textarea><br><br>
    <button onclick="checkCode()">Cast Spell</button>
    <div id="result"></div>
  `;
}

// Checks user input code for correctness
function checkCode() {
  const code = document.getElementById("codeInput").value.trim();
  const result = document.getElementById("result");

  if (code === 'print("Hello, world!")' || code === "print('Hello, world!')") {
    result.innerHTML = "✨ Spell cast successfully! +10 XP!";
    gainXP(10);
  } else {
    result.innerHTML = "⚠️ That spell fizzled... Try again!";
  }
}

// Ends current session without deleting saved data
function logout() {
  if (confirm("Log out and return to the realm gate?")) {
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("loginScreen").style.display = "block";
  }
}

// Auto-load saved user if data exists
window.onload = function () {
  const savedPlayer = localStorage.getItem("player");
  if (savedPlayer) {
    player = savedPlayer;
    xp = parseInt(localStorage.getItem("xp")) || 0;
    level = parseInt(localStorage.getItem("level")) || 1;

    document.getElementById("greetingText").innerText = `Welcome back, ${player}!`;
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    updateHUD();
  }
};
