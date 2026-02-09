async function login() {
  const id = document.getElementById("loginId").value.trim();
  const pw = document.getElementById("password").value;
  const remember = document.getElementById("rememberMe").checked;

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  let users = JSON.parse(localStorage.getItem("opor_users")) || {};
  let userKey = Object.keys(users).find(
    k => users[k].username === id || users[k].email === id
  );

  // CREATE USER
  if (!userKey) {
    if (!passwordRegex.test(pw)) {
      alert(
        "Passwort muss enthalten:\n" +
        "• mindestens 8 Zeichen\n" +
        "• Buchstaben\n" +
        "• Zahlen\n" +
        "• Sonderzeichen"
      );
      return;
    }

    const hash = await hashPassword(pw);

    const username = id.includes("@") ? id.split("@")[0] : id;

    users[username] = {
      username,
      email: id.includes("@") ? id : "",
      passwordHash: hash,
      calculatorData: {}
    };

    userKey = username;
  }

  // LOGIN
  const inputHash = await hashPassword(pw);

  if (users[userKey].passwordHash !== inputHash) {
    alert("Falsches Passwort");
    return;
  }

  localStorage.setItem("opor_users", JSON.stringify(users));
  localStorage.setItem("opor_currentUser", userKey);

  if (remember) {
    localStorage.setItem("opor_remember", "true");
  } else {
    localStorage.removeItem("opor_remember");
  }

  window.location.href = "rechner-startpage.html";
}


const pwInput = document.getElementById("password");
const bar = document.getElementById("pw-bar");
const text = document.getElementById("pw-text");

pwInput.addEventListener("input", () => {
  const v = pwInput.value;
  let score = 0;

  if (v.length >= 8) score++;
  if (/[A-Za-z]/.test(v)) score++;
  if (/\d/.test(v)) score++;
  if (/[^A-Za-z\d]/.test(v)) score++;

  const levels = [
    { w: "25%", c: "#ff9b9b", t: "Schwach" },
    { w: "50%", c: "#ffd27d", t: "Okay" },
    { w: "75%", c: "#9fd3ff", t: "Gut" },
    { w: "100%", c: "#7edfa0", t: "Stark" }
  ];

  if (score === 0) {
    bar.style.width = "0%";
    text.textContent = "Passwortstärke";
    return;
  }

  bar.style.width = levels[score - 1].w;
  bar.style.background = levels[score - 1].c;
  text.textContent = levels[score - 1].t;
});
