<template>
  <div class="hello pt-5 md:w-10/12 lg:w-3/4">
    <div class="header">
          
      <div class="datainput">
         <div class="upload-file">
          <label for="csv-file">Upload CSV File</label>
          <input type="file" id="csv-file" accept=".csv" @change="parse_csv"><br>
          <span>{{ this.fileName }}</span>
          </div>
          <div class="data-info">
            <!-- <p>Input the name of the header you want to use for your horizontal line</p> -->
            <input type="text" v-model="left" placeholder="left">
            
              <!-- <p>Input the name of the header you want to use for your vertical line</p> -->
              <input type="text" v-model="bottom" placeholder="bottom">
              <button @click="getContent">Visualise</button>
              <button @click="printSection">Print</button>
            </div>
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
  components:{
  },
data(){
  return{
    parsed_csv: null,
      uploaded_csv_data: null,
      feedback: null,
      contents: [],
      data:[],
    chart:null,
    left:'',
    bottom:'',
    fileName:''
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
      if(file){
        this.fileName = file.name
      console.log(this.fileName)
      }
      await this.$papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          raw_results = results;
          return this.stage_uploaded_csv(results);
        },
      });
      console.log("rawresults", raw_results);
    },
    stage_uploaded_csv(csv_read_results) {
      console.log("STAGING CSV", csv_read_results);
      this.uploaded_csv_data = csv_read_results;
      console.log(csv_read_results);
      this.data = csv_read_results
      console.log(this.data)
    },
    getContent(){
        this.contents = this.data.data;
  for(const i in this.data.meta.fields){
        if(this.left === this.data.meta.fields[i]){
          console.log(this.left)
        }else{
          // console.log("error")
        }
  }
  for(const i in this.data.meta.fields){
        if(this.bottom === this.data.meta.fields[i]){
          console.log(this.bottom)
        }else{
          // console.log("error")
        }
  }
    },
  renderChart(contents_val){
//       const margin = 60;
//   const width = 1000;
//   const height = 600;
 
 const margin = { top: 40, right: 80, bottom: 60, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 580 - margin.top - margin.bottom;


  const svg = d3
    .select("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom);
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${
    height + margin.top + margin.bottom}`)

    this.chart = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 

  const yScale = d3
    .scaleLinear()
    .rangeRound([height, 0])
    .domain([0, d3.max(contents_val, (g) => {
      if(this.left){
return g[this.left];
      }
       })]);
 
  this.chart
    .append("g")
    .call(d3.axisLeft(yScale));
 
  const xScale = d3
    .scaleTime()
    .rangeRound([0, width])
    .domain(d3.extent(contents_val, (g) => {
      if(this.bottom){
        this.bottom
        return g[this.bottom]
      }
      }));

  this.chart
    .append("g")
    .attr("transform", "translate(0, " + height + ")")
    .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y")));

//define the line
const line = d3.line()
.x((g) => {
    if(this.bottom){
      console.log(xScale(g[this.bottom]))
        return xScale(g[this.bottom])
      }
})
.y((g) => {
    if(this.left){
    return yScale(g[this.left]);
      }
})
.curve(d3.curveCardinal)
//scatter dot
this.chart.append('g')
        .selectAll("dot")
        .data(contents_val)
        .enter()
        .append("circle")
        .attr("cx", (g) => {
    if(this.bottom){
        return xScale(g[this.bottom])
      }})
        .attr("cy", (g) => {
    if(this.left){
        return yScale(g[this.left])
      }})
        .attr("r", 2)
        .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .style("fill", "#CC0000");

    this.chart
    .append("path")
    .datum(contents_val)
    .enter()
    .attr("g", line)
    .style("fill", "none")
    .style("stroke", "#CC0000")
    .style("stroke-width", "2");
  }
}
}
</script>

<style scoped>

</style>
