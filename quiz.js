let balance = 0;
let current = 0;
let timer;
let timeLeft = 10;
let answered = false;

// ================= REWARD =================
function getReward(difficulty) {
  if (difficulty === "easy") return 0.1;
  if (difficulty === "medium") return 0.25;
  if (difficulty === "hard") return 0.5;
  return 0.25;
}

// ================= QUESTIONS =================
// ✅ KEEP YOUR QUESTIONS HERE (UNCHANGED)
const questions = [

  // 🧠 TRICKY / CONFUSING QUESTIONS

  {
    question: "Ghana gained independence in 1957, but became a republic in?",
    options: ["1957", "1958", "1960", "1966"],
    answer: "1960",
    difficulty: "medium"
  },
  {
    question: "Who was Ghana’s first President AFTER independence?",
    options: ["Kwame Nkrumah", "J.B Danquah", "Edward Akufo-Addo", "None"],
    answer: "Kwame Nkrumah",
    difficulty: "easy"
  },
  {
    question: "Who invited Nkrumah back to Gold Coast?",
    options: ["Ako Adjei", "J.B Danquah", "Paa Grant", "Nkrumah invited himself"],
    answer: "Ako Adjei",
    difficulty: "medium"
  },
  {
    question: "Which came FIRST?",
    options: ["CPP", "UGCC", "NLM", "PNDC"],
    answer: "UGCC",
    difficulty: "medium"
  },
  {
    question: "The 1948 riots were caused by?",
    options: [
      "Ex-servicemen protest",
      "Tax increase",
      "Food shortage",
      "All of the above"
    ],
    answer: "Ex-servicemen protest",
    difficulty: "hard"
  },
  {
    question: "Which one is NOT a Ghanaian political party before independence?",
    options: ["CPP", "UGCC", "NLM", "NDC"],
    answer: "NDC",
    difficulty: "hard"
  },
  {
    question: "Which year is closest to Ghana’s independence?",
    options: ["1956", "1957", "1958", "1960"],
    answer: "1957",
    difficulty: "easy"
  },
  {
    question: "Who led Ghana to independence BUT was later overthrown?",
    options: ["Nkrumah", "Rawlings", "Busia", "Limann"],
    answer: "Nkrumah",
    difficulty: "medium"
  },
  {
    question: "Which of these is NOT a region in Ghana?",
    options: ["Ashanti", "Volta", "Greater Accra", "Lagos"],
    answer: "Lagos",
    difficulty: "easy"
  },
  {
    question: "What does 'Gold Coast' refer to?",
    options: [
      "Colonial name of Ghana",
      "A mining company",
      "A region in Ashanti",
      "A British law"
    ],
    answer: "Colonial name of Ghana",
    difficulty: "easy"
  },

  // 😈 CONFUSION QUESTIONS

  {
    question: "Which one is correct?",
    options: [
      "Ghana became independent in 1957",
      "Ghana became a republic in 1957",
      "Ghana became independent in 1960",
      "Ghana became a colony in 1957"
    ],
    answer: "Ghana became independent in 1957",
    difficulty: "hard"
  },
  {
    question: "Which leader ruled BOTH as military and civilian?",
    options: ["Rawlings", "Nkrumah", "Busia", "Limann"],
    answer: "Rawlings",
    difficulty: "medium"
  },
  {
    question: "Which is the correct order?",
    options: [
      "UGCC → CPP → Independence",
      "CPP → UGCC → Independence",
      "Independence → UGCC → CPP",
      "CPP → Independence → UGCC"
    ],
    answer: "UGCC → CPP → Independence",
    difficulty: "hard"
  },
  {
    question: "Which year did NOT have a major Ghana political change?",
    options: ["1957", "1960", "1966", "1955"],
    answer: "1955",
    difficulty: "hard"
  },
  {
    question: "Who was NOT overthrown by military?",
    options: ["Nkrumah", "Busia", "Limann", "Rawlings"],
    answer: "Rawlings",
    difficulty: "hard"
  },

  // 🧠 VERY TRICKY (ATTENTION TEST)

  {
    question: "Select the correct spelling:",
    options: ["Kwame Nkrumah", "Kwame Nkruma", "Kwame Nkurumah", "Kwame Nkrumaha"],
    answer: "Kwame Nkrumah",
    difficulty: "hard"
  },
  {
    question: "Which is NOT correct?",
    options: [
      "Accra is capital of Ghana",
      "Kumasi is in Ashanti",
      "Tamale is in Northern Region",
      "Cape Coast is capital of Ghana"
    ],
    answer: "Cape Coast is capital of Ghana",
    difficulty: "medium"
  },
  {
    question: "Which statement is TRUE?",
    options: [
      "Ghana became republic before independence",
      "Ghana gained independence before becoming republic",
      "Ghana never became a republic",
      "Ghana is still a colony"
    ],
    answer: "Ghana gained independence before becoming republic",
    difficulty: "hard"
  },
  {
    question: "Which one looks correct but is WRONG?",
    options: [
      "Ghana gained independence in 1957",
      "Ghana became republic in 1960",
      "Nkrumah was first president",
      "Rawlings led independence"
    ],
    answer: "Rawlings led independence",
    difficulty: "hard"
  }

];

