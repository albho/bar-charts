// dummy data
const data = [3, 4, 5, 1, 2];
const options = {
  title: "Bar Chart",

  // chart
  width: "10",
  height: "10",
  units: "cm",
  backgroundColor: "lightgrey",

  // bars
  barValuesPosition: "center", // flex-start, center, flex-end
  labels: ["three", "four", "five", "one", "two"],
  barsColor: "#333",
};
const element = $("#barChart");

// main function
function drawBarChart(data, options, element) {
  // render individual bars
  for (let i = 0; i < data.length; i++) {
    element.append(
      `<div class='bar' id='bar${[i]}' style='height: ${data[i]}${
        options.units
      }'><p class='barValue'>${data[i]}</p><p class='barLabel'>${
        options.labels[i]
      }</p></div>`
    );
  }

  setProperties(options, element);
}

// set chart properties
function setProperties(options, element) {
  $(`<h1>${options.title}</h1>`).insertBefore(element);
  // render chart dimensions & background color
  let { width, height, units, backgroundColor } = options;
  width += units;
  height += units;
  element.css("width", width);
  element.css("height", height);
  element.css("background-color", backgroundColor);

  // bar properties
  const barWidth = (1 / data.length) * 80 + "%";
  $(".bar").css("background-color", options.barsColor);
  $(".bar").css("width", barWidth);
  $(".bar").css("align-items", options.barValuesPosition);
}

// call main function
drawBarChart(data, options, element);
