async function init() {
  data = await d3.csv("https://flunky.github.io/cars2017.csv");

  const annotationsE = [
    {
      note: {
        label: "Avg Fuel efficiency is high",
        title: "Electricity"
      },
      x: 250,
      y: 60,
      dy: 50,
      dx: 50
    }
  ];

  // Add annotation to the chart
  const makeAnnotationsE = d3.annotation().annotations(annotationsE);


  const annotationsD = [
    {
      note: {
        label: "Avg Fuel efficiency is medium",
        title: "Disel"
      },
      x: 130,
      y: 140,
      dy: 50,
      dx: 50
    }
  ];

  // Add annotation to the chart
  const makeAnnotationsD = d3.annotation().annotations(annotationsD);


  const annotationsG = [
    {
      note: {
        label: "Avg Fuel efficiency is low",
        title: "Gasoline"
      },
      x: 50,
      y: 200,
      dy: -140,
      dx: 50
    }
  ];

  // Add annotation to the chart
  const makeAnnotationsG = d3.annotation().annotations(annotationsG);

  const tickValueAxis = [10, 20, 50, 100];

  const logScaleX = d3
    .scaleLog()
    .domain([10, 150])
    .range([0, 200])
    .base(10);

  const logScaleY = d3
    .scaleLog()
    .domain([10, 150])
    .range([200, 0])
    .base(10);

  var tooltip = d3.select("#tooltip");

  d3.select("svg")
    .append("g")
    .attr("transform", "translate(50,50)")
    .call(
      d3
        .axisLeft(logScaleY)
        .tickValues(tickValueAxis)
        .tickFormat(d3.format("~s"))
    );

  d3.select("svg")
    .append("g")
    .attr("transform", "translate(50,250)")
    .call(
      d3
        .axisBottom(logScaleX)
        .tickValues(tickValueAxis)
        .tickFormat(d3.format("~s"))
    );

    d3.select("svg")
    .append("g")
    .call(makeAnnotationsE);

    d3.select("svg")
    .append("g")
    .call(makeAnnotationsD);

    d3.select("svg")
    .append("g")
    .call(makeAnnotationsG);

  d3.select("svg")
    .append("g")
    .attr("transform", "translate(50,50)")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return logScaleX(+d.AverageCityMPG);
    })
    .attr("cy", function(d) {
      return logScaleY(+d.AverageHighwayMPG);
    })
    .attr("r", function(d) {
      return 2 + +d.EngineCylinders;
    })
    .on("mouseover", function(d, i) {
      tooltip
        .style("opacity", 1)
        .style("left", "200px")
        .style("top", "10px")
        .html(
          "Make: " +
            d.Make +
            " ----" +
            " Avg_Higway_MPG: " +
            d.AverageHighwayMPG +
            " ---- " +
            " Avg_City_MPG: " +
            d.AverageCityMPG
        );
    })
    .on("mouseout", function(d, i) {
      tooltip.style("opacity", 0);
    });
}
