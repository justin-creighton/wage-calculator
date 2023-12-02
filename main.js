// GETS ALL OF THE ELEMENTS
const myWage = document.getElementById("myWage"),
  myIncreasePercentage = document.getElementById("myIncreasePercentage"),
  myIncreaseRand = document.getElementById("myIncreaseRand"),
  myWageAfter = document.getElementById("myWageAfter"),
  inflationRate = document.getElementById("inflationRate"),
  myIncreaseAfter = document.getElementById("myIncreaseAfter"),
  inflation = document.getElementById("inflation"),
  inflationAsRand = document.getElementById("inflationAsRand"),
  realIncreasePercentage = document.getElementById("realIncreasePercentage"),
  realIncreaseRand = document.getElementById("realIncreaseRand"),
  increasePercentage = document.getElementById("increasePercentage"),
  increaseRand = document.getElementById("increaseRand"),
  info_btns = document.querySelectorAll(".info-btn"),
  floatingLabels = document.querySelectorAll(".floating-labels"),
  inflationBar = document.querySelectorAll(".inflation-bar"),
  actualBar = document.querySelectorAll(".actual-bar"),
  arrows = document.querySelectorAll(".pointer-arrow"),
  stationaryValues = document.querySelectorAll(".stationary-value"),
  hiddenLabels = document.querySelectorAll(".hidden-label"),
  labelTitles = document.querySelectorAll(".label-title"),
  labels = document.querySelectorAll(".label"),
  gaugeTitles = document.querySelectorAll(".gauge-titles"),
  inflationValue = 5;

// INPUT FIELD FOR THE MY WAGE INPUT
myWage.addEventListener("input", (e) => {
  if (myIncreasePercentage.value > 0) {
    myIncreasePercentage.value = round(
      (parseFloat(myIncreaseRand.value) / parseFloat(myWage.value)) * 100
    );
  } else if (myIncreaseRand.value > 0) {
    myIncreaseRand.value = round(
      (parseFloat(myIncreasePercentage.value) / 100) * parseFloat(myWage.value)
    );
  }

  if (
    typeof myIncreasePercentage.value === "string" &&
    typeof myIncreaseRand.value === "string"
  ) {
    myIncreaseRand.value = 0;
    myIncreasePercentage.value = 0;
  }
  setValues();
});

myWage.addEventListener("focus", function (e) {
  window.dataLayer.push({
    event: "wage_calculator",
  });
});

// INPUT FIELD FOR THE MY INCREASE AS % INPUT
myIncreasePercentage.addEventListener("input", (e) => {
  let value = round(
    (parseFloat(e.target.value) / 100) * parseFloat(myWage.value)
  );
  myIncreaseRand.value = value;

  setValues();
});

// INPUT FIELD FOR THE MY INCREASE AS A MONEY VALUE INPUT
myIncreaseRand.addEventListener("input", (e) => {
  let value = round(
    (parseFloat(e.target.value) / parseFloat(myWage.value)) * 100
  );
  myIncreasePercentage.value = value;

  setValues();
});

