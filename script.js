/* eslint-disable no-inline-comments */
/* eslint-disable comma-dangle */

// dummy data
const data = [3, 4, 5, 1, 2, 6, 7, 8];
const options = {
  title: "Bar Chart",
  titleColor: "#222",
  titleSize: "2rem",

  // chart
  width: "15",
  height: "10",
  units: "cm",
  backgroundColor: "#ccc",

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

  // render chart dimensions & background color
  let { width, height, units, backgroundColor } = options;
  width += units;
  height += units;
  element.css("width", width);
  element.css("height", height);
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
    let height = `${data[i]}${options.units}`;
    let barColor = `${options.barColors[barColorIndex]}`;
    let valueColor = `${options.valueColors[barValueIndex]}`;
    let labelColor = `${options.labelColors[barLabelIndex]}`;

    // set bar height, color, value & label colors
    $(`#bar${[i]}`).css("height", height);
    $(`#bar${[i]}`).css("background-color", barColor);
    $(`#barValue${[i]}`).css("color", valueColor);
    $(`#barLabel${[i]}`).css("color", labelColor);
  }

  // set bar properties
  const barWidth = (1 / dataLength) * (100 - options.spacing) + "%";
  $(".bar").css("width", barWidth);
  $(".bar").css("align-items", options.valuesPosition);
}

// call main function
drawBarChart(data, options, element);
