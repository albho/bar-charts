// dummy data
const data = [1, 2, 3, 4, 5];
const options = {
  width: "10",
  height: "10",
  units: "cm",
  backgroundColor: "lightgrey",
  labels: ["one", "two", "three", "four", "five"],
  barsColor: "#333",
};
const element = "#barChart";

// main function
function drawBarChart(data, options, element) {
  // render individual bars
  for (let i = 0; i < data.length; i++) {
    $(element).append(
      `<div class='bar' id='bar${data[i]}' style='height: ${data[i]}${options.units}'><p>${data[i]}</p><p class='barLabel'>${options.labels[i]}</p></div>`
    );
  }

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
  const barWidth = (1 / data.length) * 80 + "%";
  $(".bar").css("background-color", options.barsColor);
  $(".bar").css("width", `${barWidth}`);
}

// call main function
drawBarChart(data, options, element);
