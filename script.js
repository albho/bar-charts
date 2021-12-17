/* eslint-disable no-inline-comments */
/* eslint-disable comma-dangle */

// dummy data
const data = [3, 4, 5, 1, 2, 6, 7, 8];
const options = {
  title: "Bar Chart",
  titleColor: "#222",
  titleSize: "2rem",
  mainAxis: "y", // x or y

  // chart
  xAxis: 15,
  yAxis: 10,
  units: "cm",
  backgroundColor: "#ccc",
  tickInterval: 2,

  // bars
  valuesPosition: "center", // flex-start, center, flex-end
  spacing: "20", // 0 - 100
  labels: ["three", "four", "five", "one", "two", "six", "seven", "eight"],
  barColors: ["#222", "#444", "#666"],
  valueColors: ["#f00", "#0f0", "#00f"],
  labelColors: ["#f00", "#0f0", "#00f"],
};
const element = $("#barChart");

// main function
function drawBarChart(data, options, element) {
  const dataLength = data.length;

  // set title
  $(`<h1>${options.title}</h1>`).insertBefore(element);
  $("h1").css("color", options.titleColor);
  $("h1").css("font-size", options.titleSize);
  $("h1").css("margin-bottom", "1rem");

  // render chart dimensions & background color
  let { xAxis, yAxis, units, backgroundColor } = options;
  xAxis += units;
  yAxis += units;
  element.css("width", xAxis);
  element.css("height", yAxis);
  element.css("background-color", backgroundColor);

  // render individual bars
  for (let i = 0; i < dataLength; i++) {
    element.append(
      `<div class='bar' id='bar${[i]}'><p class='barValue' id='barValue${[
        i,
      ]}'>${data[i]}</p><p class='barLabel' id='barLabel${[i]}'>${
        options.labels[i]
      }</p></div>`
    );
  }

  // set individual bar properties
  for (let i = 0; i < dataLength; i++) {
    let barColorIndex = i % options.barColors.length;
    let barValueIndex = i % options.valueColors.length;
    let barLabelIndex = i % options.labelColors.length;
    let barColor = `${options.barColors[barColorIndex]}`;
    let valueColor = `${options.valueColors[barValueIndex]}`;
    let labelColor = `${options.labelColors[barLabelIndex]}`;

    // set bar color, value & label colors
    $(`#bar${[i]}`).css("background-color", barColor);
    $(`#barValue${[i]}`).css("color", valueColor);
    $(`#barLabel${[i]}`).css("color", labelColor);
  }

  // set bar properties according to axis
  const barValue = (1 / dataLength) * (100 - options.spacing) + "%";

  // x-axis
  if (options.mainAxis === "x") {
    $(".bar").css("width", barValue);
    $(".bar").css("align-items", options.valuesPosition);

    // set ticks
    for (let i = 0; i <= options.yAxis; i += options.tickInterval) {
      element.append(
        `<div class='tick' style="bottom: ${i}${units}"><p class='tickLabel'>${i}</p></div>`
      );
    }

    // set bar yAxis
    for (let i = 0; i < dataLength; i++) {
      let yAxis = `${data[i]}${options.units}`;
      $(`#bar${[i]}`).css("height", yAxis);
    }

    // y-axis
  } else if (options.mainAxis === "y") {
    $("#barChart").css("flex-direction", "column");
    $("#barChart").css("align-items", "flex-start");
    $(".bar").css("height", barValue);
    $(".bar").css("align-items", "center");
    $(".bar").css("justify-content", options.valuesPosition);
    $(".barLabel").css("position", "absolute");
    $(".barLabel").css("height", "fit-content");
    $(".barLabel").css("left", "-0.5rem");
    $(".barLabel").css("top", "0");
    $(".barLabel").css("transform", "translate(-100%, 50%)");

    // set ticks
    for (let i = 0; i <= options.xAxis; i += options.tickInterval) {
      element.append(
        `<div class='tick' style="left: ${i}${units}"><p class='tickLabel'>${i}</p></div>`
      );
    }
    $(".tick").css("width", "0");
    $(".tick").css("height", "100%");
    $(".tick").css("border-left", "1px solid black");
    $(".tickLabel").css("bottom", "-0.5rem");
    $(".tickLabel").css("transform", "translate(-50%, 100%");

    // set bar xAxis
    for (let i = 0; i < dataLength; i++) {
      let xAxis = `${data[i]}${options.units}`;
      $(`#bar${[i]}`).css("width", xAxis);
    }
  }
}

// call main function
drawBarChart(data, options, element);
