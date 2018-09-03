import * as d3 from 'd3';
import data from '../common/data';
import '../common/style.scss';

function plotChart() {
    const svgWidth = 800;
    const svgHeight = 320;
    const margin = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
    };
    const barSpacing = 4;
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select("#app").append("svg")
            .classed("chart", true)
			.attr("id", "chart")
			.attr("width", svgWidth)
            .attr("height", svgHeight);

    // Create a scale based on data
    // This will be used to compute bar widths
    const xFunction = d3.scaleLinear()
		.domain([0, d3.max(data, function(d){
			return d.value;
        })])
        .range([0, width]);

    // Create a scale based on data
    // This will be used to compute bar heights
    const yFunction = d3.scaleLinear()
		.domain([0, data.length])
        .range([0, height]);

    // Create a color scale that ranges from a shade of green
    const colorFunction = d3.scaleLinear()
        .domain([0, data.length])
        .interpolate(d3.interpolateHcl)
        .range(['#6EE894', "#4A9C63"]);
    
    const chart = svg.append("g")
        .classed("display", true)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        chart.selectAll('.bar')
        .data(data)
        .enter()
            .append('rect')
            .classed('bar', true)
            .attr("x", 0)
			.attr("y", function(d,i){
				return yFunction(i);
			})
			.attr("height", function(d,i){
				return yFunction(1) - barSpacing;
			})
			.attr("width", function(d){
				return xFunction(d.value);
            })
            .attr("fill", function(d, i) {
                return colorFunction(i);
            });
        
        chart.selectAll('.bar-label')
        .data(data)
        .enter()
            .append("text")
            .classed("bar-label", true)
            .attr("x", function(d){
                return xFunction(d.value);
            })
            .attr("dx", -4)
            .attr("y", function(d,i){
                return yFunction(i);
            })
            .attr("dy", function(d,i){
                return yFunction(1)/1.5+2;
            })
            .text(function(d){
                return `${d.key}: ${d.value}`;
            })
    
    
}

export default plotChart;
