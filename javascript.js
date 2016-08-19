$(document).ready(function() {
    
    


    //Get url for API request
    var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

    
    $.get(url, function(data) {
        
        var gdp_data = JSON.parse(data);
        gdp_data = gdp_data.data;
        
  
        
        //Set up the chart on the page
        var w = 800;
        var h = 450;
        
        //Axis
        //Flip y axix so that range starts at h and goes to 0 (bottom to top)
        var y = d3.scaleLinear()
            .domain([0, d3.max(gdp_data, function(d) {
                return d[1];
            })])
            .range([h, 0]);
        
        var x = d3.scaleLinear()
            .domain([0, gdp_data.length])
            .range([0, w]);
        


        
        //Append an SVG tag to the page
        var svg = d3.select("body").append("svg")
            .attr("id", "chart")
            .attr("width", w)
            .attr("height", h);
        
        
        //Select and create "bar" class and bind a bar to each piece of data that we have
        svg.selectAll(".bar")
            .data(gdp_data)
            .enter()
                .append("rect")
                .classed("bar", true)
                .attr("x", function(d, i) {
                    return x(i);
                })
                .attr("y", function(d, i) {
                    return y(d[1]);
                })
                .attr("width", function(d, i) {
                    return x(1);
                })
                .attr("height", function(d, i) {
                    return h - y(d[1]);

                })
        
        
    }); //End GET request
    
    
    
    
    
    


//    var w = 800;
//    var h = 450;
//    
//    var margin = {
//        top: 20,
//        bottom: 20,
//        left: 20,
//        right: 20
//    };
//    
//    var width = w - margin.left - margin.right;
//    var height = h - margin.top - margin.bottom;
//    
//    
//    var data = [
//        { key: "Glazed", value: 132 },
//        { key: "Jelly", value: 71 },
//        { key: "Holes", value: 337 },
//        { key: "Sprinkles", value: 93 },
//        { key: "Crumb", value: 78 },
//        { key: "Chocolate", value: 43 },
//        { key: "Coconut", value: 20 },
//        { key: "Cream", value: 16 },
//        { key: "Cruller", value: 30 },
//        { key: "Eclair", value: 8 },
//        { key: "Fritter", value: 17 },
//        { key: "Bearclaw", value: 21 }
//    ]
//    
//
//    var x = d3.scaleLinear()
//            .domain([0, d3.max(data, function(d) {
//                return d.value;
//            })])
//            .range([0, width]);
//    
//    var y = d3.scaleBand()
//            .domain(data.map(function(entry) {
//                return entry.key;
//            }))
//            .range([0, height]);
//    
//    var linearColorScale = d3.scaleLinear()
//            .domain([0, data.length])
//            .range(["#572500", "#F68026"]);
//
//    var ordinalColorScale = d3.scaleOrdinal(d3.schemeCategory20);
//    
//    var xAxis = d3.select(".axis")
//            .call(d3.axisBottom(x));
//    
//    var yAxis = d3.select(".axis")
//            .call(d3.axisLeft(y));
//   
    
    
    
    
    
    
//    var svg = d3.select("body").append("svg")
//        .attr("id", "chart")
//        .attr("width", w)
//        .attr("height", h);
//    
//    
//    var chart = svg.append("g")
//        .classed("display", true)
//        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//    
//    
//    
//    function plot(params) {
//        
//        this.selectAll(".bar")
//        .data(params.data)
//        .enter()
//            .append("rect")
//            .classed("bar", true)
//            .attr("x", 0)
//            .attr("y", function(d, i) {
//                return y(d.key);
//            })
//            .attr("width", function(d, i) {
//                return x(d.value);
//            })
//            .attr("height", function(d, i) {
//                return y.bandwidth() - 1;
//            })
//            .style("fill", function(d, i) {
//                return ordinalColorScale(i);
//            });
//    
//        this.selectAll(".bar-label")
//            .data(params.data)
//            .enter()
//                .append("text")
//                .classed("bar-label", true)
//                .attr("x", function(d, i) {
//                    return x(d.value);
//                })
//                .attr("y", function(d, i) {
//                    return y(d.key);
//                })
//                .attr("dy", function(d, i) {
//                    return y.bandwidth()/1.5 + 2;
//                })
//                .text(function(d, i) {
//                    return d.value;
//                });
//        
//        console.log(xAxis);
//        this.append("g")
//            .classed("x axis", true)
//            .attr("transform", "translate(0,0)")
//            .call(xAxis);
//        
//        
//        
//    } //End plot function
//    
//    
//    var data_obj = {
//        data: data
//    }
//    
//    plot.call(chart, data_obj); 
    
    
}); //End whole document


