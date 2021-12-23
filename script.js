/* eslint-disable no-inline-comments */
/* eslint-disable comma-dangle */

// dummy data
let data = [
  [1.5, 4, 3],
  [2, 2.5, 2],
  [6, 1, 2.5],
];
let options = {
  type: "stacked", // regular or stacked
  title: {
    text: "Bar Chart",
    color: "#559",
    fontSize: "2rem",
  },
  chart: {
    mainAxis: "x", // x or y
    xAxis: 20,
    yAxis: 10,
    units: "cm",
    backgroundColor: "#eee",
    tickInterval: 2,
  },
  bars: {
    valuesPosition: "center", // flex-start, center, flex-end
    spacing: "20", // 0 - 100, though 100 will render invisible bars
    labels: ["red", "green", "blue"],
    colors: ["red", "green", "blue"],
    valueColors: ["black"],
    labelColors: ["red", "green", "blue"],
  },
};
let element = $("#barChart");

function renderTitle(title) {
  $(`<h1>${title.text}</h1>`).insertBefore(element);
  $("h1").css({
    color: title.color,
    "font-size": title.fontSize,
  });
}

function renderChart(chart, element) {
  let { xAxis, yAxis, units, backgroundColor } = chart;
  xAxis += units;
  yAxis += units;
  element.css({
    width: xAxis,
    height: yAxis,
    "background-color": backgroundColor,
  });
}

function renderBars(data, bars, element) {
  const dataLength = data.length;

  // append bars
  for (let i = 0; i < dataLength; i++) {
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

function setLegend(options, element) {
  const numLabels = options.bars.labels.length;

  // add a 'Legend' container - color box to match bar color + label text
  $(element).append("<div class='stackedLabels'><h3>Legend</h3></div>");
  for (let i = numLabels - 1; i >= 0; i--) {
    $(".stackedLabels").append(
      `<div id='stackedLabel${i}'><div class='colorBox' id='colorBox${i}'></div>${options.bars.labels[i]}</div>`
    );
    $(`#colorBox${i}`).css("background-color", options.bars.colors[i]);
    $(`#stackedLabel${i}`).css("color", options.bars.labelColors[i]);
  }
}

function renderStackedBars(data, options, element) {
  const dataLength = data.length;
  const { chart, bars } = options;

  // create container for each stacked bar
  for (let i = 0; i < dataLength; i++) {
    element.append(
      `<div class='stackedBarContainer' id='stackedBar${i}'></div>`
    );

    // add portions to stacked bar
    for (let j = data[i].length - 1; j >= 0; j--) {
      let id = `${i}_${j}`;

      // append bars
      $(`#stackedBar${i}`).append(
        `<div class='stackedBar' id='bar${id}'><p class='barValue' id='barValue${id}'>${data[i][j]}</p></div>`
      );

      // set bar & bar properties' colors
      const barColorIndex = j % bars.colors.length;
      const barValueIndex = j % bars.valueColors.length;
      const barColor = `${bars.colors[barColorIndex]}`;
      const valueColor = `${bars.valueColors[barValueIndex]}`;
      $(`#bar${id}`).css("background-color", barColor);
      $(`#barValue${id}`).css("color", valueColor);

      // set bar orientation
      if (chart.mainAxis === "x" || chart.mainAxis === "X") {
        $(`#bar${id}`).css("height", `${data[i][j]}${chart.units}`);
      } else if (chart.mainAxis === "y" || chart.mainAxis === "Y") {
        $(`#bar${id}`).css("width", `${data[i][j]}${chart.units}`);
      }
    }
  }

  // set labels legend
  setLegend(options, element);
}

// set main axis as X
function setAxisX(data, chart, bars) {
  const dataLength = data.length;
  const barValue = (1 / dataLength) * (100 - bars.spacing) + "%";

  // set regular bar chart's bars' properties
  $(".bar").css({ width: barValue, "align-items": bars.valuesPosition });
  for (let i = 0; i < dataLength; i++) {
    $(`#bar${[i]}`).css("height", `${data[i]}${chart.units}`);
  }

  // set stacked bar chart's bars' properties
  $(".stackedBarContainer").css("width", barValue);
  $(".stackedBar").css("justify-content", bars.valuesPosition);
}

// set main axis as Y
function setAxisY(data, chart, bars) {
  const dataLength = data.length;
  const barValue = (1 / dataLength) * (100 - bars.spacing) + "%";

  // set regular bar chart's bars' properties
  $("#barChart").css({
    "flex-direction": "column",
    "align-items": "flex-start",
  });
  $(".bar").css({
    height: barValue,
    "align-items": "center",
    "justify-content": bars.valuesPosition,
  });
  $(".barLabel").css({
    position: "absolute",
    height: "fit-content",
    left: "-0.5rem",
    top: "0",
    transform: "translate(-100%, 50%)",
  });

  // set stacked bar chart's bars' properties
  $(".stackedBarContainer").css({
    height: barValue,
    display: "flex",
    "flex-direction": "row-reverse",
  });
  $(".stackedBar").css({
    display: "flex",
    "align-items": "center",
    "justify-content": bars.valuesPosition,
  });
  for (let i = 0; i < dataLength; i++) {
    $(`#bar${[i]}`).css("width", `${data[i]}${chart.units}`);
  }
}

// set ticks for chart with main axis X
function setTicksX(chart, element) {
  for (let i = 0; i <= chart.yAxis; i += chart.tickInterval) {
    element.append(
      `<div class='tick' style="bottom: ${i}${chart.units}"><p class='tickLabel'>${i}</p></div>`
    );
  }
}

// set ticks for chart with main axis Y
function setTicksY(chart, element) {
  for (let i = 0; i <= chart.xAxis; i += chart.tickInterval) {
    element.append(
      `<div class='tick' style="left: ${i}${chart.units}"><p class='tickLabel'>${i}</p></div>`
    );
  }
  $(".tick").css({
    width: "0",
    height: "100%",
    "border-left": "1px solid black",
  });
  $(".tickLabel").css({ bottom: "-0.5rem", transform: "translate(-50%, 100%" });
}

// main function
function drawBarChart(data, options, element) {
  const { title, chart, bars } = options;

  // call helper functions
  renderTitle(title);
  renderChart(chart, element);

  if (options.type === "regular") {
    renderBars(data, bars, element);
  } else if (options.type === "stacked") {
    renderStackedBars(data, options, element);
  }

  if (chart.mainAxis === "x" || chart.mainAxis === "X") {
    setTicksX(chart, element);
    setAxisX(data, chart, bars);
  } else if (chart.mainAxis === "y" || chart.mainAxis === "Y") {
    setTicksY(chart, element);
    setAxisY(data, chart, bars);
  }
}

// call main function
drawBarChart(data, options, element);
