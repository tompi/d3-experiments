// Make a gantt chart
//
var width = document.getElementById('graph').clientWidth;
var height = window.innerHeight * 50 / 100;

var barHeight = 30;

var maxValue = d3.max(ganttData, function(d) { return d.stop; });
var scaleX = d3.scaleLinear()
    .domain([0, maxValue])
    .range([0, width]);

var svg = d3.selectAll('#graph')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'svg');

function getBarColor(d) {
    return d.type == 0 ? 'green' : 'red';
}

var rects = svg.append('g')
    .selectAll('rect')
    .data(ganttData)
    .enter()
    .append('rect')
    .attr('x', d => scaleX(d.start))
    .attr('y', d => d.type * barHeight)
    .attr('height', barHeight-3)
    .attr('width', d => scaleX(d.stop - d.start))
    .attr('fill', getBarColor);

svg.append('g')
    .attr('transform', 'translate(0,' + (height-30) + ')' )
    .call(d3.axisBottom(scaleX));

