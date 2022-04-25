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
  const svg_width = 400;
  const svg_height = 400;
  const svg_radius = Math.min(svg_width, svg_height) / 2;
  var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  
  const svg = d3
    .select("svg")
    .attr("width", svg_width)
    .attr("height", svg_height)
    .attr("radius", svg_radius);

    this.chart = svg
    .append("g")
    .attr("transform", "translate(" + svg_width / 2 + "," + svg_height / 2 +")");
 
  const pie = d3.pie().value((g) => {
      return g.percent;
  })
  const path = d3.arc().outerRadius(svg_radius - 10).innerRadius(0);

  const label = d3.arc().outerRadius(svg_radius).innerRadius(svg_radius - 80);

    const PieGroups = this.chart
    .selectAll(".arc")
    .data(pie(contents_val))
    .enter()
    .append("g")
    .attr("class", "arc");
 
  PieGroups
    .append("path")
    .attr("d", path)
    .attr("fill", (g) => {return colorScale(g)})
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
 
PieGroups
    .append("text")
    .attr("transform", (g) => { 
               return "translate(" + label.centroid(g) + ")"; 
            })
    .text((g) => {
        return g.data.states;
    })
    
    .style("text-anchor", "middle")
    .style("font-size", 17);

svg
  .append('g')
  .append("text").text("Top population")
  .attr("class", "title")
  }
}
}
</script>

<style scoped>

.title {
   fill: green;
   font-weight: italic;
}
</style>
