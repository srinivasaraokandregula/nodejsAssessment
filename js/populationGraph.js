/******************************************************************************
Author : Srinivasarao Kandregula

*******************************************************************************/
//see D3 Margin convention : http://bl.ocks.org/mbostock/3019563o
var margin={ top:20, right:10, bottom: 100, left:40},
    width=700 - margin.right-margin.left,
    height=500- margin.top-margin.bottom;
/******************************************************************************
Define SVG
Still confused  about SVG? see the chapter -3
The 'g' element used as a container for grouping objects,
The SVG will be in "lightgrey" background to help to visualize it.
see
*****************************************************************************/
var svg_population=d3.select('#population')
        .append('svg')
        .attr({
        "width": width + margin.right + margin.left,
        "height": height + margin.top + margin.bottom
        })
        .append('g')
            .attr("transform", "translate(" + margin.left + ',' + margin.right + ')');

/*****************************************************************************
SCALE and AXIS are two different methods of d3.
See D3API referance for info on AXIS and SCALE.
See d3 api referance to understand different between Oridnal vs linear SCALE
******************************************************************************/
var xScale=d3.scale.ordinal()
.rangeRoundBands([0,width], 0.2,0.2);
var yScale=d3.scale.linear()
.range([height, 0]);
//define axis
var xAxis=d3.svg.axis()
    .scale(xScale)
    .orient("bottom");
var yAxis=d3.svg.axis()
    .scale(yScale)
    .orient("left");

/******************************************************************************
TO understand how toimport data.See d3 api referance on json file.
Understand the different between .tsv ,csv and json files,
To import .tsv and csv file use d3.tsv or d3.csv(), respectively
*****************************************************************************/
d3.json("json/population.json", function(error, data){
    if(error){
    console.log("Error");
    }
 /***************************************************************************
  Convert data with necessary . we want to make our graph value are represented
  as integer ratherthan the string. Use "+" before the variable to convert a string
  representing of number to an actual number. Sometimes time the data will be number
  format, but when in doubt use "+" to avoid issues

  ****************************************************************************/
  data.forEach(function(d){
        d.Population2013=+ d.Population2013;
        d.CountryName=d.CountryName;
        console.log(d.popultion2013);
    });
    data.sort(function(a,b){
    return b.Population2013- a.Population2013;
    });
// specify the domains of x and y scales
xScale.domain(data.map(function(d){
    return d.CountryName;
}));
yScale.domain([0, d3.max(data, function(d){
    return d.Population2013;
})]);
//draw the bars
svg_population.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y", height)
    .transition().duration(3000)
    .delay(function(d,i){
        return i*200;
    })
    .attr({
        'x': function(d){
        return xScale(d.CountryName);
        },
        'y': function(d){
        return yScale(d.Population2013);
        },
        "width": xScale.rangeBand(),
        "height": function(d){
        return height-yScale(d.Population2013);
        }
    });

// append x axis and y axis
svg_population.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis)
    .selectAll('text')
    .attr("transform", "rotate(-60)")
    .attr("dx","-0.8em")
    .attr("dy", "-0;.25em")
    .style("text-anchor","end")
    .style("font-size", "12px");
svg_population.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .style("font-size", "12px");
});
