// Make a gantt chart
//
var width = document.getElementById('graph').clientWidth;
var lines = [
    { value: 1, color: 'red', name: 'Jalla' },
    { value: 2, color: 'green', name: 'Sakadalla' },
    { value: 3, color: 'orange', name: 'Humdidum' },
];

var barHeight = 30;
var padding = 3;
var lineHeight = barHeight + padding * 2;
var yAxisWidth = 100;
var xAxisHeight = 30;
var height = lineHeight * lines.length + xAxisHeight;

var maxValue = d3.max(ganttData, function(d) { return d.stop; });
var scaleX = d3.scaleLinear()
    .domain([0, maxValue])
    .range([yAxisWidth, width]);


var svg = d3.selectAll('#graph')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'svg');

// draw vertical and horizontal grid lines
svg.append('g')
    .attr('class', 'grid')
    .attr('transform', 'translate(0,' + (height-xAxisHeight) + ')')
    .call(d3.axisBottom(scaleX).tickSize(-height).tickFormat(''));

svg.append('g')
    .attr('class', 'grid')
    .selectAll('line')
    .data(lines)
    .enter()
    .append('line')
    .attr('x2', width)
    .attr('transform', d => 'translate(0,' + ((d.value-1) * lineHeight + 1) + ')' );

// Draw the boxes
var rects = svg.append('g')
    .selectAll('rect')
    .data(ganttData)
    .enter()
    .append('rect')
    .attr('x', d => scaleX(d.start))
    .attr('y', d => d.type * lineHeight + padding)
    .attr('height', barHeight)
    .attr('width', d => scaleX(d.stop - d.start))
    .attr('fill', d => d.color);

// Draw the bottom axis
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
    .attr('transform', d => 'translate(0,' + (d.value * lineHeight - lineHeight/2) + ')' )
    .attr('height', barHeight-3)
    .attr('dominant-baseline', 'central')
    .text(d => d.name);

// Add some icons to the bottom line
var iconLineStart = lineHeight * 2 + padding;
svg.append('g')
    .selectAll('image')
    .data(icons)
    .enter()
    .append('image')
    .attr('y', iconLineStart)
    .attr('x', d => scaleX(d.start) - barHeight/2)
    .attr('width', barHeight)
    .attr('length', barHeight)
    .attr('xlink:href', d => d.icon + '.png');