// ================= SHUFFLE =================
shuffleArray(questions);

// 🔥 preload extra AI questions
for (let i = 0; i < 5; i++) {
  fetch("http://localhost:3000/ai-question")
    .then(res => res.json())
    .then(q => questions.push(q));
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ================= TIMER =================
function startTimer() {
  clearInterval(timer);
  timeLeft = 10;
  answered = false;

  document.getElementById("timer").innerText =
    "Time left: " + timeLeft + "s";

  timer = setInterval(() => {
    timeLeft--;

    document.getElementById("timer").innerText =
      "Time left: " + timeLeft + "s";

    if (timeLeft <= 0) {
      clearInterval(timer);

      if (!answered) {
        answered = true;
        alert("⏰ Time up! ₵4 lost");

        current++;
        loadQuestion();
      }
    }
  }, 1000);
}

// ================= LOAD QUESTION =================
function loadQuestion() {
 if (current >= questions.length) {

  // 🔥 LOAD NEW AI QUESTION
  fetch("http://localhost:3000/ai-question")
    .then(res => res.json())
    .then(q => {

      // ✅ ADD TO QUESTIONS ARRAY
      questions.push(q);

      loadQuestion(); // reload with new question
    });

  return;
    shuffleArray(questions);
  }

  let q = questions[current];
  document.getElementById("question").innerText = q.question;

  let optionsHTML = "";
  let shuffledOptions = [...q.options];
  shuffleArray(shuffledOptions);

  shuffledOptions.forEach(opt => {
    optionsHTML += `<button onclick="check('${opt}')">${opt}</button>`;
  });

  document.getElementById("options").innerHTML = optionsHTML;

  startTimer(); // ✅ FIX: timer must start here
}

// ================= CHECK ANSWER =================
function check(ans) {
  if (answered) return;

  answered = true;
  clearInterval(timer);

  const user = firebase.auth().currentUser;

  // 1️⃣ STAKE ₵4
  fetch("http://localhost:3000/stake", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: user.uid
    })
  })
  .then(res => res.json())
  .then(stakeData => {

    if (stakeData.error) {
      alert(stakeData.error);
      return;
    }

    balance = stakeData.balance;
    document.getElementById("balance").innerText =
      "Balance: ₵" + balance;

    const q = questions[current];

    if (ans === q.answer) {

      let reward = getReward(q.difficulty);

      fetch("http://localhost:3000/reward", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.uid,
          amount: reward
        })
      })
      .then(res => res.json())
      .then(data => {
        balance = data.balance;

        document.getElementById("balance").innerText =
          "Balance: ₵" + balance;

        alert("✅ Correct! +₵" + reward);

        loadTransactions(); // ✅ update history
      });

    } else {
      alert("❌ Wrong! ₵4 lost");
    }

    current++;
    loadQuestion();
  })
  .catch(err => {
    console.error(err);
    alert("Error processing question");
  });
}

