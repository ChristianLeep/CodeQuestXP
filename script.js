let xp = 0;
let level = 1;
let player = "";

// Called when user clicks "Enter the Realm"
function startGame() {
  const storedClass = localStorage.getItem("class");
if (!storedClass) {
  document.getElementById("characterScreen").style.display = "block";
} else {
  loadAvatar(storedClass);
  document.getElementById("gameScreen").style.display = "block";
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


// Character class avatar
function loadAvatar(characterClass) {
  const avatarPanel = document.getElementById("avatarPanel");
  avatarPanel.innerHTML = ""; // Clear previous image

  const baseImage = document.createElement("img");
  baseImage.src = `images/${characterClass.toLowerCase()}_base.png`; // e.g., knight_base.png
  baseImage.alt = characterClass;
  baseImage.style.width = "100%";

  avatarPanel.appendChild(baseImage);
}



// Loads Quest 1 into the quest area
function startQuest() {
  const quest = document.getElementById("questArea");
  quest.innerHTML = `
    <h2>Quest 1: Print Magic 🔮</h2>
    <p>Before you can cast spells, you must learn the magic words to speak to your machine.</p>
    <p>The <code>print()</code> function allows you to display messages to the screen.</p>
    <p>For example:<br><code>print("Welcome, adventurer!")</code></p>
    <p><em>📝 Tip: Don’t forget to wrap your message in quotation marks (" ") — your spell won’t work without them!</em></p>
    <p>This will show: <strong>Welcome, adventurer!</strong></p>
    <button onclick="startQuestChallenge()">Continue to Challenge</button>
  `;
}

// Loads Quest Challenge 1 into the quest area
function startQuestChallenge() {
  const quest = document.getElementById("questArea");
  quest.innerHTML = `
    <h2>Quest 1: Cast Your First Spell ✨</h2>
    <p>Now it's your turn. Use the <code>print()</code> function to say <strong>Hello, world!</strong></p>

    <div class="quest-wrapper">
      <textarea id="codeInput" placeholder="Type your code here..."></textarea>
      <button onclick="checkCode()">Cast Spell</button>
    </div>

    <div id="result"></div>
  `;
}


// Checks user input code for correctness
function checkCode() {
  const code = document.getElementById("codeInput").value.trim();
  const result = document.getElementById("result");

  // Clear any existing styling
  result.className = "";

  // ✅ Correct solution
  if (code === 'print("Hello, world!")' || code === "print('Hello, world!')") {
    result.className = "success";
    result.innerHTML = "✨ Spell cast successfully! +10 XP!";
    gainXP(10);
    return;
  }

  // ⚠️ Syntax warnings
  if (!code.startsWith("print")) {
    result.className = "error";
    result.innerHTML = "⚠️ Your code must start with <code>print</code> to cast the spell!";
  } else if (!code.includes('"') && !code.includes("'")) {
    result.className = "error";
    result.innerHTML = "📝 It looks like you're missing quotation marks around your message.";
  } else if (!code.endsWith(")")) {
    result.className = "error";
    result.innerHTML = "🧩 Don’t forget to close the parentheses at the end of your spell!";
  } else {
    result.className = "error";
    result.innerHTML = "⚠️ That spell fizzled... Check your syntax and try again!";
  }
}



// Ends current session without deleting saved data
function logout() {
  if (confirm("Log out and return to the realm gate?")) {
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("loginScreen").style.display = "block";
  }
}

// Select your Class
function selectClass(chosenClass) {
  localStorage.setItem("class", chosenClass);
  loadAvatar(chosenClass);
  document.getElementById("characterScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
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
