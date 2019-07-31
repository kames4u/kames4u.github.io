async function init() {
  data = await d3.csv("https://flunky.github.io/cars2017.csv");

  var keys = data.columns.slice(3);

  var fuel = [...new Set(data.map(d => d.Fuel))];
  //var states = [...new Set(csv.map(d => d.State))];

  console.log(keys);
  var options = d3
    .select("#fuel")
    .selectAll("option")
    .data(fuel)
    .enter()
    .append("option")
    .text(d => d);

  update(d3.select("#fuel").property("value"), data);

  console.log(d3.select("#fuel").property("value"));
  var select = d3.select("#fuel").on("change", function() {
    update(this.value, data);
  });
}

function update(input, csv) {
  var newdata = csv.filter(f => f.Fuel == input);

  console.log(newdata);
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
  .selectAll("circle")
  .remove();

  d3.select("svg")
    .append("g")
    .attr("transform", "translate(50,50)")
    .selectAll("circle")
    .data(newdata)
    .enter()
    .append("circle")
    .transition()
      .delay(50)
      .duration(300)
    .attr("cx", function(d) {
      return logScaleX(+d.AverageCityMPG);
    })
    .attr("cy", function(d) {
      return logScaleY(+d.AverageHighwayMPG);
    })
    .attr("r", function(d) {
      return 2 + +d.EngineCylinders;
    });
}
