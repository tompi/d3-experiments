// Make a gantt chart
//
var width = document.getElementById('graph').clientWidth;
var lines = [
    { value: 1, color: 'red', name: 'Jalla' },
    { value: 2, color: 'green', name: 'Sakadalla' }
];

var barHeight = 30;
var yAxisWidth = 100;
var xAxisHeight = 30;
var height = barHeight * lines.length + xAxisHeight;

var maxValue = d3.max(ganttData, function(d) { return d.stop; });
var scaleX = d3.scaleLinear()
    .domain([0, maxValue])
    .range([yAxisWidth, width]);


var svg = d3.selectAll('#graph')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'svg');

function getBarColor(d) {
    return d.type == 0 ? 'green' : 'red';
}

// draw vertical grid lines
svg.append('g')
    .attr('class', 'grid')
    .attr('transform', 'translate(0,' + (height-xAxisHeight) + ')')
    .call(d3.axisBottom(scaleX).tickSize(-height).tickFormat(''));

// Draw the boxes
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

var xAxis = d3.axisBottom(scaleX).tickFormat(formatSeconds);
svg.append('g')
    .attr('transform', 'translate(0,' + (height-xAxisHeight) + ')' )
    .call(xAxis);

// https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
function formatSeconds(seconds) {
    var sec_num = parseInt(seconds, 10); // don't forget the second param
    var minutes = Math.floor( sec_num / 60);
    var seconds = sec_num - (minutes * 60);

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
}

// Draw the labels(y-axis labels)
svg.append('g')
    .selectAll('text')
    .data(lines)
    .enter()
    .append('text')
    .attr('y', (d, ix) => ix*barHeight)
    .attr('height', barHeight-3)
    .text(d => d.name);

