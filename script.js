// dummy data
const data = [1, 2, 3, 4, 5];
const options = {
  width: "10cm",
  height: "10cm",
  backgroundColor: "lightgrey",
};
const element = "#barChart";

// main function
function drawBarChart(data, options, element) {
  // render chart dimensions & background color
  const { width, height, backgroundColor } = options;
  $(element).css("width", width);
  $(element).css("height", height);
  $(element).css("background-color", backgroundColor);

  // render individual bars
  data.forEach((bar) => {
    $(element).append(`<div class='data${bar}'>${bar}</div>`);
  });
}

// call main function
drawBarChart(data, options, element);
