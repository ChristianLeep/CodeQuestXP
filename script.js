function startQuest() {
  const quest = document.getElementById("questArea");
  quest.innerHTML = `
    <h2>Quest 1: Print Magic 🔮</h2>
    <p>Write a line of code that casts your first spell: print("Hello, world!")</p>
    <textarea id="codeInput" rows="4" cols="50">// Type your code here</textarea><br>
    <button onclick="checkCode()">Cast Spell</button>
    <div id="result"></div>
  `;
}

function checkCode() {
  const code = document.getElementById("codeInput").value.trim();
  const result = document.getElementById("result");

  if (code === 'print("Hello, world!")' || code === "print('Hello, world!')") {
    result.innerHTML = "✨ Spell cast successfully! +10 XP!";
    // Later: Add XP system
  } else {
    result.innerHTML = "⚠️ That spell fizzled... Try again!";
  }
}
