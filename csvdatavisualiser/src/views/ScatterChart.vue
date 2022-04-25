<template>
  <div class="hello">
    <div class="header">
          
      <div class="datainput">
          <input type="file" accept=".csv" @change="parse_csv"><br>
          <button @click="getContent">Visualise</button>
      </div>
  </div>
  <div class="" :contents="contents">
          
      </div>
    <svg></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
data(){
  return{
    parsed_csv: null,
      uploaded_csv_data: null,
      feedback: null,
      contents: [],
    chart:null
  };
},
watch:{
  contents(val){
    if (this.chart != null) this.chart.remove();
    this.renderChart(val);
  }
},
methods:{
  async parse_csv(e) {
      let raw_results = [];
      let files = e.target.files || e.datatransfer.files;
      if (!files.length) return (this.feedback = "Invalid File");
      var file = e.target.files[0];
      await this.$papa.parse(file, {
        header: true,
        complete: (results) => {
          raw_results = results;
          return this.stage_uploaded_csv(results);
        },
      });
      console.log("rawresults", raw_results);
    },
    stage_uploaded_csv(csv_read_results) {
      console.log("STAGING CSV", csv_read_results);
      this.uploaded_csv_data = csv_read_results.data;
      console.log(csv_read_results);
      this.contents = csv_read_results.data
      console.log(this.contents)
    },
  renderChart(contents_val){
    
const width = 600;
const height = 500;
const spacing = 120
// const formatPercent = d3.format('.2%')
var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

// append the svg object to the body of the page
  const svg = d3
    .select("svg")
    .attr("width", width)
    .attr("height", height);

    this.chart = svg
    .append("g")
    .attr('transform','translate(' + spacing/2 + ',' + spacing/2 + ')');
 
//scales
const xScale = d3.scaleLinear()
    .domain([d3.min(contents_val, (g) => {return g.gold;})-1, 
        d3.max(contents_val, (g) => {return g.gold;})+1])
    .range([0, width-spacing]);
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(contents_val, (g) => {return g.silver;})])
    .range([height-spacing, 0]);
 
 // X-axis
	const xAxis = d3.axisBottom(xScale);
  // Y-axis
	const yAxis = d3.axisLeft(yScale);
     // X-axis
  this.chart
  .append('g')
      .attr('transform', 'translate(0,' + (height - spacing) + ')')
      .call(xAxis);
    
  // Y-axis
  this.chart
  .append('g')
  .call(yAxis);
    

const scatterGroups = this.chart
    .selectAll("circle")
    .data(contents_val)
    .enter();
 
  scatterGroups
    .append("circle")
    .attr("cx",  (g) => { return xScale(g.gold)} )
    .attr("cy",  (g) => { return yScale(g.silver)} )
    .attr("r", 10)
    .attr('stroke','black')
    .attr('stroke-width',1)
    .attr('fill', (g) => {return colorScale(g)})
    .on('mouseover', function () {
        d3.select(this)
        .transition()
        .duration(500)
        .attr('r',20)
        .attr('stroke-width',3)
    })
    .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',10)
          .attr('stroke-width',1)
      })
  svg.selectAll("text")
  .data(contents_val).enter()
  .append("text")
  .text((g) => {
    return g.country})
  .attr("font-size", "10px")
   console.log(this.contents)
  }
}
}
</script>

<style scoped>
.bar{
  fill: #319bbe;
}
</style>
