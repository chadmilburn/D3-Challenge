// @TODO: YOUR CODE HERE!
// create axis variable
var selectedXAxis = "poverty";
var selectedYAxis = "healthcare";
// function to update xscale
function xScale(data, selectedXAxis, chartWidth) {
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[selectedXAxis])*.8,
        d3.max(data, d => d[selectedXAxis]) * 1.1])
        .range([0, chartWidth]);
    return xLinearScale;
}
// function to update xaxis
function renderXAxes(newXScale, xAxis){
    var bottomAxis = d3.axisBottom(newXScale);
    xAxis.transition()
    .duration(1000)
    .call(bottomAxis);
    return xAxis;
}