// THIS FUNCTION CALCULATES THE VALUES THAT ARE INSERTED INTO THE INPUT FIELDS AND GENERATES THE CALCULATED VALUES
function setValues() {
  let valuePercentage = round(
    (parseFloat(myIncreaseRand.value) / parseFloat(myWage.value)) * 100
  );
  let valueRand = round(
    (parseFloat(myIncreasePercentage.value) / 100) * parseFloat(myWage.value)
  );
  let inflationRand = (inflationValue / 100) * parseFloat(myWage.value);
  let values = {
    wageAfter: round(
      parseFloat(myWage.value) + parseFloat(myIncreaseRand.value)
    ),
    inflationPer: round(inflationValue),
    inflationRand: round((inflationValue / 100) * parseFloat(myWage.value)),
    realIncPer: round(
      parseFloat(valuePercentage) - round(parseFloat(inflationValue))
    ),
    realIncRand: round(valueRand - inflationRand),
    increasePer: round(parseFloat(myIncreasePercentage.value)),
    increaseRand: round(
      parseFloat(myWage.value) * (parseFloat(myIncreasePercentage.value) / 100)
    ),
    increaseAfter: round(
      parseFloat(myIncreasePercentage.value) - inflationValue
    ),
  };

  myWageAfter.innerHTML = `R${
    Number.isNaN(values.wageAfter) ? 0 : values.wageAfter
  }`;
  inflationRate.innerHTML = `${
    Number.isNaN(values.inflationPer) ? 0 : values.inflationPer
  }%`;
  inflation.innerHTML = `${
    Number.isNaN(values.inflationPer) ? 0 : values.inflationPer
  }%`;
  inflationAsRand.innerHTML = `R${
    Number.isNaN(values.inflationRand) ? 0 : values.inflationRand
  }`;
  myIncreaseAfter.innerHTML = `${
    Number.isNaN(values.increaseAfter) ? 0 : values.increaseAfter
  }%`;
  realIncreasePercentage.innerHTML = `${
    Number.isNaN(values.realIncPer) ? 0 : values.realIncPer
  }%`;
  realIncreaseRand.innerHTML = `R${
    Number.isNaN(values.realIncRand) ? 0 : values.realIncRand
  }`;
  increasePercentage.innerHTML = `${
    Number.isNaN(values.increasePer) ? 0 : values.increasePer
  }%`;
  increaseRand.innerHTML = `R${
    Number.isNaN(values.increaseRand) ? 0 : values.increaseRand
  }`;
  stationaryValues[0].innerHTML = `${
    Number.isNaN(values.inflationPer) ? 0 : values.inflationPer
  }%`;
  stationaryValues[1].innerHTML = `${
    Number.isNaN(values.realIncPer) ? 0 : values.realIncPer
  }%`;
  stationaryValues[2].innerHTML = `R${
    Number.isNaN(values.inflationRand) ? 0 : values.inflationRand
  }`;
  stationaryValues[3].innerHTML = `R${
    Number.isNaN(values.realIncRand) ? 0 : values.realIncRand
  }`;

  renderGauge(valuePercentage);
}

// THIS FUNCTION GETS PASSED A VALUE AND ROUNDS IT OFF TO 2 DECIMAL PLACES IF THE VALUE IS NOT A ROUND NUMBER
function round(value) {
  //   if(value - Math.floor(value) !== 0){
  //     return Number(value.toFixed(2));
  //   } else {
  //     return Number(value);
  // 		return Number(value.toFixed(2));
  //   }
  return Number(value.toFixed(2));
}

// THIS FUNCTION SETS THE GAUGE VALUES AND POSITIONS
function renderGauge(valuePercentage) {
  if (valuePercentage <= inflationValue) {
    floatingLabels[1].style.background = "rgb(190, 190, 190)";
    floatingLabels[3].style.background = "rgb(190, 190, 190)";
    arrows[1].style.background = "rgb(190, 190, 190)";
    arrows[3].style.background = "rgb(190, 190, 190)";

    actualBar.forEach((bar) => {
      bar.style.background = "rgb(190, 190, 190)";
    });
  } else if (valuePercentage >= inflationValue) {
    floatingLabels[1].style.background = "rgb(142, 199, 154)";
    floatingLabels[3].style.background = "rgb(142, 199, 154)";
    arrows[1].style.background = "rgb(142, 199, 154)";
    arrows[3].style.background = "rgb(142, 199, 154)";

    actualBar.forEach((bar) => {
      bar.style.background = "rgb(142, 199, 154)";
    });
  }

  actualBar.forEach((bar) => {
    bar.style.width = `${
      valuePercentage > 0 && valuePercentage <= inflationValue * 1.5
        ? 30
        : valuePercentage > inflationValue * 1.4 &&
          valuePercentage <= inflationValue * 1.8
        ? 40
        : valuePercentage > inflationValue * 1.8 &&
          valuePercentage < inflationValue * 2
        ? 40
        : valuePercentage === inflationValue * 2
        ? 50
        : valuePercentage > inflationValue * 2 &&
          valuePercentage <= inflationValue * 2.5
        ? 60
        : valuePercentage > inflationValue * 2.5
        ? 70
        : null
    }%`;
  });
  inflationBar.forEach((bar) => {
    bar.style.width = `${
      valuePercentage > 0 && valuePercentage <= inflationValue * 1.5
        ? 70
        : valuePercentage > inflationValue * 1.4 &&
          valuePercentage <= inflationValue * 1.8
        ? 60
        : valuePercentage > inflationValue * 1.8 &&
          valuePercentage < inflationValue * 2
        ? 60
        : valuePercentage === inflationValue * 2
        ? 50
        : valuePercentage > inflationValue * 2 &&
          valuePercentage <= inflationValue * 2.5
        ? 40
        : valuePercentage > inflationValue * 2.5
        ? 30
        : null
    }%`;
  });
  float();
}

