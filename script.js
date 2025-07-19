let xp = 0;
let level = 1;
let player = "";

function startGame() {
  const nameInput = document.getElementById("playerName").value.trim();
  if (!nameInput) {
    alert("Please enter your name, brave adventurer.");
    return;
  }

  player = nameInput;
  localStorage.setItem("player", player);
  localStorage.setItem("xp", 0);
  localStorage.setItem("level", 1);

  document.getElementById("greetingText").innerText = `Greetings, ${player}! Your journey begins...`;
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  updateHUD();
}

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

function updateHUD() {
  document.getElementById("xpBar").innerText = `XP: ${xp} | Level: ${level}`;
}

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

window.onload = function() {
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
