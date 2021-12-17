// dummy data
const data = [1, 2, 3, 4, 5];
const options = {
  width: "10",
  height: "10",
  units: "cm",
  backgroundColor: "lightgrey",
  barsColor: "#333",
};
const element = "#barChart";

// main function
function drawBarChart(data, options, element) {
  // render individual bars
  data.forEach((bar) => {
    $(element).append(
      `<div class='bar' id='bar${bar}' style='height: ${bar}${options.units}'>${bar}</div>`
    );
  });

  setProperties(options, element);
}

// set chart properties
function setProperties(options, element) {
  // render chart dimensions & background color
  let { width, height, units, backgroundColor } = options;
  width += units;
  height += units;
  $(element).css("width", width);
  $(element).css("height", height);
  $(element).css("background-color", backgroundColor);

  // bar properties
  const barWidth = (1 / data.length) * 100;
  $(".bar").css("background-color", options.barsColor);
  $(".bar").css("width", `${barWidth}${units}`);
}

// call main function
drawBarChart(data, options, element);