// THIS FUNCTION CHECKS THE WIDTH OF THE INFLATION AND ACTUAL INCREASE BARS AND MAKES THE LABELS FLOAT IF IT CANNOT FIT INSIDE THE BAR
function float() {
  setTimeout(function () {
    if (inflationBar[0].clientWidth > floatingLabels[0].clientWidth) {
      labelTitles[0].style.opacity = "1";
      hiddenLabels[0].style.opacity = "0";
      stationaryValues[0].style.opacity = "1";
      labels[0].style.display = "none";
      floatingLabels[0].classList.remove("float");
      floatingLabels[0].classList.add("sink");
    } else {
      labelTitles[0].style.opacity = "0";
      hiddenLabels[0].style.opacity = "1";
      stationaryValues[0].style.opacity = "0";
      labels[0].style.display = "block";
      floatingLabels[0].classList.add("float");
      floatingLabels[0].classList.remove("sink");
    }

    if (inflationBar[1].clientWidth > floatingLabels[2].clientWidth) {
      labelTitles[2].style.opacity = "1";
      hiddenLabels[2].style.opacity = "0";
      stationaryValues[2].style.opacity = "1";
      labels[2].style.display = "none";
      floatingLabels[2].classList.remove("float");
      floatingLabels[2].classList.add("sink");
    } else {
      labelTitles[2].style.opacity = "0";
      hiddenLabels[2].style.opacity = "1";
      stationaryValues[2].style.opacity = "0";
      labels[2].style.display = "block";
      floatingLabels[2].classList.add("float");
      floatingLabels[2].classList.remove("sink");
    }

    if (actualBar[0].clientWidth > floatingLabels[1].clientWidth) {
      labelTitles[1].style.opacity = "1";
      hiddenLabels[1].style.opacity = "0";
      stationaryValues[1].style.opacity = "1";
      labels[1].style.display = "none";
      floatingLabels[1].classList.remove("float");
      floatingLabels[1].classList.add("sink");
    } else {
      labelTitles[1].style.opacity = "0";
      hiddenLabels[1].style.opacity = "1";
      stationaryValues[1].style.opacity = "0";
      labels[1].style.display = "block";
      floatingLabels[1].classList.remove("sink");
      floatingLabels[1].classList.add("float");
    }

    if (actualBar[1].clientWidth > floatingLabels[3].clientWidth) {
      labelTitles[3].style.opacity = "1";
      hiddenLabels[3].style.opacity = "0";
      stationaryValues[3].style.opacity = "1";
      labels[3].style.display = "none";
      floatingLabels[3].classList.remove("float");
      floatingLabels[3].classList.add("sink");
    } else {
      labelTitles[3].style.opacity = "0";
      hiddenLabels[3].style.opacity = "1";
      stationaryValues[3].style.opacity = "0";
      labels[3].style.display = "block";
      floatingLabels[3].classList.add("float");
      floatingLabels[3].classList.remove("sink");
    }

    if (
      inflationBar[1].clientWidth > floatingLabels[2].clientWidth &&
      actualBar[1].clientWidth > floatingLabels[3].clientWidth
    ) {
      gaugeTitles[1].style.marginBottom = "1rem";
    } else {
      gaugeTitles[1].style.marginBottom = "3rem";
    }

    if (
      inflationBar[0].clientWidth > floatingLabels[0].clientWidth &&
      actualBar[0].clientWidth > floatingLabels[1].clientWidth
    ) {
      gaugeTitles[0].style.marginBottom = "1rem";
    } else {
      gaugeTitles[0].style.marginBottom = "3rem";
    }
  }, 500);
}

// THIS CODE IS USED TO OPEN AND CLOSE THE INFO BOXES
const box_ids = ["box-1", "box-2", "box-3", "box-4", "box-5", "box-6"];

for (let info_btn_id = 0; info_btn_id < info_btns.length; info_btn_id++) {
  const info_btn = info_btns.item(info_btn_id);

  info_btn.addEventListener("click", (e) => {
    if (
      document
        .getElementById(info_btn.dataset.for)
        .classList.contains("open") === true
    ) {
      document.getElementById(info_btn.dataset.for).classList.remove("open");
    } else {
      box_ids.forEach((box_id) => {
        document.getElementById(box_id).classList.remove("open");
      });
      document.getElementById(info_btn.dataset.for).classList.add("open");
    }
  });
}
