/* eslint-disable no-inline-comments */
/* eslint-disable comma-dangle */

// dummy data
// const data = [3, 4, 5, 1, 2, 6, 7, 8];
const data = [
  [1, 6, 3],
  [3, 4, 3],
  [5, 3, 2],
];
const options = {
  type: "stacked", // regular or stacked
  title: {
    text: "Bar Chart",
    color: "#222",
    fontSize: "2rem",
  },
  chart: {
    mainAxis: "x", // x or y
    xAxis: 18,
    yAxis: 12,
    units: "cm",
    backgroundColor: "#ccc",
    tickInterval: 1,
  },
  bars: {
    valuesPosition: "center", // flex-start, center, flex-end
    spacing: "20", // 0 - 100, though 100 will render invisible bars
    // labels: ["three", "four", "five", "one", "two", "six", "seven", "eight"],
    // colors: ["#222", "#444", "#666"],
    // valueColors: ["#f00", "#0f0", "#00f"],
    // labelColors: ["#f00", "#0f0", "#00f"],
    labels: ["top", "middle", "bottom"],
    colors: ["#f00", "#0f0", "#00f"],
    valueColors: ["#111", "#222", "#333"],
    labelColors: ["#000", "#000", "#000"],
  },
};
const element = $("#barChart");

function renderTitle(title) {
  $(`<h1>${title.text}</h1>`).insertBefore(element);
  $("h1").css("color", title.color);
  $("h1").css("font-size", title.fontSize);
  $("h1").css("margin-bottom", "1rem");
}

function renderChart(chart, element) {
  let { xAxis, yAxis, units, backgroundColor } = chart;
  xAxis += units;
  yAxis += units;

  // set chart width, height, background color
  element.css("width", xAxis);
  element.css("height", yAxis);
  element.css("background-color", backgroundColor);
}

function renderBars(data, bars) {
  const dataLength = data.length;

  for (let i = 0; i < dataLength; i++) {
    // append bars
    element.append(
      `<div class='bar' id='bar${[i]}'><p class='barValue' id='barValue${[
        i,
      ]}'>${data[i]}</p><p class='barLabel' id='barLabel${[i]}'>${
        bars.labels[i]
      }</p></div>`
    );

    // set bar & bar properties' colors
    const barColorIndex = i % bars.colors.length;
    const barValueIndex = i % bars.valueColors.length;
    const barLabelIndex = i % bars.labelColors.length;
    const barColor = `${bars.colors[barColorIndex]}`;
    const valueColor = `${bars.valueColors[barValueIndex]}`;
    const labelColor = `${bars.labelColors[barLabelIndex]}`;
    $(`#bar${[i]}`).css("background-color", barColor);
    $(`#barValue${[i]}`).css("color", valueColor);
    $(`#barLabel${[i]}`).css("color", labelColor);
  }
}

function renderStackedBars(data, options) {
  const dataLength = data.length;
  const { chart, bars } = options;
  for (let i = 0; i < dataLength; i++) {
    element.append(
      `<div class='stackedBarContainer' id='stackedBar${i}'></div>`
    );
    for (let j = data[i].length - 1; j >= 0; j--) {
      let id = `${i}_${j}`;
      // append bars
      $(`#stackedBar${i}`).append(
        `<div class='stackedBar' id='bar${id}'><p class='barValue' id='barValue${id}'>${data[i][j]}</p></div>`
      );
      // set properties according to axis

      // set bar & bar properties' colors
      const barColorIndex = j % bars.colors.length;
      const barValueIndex = j % bars.valueColors.length;
      // const barLabelIndex = i % bars.labelColors.length;
      const barColor = `${bars.colors[barColorIndex]}`;
      const valueColor = `${bars.valueColors[barValueIndex]}`;
      // const labelColor = `${bars.labelColors[barLabelIndex]}`;
      $(`#bar${id}`).css("background-color", barColor);
      $(`#barValue${id}`).css("color", valueColor);

      if (chart.mainAxis === "x" || chart.mainAxis === "X") {
        $(`#bar${id}`).css("height", `${data[i][j]}${chart.units}`);
      } else if (chart.mainAxis === "y" || chart.mainAxis === "Y") {
        $(`#bar${id}`).css("width", `${data[i][j]}${chart.units}`);
      }
      // $(`#barLabel${[i]}`).css("color", labelColor);
    }
  }
}

function setAxis(data, chart, bars) {
  const dataLength = data.length;
  const barValue = (1 / dataLength) * (100 - bars.spacing) + "%";

  // set properties according to axis
  if (chart.mainAxis === "x" || chart.mainAxis === "X") {
    $(".bar").css("width", barValue);
    $(".bar").css("align-items", bars.valuesPosition);
    for (let i = 0; i < dataLength; i++) {
      $(`#bar${[i]}`).css("height", `${data[i]}${chart.units}`);
    }

    // for stacked bars
    $(".stackedBarContainer").css("width", barValue);
    $(".stackedBar").css("justify-content", bars.valuesPosition);
  } else if (chart.mainAxis === "y" || chart.mainAxis === "Y") {
    $("#barChart").css("flex-direction", "column");
    $("#barChart").css("align-items", "flex-start");
    $(".bar").css("height", barValue);
    $(".bar").css("align-items", "center");
    $(".bar").css("justify-content", bars.valuesPosition);
    $(".barLabel").css("position", "absolute");
    $(".barLabel").css("height", "fit-content");
    $(".barLabel").css("left", "-0.5rem");
    $(".barLabel").css("top", "0");
    $(".barLabel").css("transform", "translate(-100%, 50%)");

    // for stacked bars
    $(".stackedBarContainer").css("height", barValue);
    $(".stackedBarContainer").css("display", "flex");
    $(".stackedBarContainer").css("flex-direction", "row-reverse");
    $(".stackedBar").css("display", "flex");
    $(".stackedBar").css("align-items", "center");
    $(".stackedBar").css("justify-content", bars.valuesPosition);
    for (let i = 0; i < dataLength; i++) {
      $(`#bar${[i]}`).css("width", `${data[i]}${chart.units}`);
    }
  }
}

function setTicks(chart, element) {
  // set ticks according to axis
  if (chart.mainAxis === "x" || chart.mainAxis === "X") {
    for (let i = 0; i <= chart.yAxis; i += chart.tickInterval) {
      element.append(
        `<div class='tick' style="bottom: ${i}${chart.units}"><p class='tickLabel'>${i}</p></div>`
      );
    }
  } else if (chart.mainAxis === "y" || chart.mainAxis === "Y") {
    for (let i = 0; i <= chart.xAxis; i += chart.tickInterval) {
      element.append(
        `<div class='tick' style="left: ${i}${chart.units}"><p class='tickLabel'>${i}</p></div>`
      );
    }
    $(".tick").css("width", "0");
    $(".tick").css("height", "100%");
    $(".tick").css("border-left", "1px solid black");
    $(".tickLabel").css("bottom", "-0.5rem");
    $(".tickLabel").css("transform", "translate(-50%, 100%");
  }
}

// main function
function drawBarChart(data, options, element) {
  const { title, chart, bars } = options;

  // call helper functions
  renderTitle(title);
  renderChart(chart, element);
  if (options.type === "regular") {
    renderBars(data, bars);
  } else if (options.type === "stacked") {
    renderStackedBars(data, options);
  }
  setTicks(chart, element);
  setAxis(data, chart, bars);
}

// call main function
drawBarChart(data, options, element);