// ================= AUTH =================
firebase.auth().onAuthStateChanged(user => {
  if (user) {

    fetch(`http://localhost:3000/balance/${user.uid}`)
      .then(res => res.json())
      .then(data => {
        balance = data.balance || 0;
        document.getElementById("balance").innerText =
          "Balance: ₵" + balance;
      });

    loadTransactions(); // ✅ load history on login

  } else {
    setTimeout(() => {
      if (!firebase.auth().currentUser) {
        window.location.href = "login.html";
      }
    }, 1500);
  }
});

// ================= WITHDRAW =================
function withdraw() {
  const phone = prompt("Enter your Mobile Money number:");
  const name = prompt("Enter your full name:");
  const networkInput = prompt("Enter network (MTN / VOD / ATL)");

  let network = "";

  if (networkInput === "MTN") network = "MTN";
  else if (networkInput === "VOD") network = "VOD";
  else if (networkInput === "ATL") network = "ATL";
  else {
    alert("Invalid network");
    return;
  }

  const user = firebase.auth().currentUser;

  fetch("http://localhost:3000/withdraw", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: user.uid,
      phone,
      name,
      network
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
    } else {
      alert("💸 Payment sent!");
      balance = 0;
      document.getElementById("balance").innerText = "Balance: ₵0";

      loadTransactions(); // ✅ update history
    }
  })
  .catch(err => {
    alert("Error sending money");
    console.error(err);
  });
}

// ================= DEPOSIT =================
function deposit() {
  const amount = prompt("Enter amount to deposit (minimum ₵20)");

  if (!amount || amount < 20) {
    alert("Minimum deposit is ₵20");
    return;
  }

  const user = firebase.auth().currentUser;

  const handler = PaystackPop.setup({
    key: "pk_live_a1da81eb4a3cfc3d99acf0ae5c7dd954a6199ae7", // 🔥 YOUR PUBLIC KEY
    email: user.email || "user@email.com",
    amount: amount * 100,
    currency: "GHS",

    callback: function(response) {

      fetch("http://localhost:3000/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          reference: response.reference,
          userId: user.uid
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Deposit successful!");

          fetch(`http://localhost:3000/balance/${user.uid}`)
            .then(res => res.json())
            .then(data => {
              balance = data.balance;
              document.getElementById("balance").innerText =
                "Balance: ₵" + balance;
            });

          loadTransactions(); // ✅ update history

        } else {
          alert("Verification failed");
        }
      });
    },

    onClose: function() {
      alert("Transaction cancelled");
    }
  });

  handler.openIframe();
}

// ================= TRANSACTIONS =================
function loadTransactions() {
  const user = firebase.auth().currentUser;
  if (!user) return;

  fetch("http://localhost:3000/transactions/" + user.uid)
    .then(res => res.json())
    .then(data => {

      let html = "";

      if (data.length === 0) {
        html = "<p>No transactions yet</p>";
      } else {
        data.forEach(t => {

          let color = t.status === "success" ? "green" : "red";

          html += `
            <div style="border:1px solid #ccc; padding:10px; margin:5px;">
              <strong style="color:${color}">
                ${t.type.toUpperCase()}
              </strong><br>
              Amount: ₵${t.amount}<br>
              Status: ${t.status}<br>
              ${t.phone ? "Phone: " + t.phone + "<br>" : ""}
              Date: ${new Date(t.createdAt).toLocaleString()}
            </div>
          `;
        });
      }

      document.getElementById("transactions").innerHTML = html;
    });
}

// ================= START =================
shuffleArray(questions);
loadQuestion();