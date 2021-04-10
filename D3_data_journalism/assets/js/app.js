// @TODO: YOUR CODE HERE!
// create axis variable
var selectedXAxis = "poverty";
var selectedYAxis = "healthcare";
// function to update xscale
function xScale(data, selectedXAxis, chartWidth) {
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[selectedXAxis]) * .8,
        d3.max(data, d => d[selectedXAxis]) * 1.1])
        .range([0, chartWidth]);
    return xLinearScale;
}
// function to update xaxis
function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    return xAxis;
}
// function to update yscale
function yScale(data, selectedYAxis, chartHeight) {
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[selectedYAxis]) * .8,
        d3.max(data, d => d[selectedYAxis]) * 1.1])
        .range([chartHeight, 0]);
    return yLinearScale;
}
//  function to update yaxis
function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
    yAxis.transition()
        .duration(1000)
        .call(leftAxis);
    return yAxis;
}
// Updateing marker circles
function renderCircles(circlesGroup, newXScale, newYScale, selectedXAxis, selectedYAxis) {
    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[selectedXAxis]))
        .attr("cx", d => newYScale(d[selectedYAxis]));
    return circlesGroup;
}

//  text in markers 
function renderText(circlesTextGroup, newXScale, newYScale, selectedXAxis, selectedYAxis) {
    circlesTextGroup.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[selectedXAxis]))
        .attr("y", d => newYScale(d[selectedYAxis]));
    return circlesTextGroup;
}
// circle tool tooltip
function updateToolTip(selectedXAxis, selectedYAxis, circlesGroup, textGroup) {
    //  conditionals x 
    if (selectedXAxis === "poverty") {
        var xlabel = "Poverty";
    } else if (selectedXAxis === "income") {
        var xlabel = "Median Income";
    } else {
        var xlabel = "Age"
    }
    //  conditionals y
    if (selectedYAxis === "healthcare") {
        var ylabel = "Lacks Healthcare";
    } else if (selectedYAxis === "smokes") {
        var ylabel = "Smokers"
    } else {
        var ylabel = "Obesity"
    }
    // tool tips
    var toolTip = d3.tip()
        .offset([120, -60])
        .attr("class", "d3-tip")
        .html(function (d) {
            if (selectedXAxis === "age") {
                //  y tips as percentage
                return (`${d.state}<hr>${xlabel} ${d[selectedXAxis]}<br>${ylabel}${d[selectedYAxis]}%`)
            } else if (selectedXAxis !== "poverty" && selectedXAxis !== "age") {
                // income in $ x axis
                return (`${d.state}<hr>${xlabel}$${d[selectedXAxis]}<br>${ylabel}${d[selectedYAxis]}%`)
            } else {
                //  poverty as % x axis
                return (`${d.state}<hr>${xlabel}${d[selectedXAxis]}%<br>${ylabel}${d[selectedYAxis]}%`)
            }
        });
    circlesGroup.call(toolTip)
    // mouse over events
    circlesGroup
        .on("mouseover", function (data) {
            toolTip.show(data, this)
        })
        .on("mouseout", function (data) {
            toolTip.hide(data)
        })
    textGroup
        .on("mouseover", function (data) {
            toolTip.show(data, this)
        })
        .on("mouseout", function (data) {
            toolTip.hide(data)
        })
    return circlesGroup
}

