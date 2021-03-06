$(document).ready(function() {
    
    


    //Get url for API request
    var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

    
    $.get(url, function(data) {
        
        var gdp_data = JSON.parse(data);
        gdp_data = gdp_data.data;
        
  
        var info = function(info) {
            //console.log("Date: " + info[0] + " GDP: " + info[1]);

//            
//            var date = new Date(info[0]);
//            console.log(date.getFullYear());
//            console.log(date.getMonth());
        }
        
        var return_month = function(month) {
            
            switch (month) {
                case 0:
                    return "January";
                case 1:
                    return "February";
                case 2:
                    return "March";
                case 3:
                    return "April";
                case 4:
                    return "May";
                case 5:
                    return "June";
                case 6:
                    return "July";
                case 7:
                    return "August";
                case 8:
                    return "September";
                case 9:
                    return "October";
                case 10:
                    return "November";
                case 11:
                    return "December";
            }
            
        }
        
        
        //Set up the chart on the page
        var w = 1000;
        var h = 650;
        
        //Set chart margins
        //Virtually we shift the chart up and to the left when setting the y and x ranges
        //Then when we translate the chart it moves it down and to the right leaving us some margin to work with
        var margin = {
            top: 75,
            bottom: 125,
            right: 50,
            left: 75
        }
        
        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;
        
        //Axis
        //Flip y axix so that range starts at h and goes to 0 (bottom to top)
        var y = d3.scaleLinear()
            .domain([0, d3.max(gdp_data, function(d) {
                return d[1];
            })])
            .range([height, 0]);
        
        var x = d3.scaleLinear()
            .domain([0, gdp_data.length])
            .range([0, width]);
        

        var yearScale = d3.scaleTime()
            .domain([new Date("1947"), new Date("2015")])
            .range([0, width]);

        
        var yAxis = d3.axisLeft(y);
        var xAxis = d3.axisBottom(yearScale);
        
        
        //Append tooltip to the page
        var div = d3.select(".holder").append("div")
            .classed("tooltip", true)
            .style("opacity", "0")
            .style("height", "20")
            .html("GDP/Date");
        
        
      
        


        //Append an SVG tag to the page
        var svg = d3.select("body").append("svg")
                .attr("id", "chart")
                .attr("width", w)
                .attr("height", h);
                
        
        var chart = svg.append("g")
            .classed("display", true)
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
        
        //Select and create "bar" class and bind a bar to each piece of data that we have
        chart.selectAll(".bar")
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
                    return height - y(d[1]);
                })
                .on("mouseover", function(d, i) {
                    info(d);
                    //Set up needed variables
                    var date = new Date(d[0]);
                    var year = date.getFullYear();
                    var month = return_month(date.getMonth());
            
                    //Change color of bar user if hovering over
                    d3.select(this).attr("class", "active_bar");
                    //Show the tooltip
                    d3.select(".tooltip")
                        .style("opacity", ".9")
                        .style("left", (d3.event.pageX) + 5 + "px")
                        .style("top", (d3.event.pageY) - 72 + "px")
                        .html("<h5>$" + d[1] + " Billion</h5><p>" + month + " - " + year + "</p>");
                

                })
                .on("mouseout", function(d, i) {
                    //Change color of bar back to normal once user no longer hovering
                    d3.select(this).attr("class", "bar");
                    //Hide the tooltip
                    d3.select(".tooltip").style("opacity", "0");
                })
                
        
        //Add the x axis to the chart as a separate "g" group
        chart.append("g")
            .classed("xAxis", true)
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        
        //Add the y axis to the chart as a separate "g" group
        chart.append("g")
            .classed("yAxis", true)
            .attr("transform", "translate(0,0)")
            .call(yAxis);
        
        //Add chart labels and titles
        chart.select(".yAxis")
            .append("text")
            .attr("x", 0)
            .attr("y", 0)
            .style("text-anchor", "middle")
            .style("fill", "black")
            .attr("transform", "translate(20,105) rotate(-90)")
            .text("Gross Domestic Product, USA");
        
        chart.select(".xAxis")
            .append("text")
            .attr("x", 0)
            .attr("y", 0)
            .style("text-anchor", "middle")
            .style("fill", "black")
            .style("font-size", "12")
            .attr("transform", "translate(" + width/2 + "," + margin.bottom/2 + ")")
            .text("Units: Billions of Dollars Seasonal Adjustment: Seasonally Adjusted Annual Rate Notes: A Guide to the National Income and Product Accounts of the United States (NIPA) - ");
        
        //Make second half of long text
        chart.select(".xAxis")
            .append("text")
            .attr("x", 0)
            .attr("y", 0)
            .style("text-anchor", "middle")
            .style("fill", "black")
            .style("font-size", "12")
            .attr("transform", "translate(" + width/2 + "," + (margin.bottom/2 + 14) + ")")
            .text("(http://www.bea.gov/national/pdf/nipaguid.pdf)");
        
        chart.select(".yAxis")
            .append("text")
            .attr("x", 0)
            .attr("y", 0)
            .style("text-anchor", "middle")
            .style("fill", "black")
            .style("font-size", "40")
            .attr("transform", "translate(" + width/2 + ",0)")
            .text("Gross Domestic Product");
        
    }); //End GET request
    
    
    
//    var svg = d3.select("body").append("svg")
//                .attr("id", "chart")
//                .attr("width", w)
//                .attr("height", h)
//                .classed("axis", true)
//            .append("g")
//                .classed("display", true)
//                .attr("transform", "translate(0,400)")
//                .call(d3.axisBottom(x));
//    
    


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


