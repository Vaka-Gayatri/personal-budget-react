import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

function PieChart(props) {
  const [data, setdata] = useState([]);
  const width = 2 * props.outerRadius + props.margin.left + props.margin.right;
  const height = 2 * props.outerRadius + props.margin.top + props.margin.bottom;

  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateCool)
    .domain([0, data.length]);

  function drawChart() {
    console.log(data);
    d3.select("#pie-container").select("svg").remove();

    const svg = d3
      .select("#pie-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");
    svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const arcGenerator = d3
      .arc()
      .innerRadius(props.innerRadius)
      .outerRadius(props.outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.budget);

    const arc = svg.selectAll().data(pieGenerator(data)).enter();

    arc
      .append("path")
      .attr("d", arcGenerator)
      .style("fill", (_, i) => colorScale(i))
      .style("stroke", "#ffffff")
      .style("stroke-width", 0);

    arc
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text((d) => d.data.title)
      .style("fill", (_, i) => colorScale(data.length - i))
      .attr("transform", (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
  }

  useEffect(() => {
    if(data.length > 0){
        drawChart();
    }
  else {
    axios.get("http://localhost:4000/budget").then((res) => {
        const data = res.data;
        setdata(data);
      });
    }
  });
  return <div id="pie-container" />;
}

export default PieChart;