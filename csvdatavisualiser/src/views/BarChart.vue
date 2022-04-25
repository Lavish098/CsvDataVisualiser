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
import _ from "lodash";
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
      const margin = 60;
  const svg_width = 1000;
  const svg_height = 600;
  const chart_width = 1000 - 2 * margin;
  const chart_height = 600 - 2 * margin;
 
  const svg = d3
    .select("svg")
    .attr("width", svg_width)
    .attr("height", svg_height);

    this.chart = svg
    .append("g")
    .attr("transform", `translate(${margin}, ${margin})`);
 
  const yScale = d3
    .scaleLinear()
    .range([chart_height, 0])
    .domain([0, d3.max(contents_val, (g) => {return g.age; })]);
 
  this.chart
    .append("g")
    .call(d3.axisLeft(yScale).ticks(_.maxBy(contents_val, "contents")));
 
  const xScale = d3
    .scaleBand()
    .range([0, chart_width])
    .domain(contents_val.map((g) => {return g.name}))
    .padding(0.2);
 
  this.chart
    .append("g")
    .attr("transform", `translate(0, ${chart_height})`)
    .call(d3.axisBottom(xScale));

    const barGroups = this.chart
    .selectAll("rect")
    .data(contents_val)
    .enter();
 
  barGroups
    .append("rect")
    .attr("class", "bar")
    .attr("x", (g) => {return xScale(g.name)})
    .attr("y", (g) => {return yScale(g.age)})
    .attr("height", (g) => {return chart_height - yScale(g.age)})
    .attr("width", xScale.bandwidth());

    svg
  .append('text')
  .attr('class', 'label')
  .attr('x', -(chart_height / 2) - margin)
  .attr('y', margin / 2.4)
  .attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'middle')
  .text('age')
 
svg
  .append('text')
  .attr('class', 'label')
  .attr('x', chart_width / 2 + margin)
  .attr('y', chart_height + margin * 1.7)
  .attr('text-anchor', 'middle')
  .text('name')
 
svg
  .append('text')
  .attr('class', 'title')
  .attr('x', chart_width / 2 + margin)
  .attr('y', 40)
  .attr('text-anchor', 'middle')
  .text('Issues in the past 1 week')
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
