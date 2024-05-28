let images = ["bau.png", "ca.png", "ga.png", "huou.png", "tom.png", "cua.png"];

let vietSub = {
  "bau.png": "Con Bầu",
  "ca.png": "Con Cá",
  "ga.png": "Con Gà",
  "huou.png": "Con Hươu",
  "tom.png": "Con Tôm",
  "cua.png": "Con Cua",
};

let bets = { slot1: 0, slot2: 0, slot3: 0, slot4: 0, slot5: 0, slot6: 0 };

window.addEventListener("DOMContentLoaded", (event) => {
  
  const defaultImages = document.createElement("div");
  defaultImages.classList.add("default-images");

  for (let i = 0; i < 3; i++) {
    const defaultImage = document.createElement("img");
    defaultImage.src = "img/bau.png"; 
    defaultImages.appendChild(defaultImage);
  }

  document.getElementById("slotContainer").appendChild(defaultImages);
});

function placeBet(slot) {
  let totalBets = Object.values(bets).reduce((a, b) => a + b, 0);
  if (totalBets >= 3) {
    alert("Tổng số lần đặt cược đã đầy");
    return;
  }

  bets[slot]++;
  document.querySelector(`#${slot} span`).textContent = `${bets[slot]}`;
}

function resetBets() {
  bets = { slot1: 0, slot2: 0, slot3: 0, slot4: 0, slot5: 0, slot6: 0 };
  document.querySelectorAll(".slotImage span").forEach((span) => {
    span.textContent = "0";
  });
  document
    .querySelectorAll(".slotImage")
    .forEach((slot) => (slot.disabled = false));
}

function spin() {
  if (Object.values(bets).reduce((a, b) => a + b, 0) === 0) {
    alert("Vui lòng đặt cược trước khi quay.");
    return;
  }

  document.getElementById("spinButton").disabled = true;
  document.getElementById("resetButton").disabled = true;
  document
    .querySelectorAll(".slotImage")
    .forEach((slot) => (slot.disabled = true));

  const imagesFolderPath = "img/";
  let spinsLeft = 100;
  const interval = setInterval(() => {
    document.getElementById("slotContainer").innerHTML = "";
    let result = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * images.length);
      const imageName = images[randomIndex];
      const imagePath = imagesFolderPath + imageName;
      result.push(imageName);
      const vietSubName = vietSub[imagePath];
      const slotElement = document.createElement("button");
      slotElement.className = "slotImage";
      slotElement.style.backgroundImage = `url(${imagePath})`;
      slotElement.textContent = vietSubName;
      document.getElementById("slotContainer").appendChild(slotElement);
    }

    if (--spinsLeft === 0) {
      clearInterval(interval);
      document.getElementById("spinButton").disabled = false;
      document.getElementById("resetButton").disabled = false;
      document
        .querySelectorAll(".slotImage")
        .forEach((slot) => (slot.disabled = false));
      compareResult(result);
    }
  }, 50);
}

function compareResult(result) {
  const count = {};
  result.forEach((imageName) => {
    const vietSubName = vietSub[imageName];
    count[vietSubName] = (count[vietSubName] || 0) + 1;
  });

  let message = "";
  const keys = Object.keys(count);
  if (keys.length === 1) {
    const vietSubName = keys[0];
    const countText = count[vietSubName];
    message = `Bạn đã đoán đúng với kết quả: ${vietSubName.toLowerCase()} ${countText}`;
  } else {
    message = "Bạn đã đoán sai với kết quả:";
    keys.forEach((vietSubName, index) => {
      const countText = count[vietSubName];
      message += ` ${vietSubName.toLowerCase()} ${countText}${
        index < keys.length - 1 ? "," : ""
      }`;
    });
  }

  console.log(message);
}
