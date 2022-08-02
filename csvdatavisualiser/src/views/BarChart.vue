<template>
  <div class="
  container flex pt-5 flex-col md:items-center md:px-6 mx-auto ">
  <h1 class="errorMessage">{{msg}}</h1>
    <div class="header mb-6">
          
      <div class="datainput">
        <div class="upload-file">
          <label for="csv-file">Upload CSV File</label>
          <input type="file" id="csv-file" accept=".csv" @change="parse_csv"><br>
          <span>{{ this.fileName }}</span>
          </div>
          <div class="data-info">
            <input type="text" v-model="left" placeholder="Left">
            <input type="text" v-model="bottom" placeholder="Bottom">
            <input type="text" v-model="title" placeholder="Title">
            </div>
             <div>
              <button @click="getContent">Visualise</button>
              <button @click="printSection">Print</button>
            </div>
      </div>
  </div>
  <div class="" :contents="contents">
         
      </div>
      <div id="printSection" class="w-full">
    <svg></svg></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import * as html2canvas from "html2canvas"
import jsPDF from "jspdf"
import _ from "lodash";
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
    title:'',
    msg:'',
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
    this.left ="";
    this.bottom ="";
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

      if(this.data){
        this.msg = ""
      }
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
      const margin = 90;
  const svg_width = 1000;
  const svg_height = 1000;
  const chart_width = 1000 - 2 * margin;
  const chart_height = 650 - 2 * margin;
 
 console.log(contents_val)
  const svg = d3
    .select("svg")
    // .attr("width", svg_width)
    // .attr("height", svg_height);
    .attr("viewBox", `0 0 ${svg_width} ${svg_height}`)
    

    this.chart = svg
    .append("g")
    .attr("transform", `translate(${margin}, ${margin})`)
    
 
  const yScale = d3
    .scaleLinear()
    .range([chart_height, 0])
    .domain([0, d3.max(contents_val, (g) => {
      if(this.left){
        console.log(g[this.left])
return g[this.left];
      }
       })]);
 
  this.chart
    .append("g")
    .call(d3.axisLeft(yScale).ticks(_.maxBy(contents_val, "contents")))
    .style("stroke-width", 2)
    .style("font-size", 15)
    .attr("color", "#540374");

  const xScale = d3
    .scaleBand()
    .rangeRound([0, chart_width])
    .domain(contents_val.map((g) => {
      if(this.bottom){
        return g[this.bottom]
      }
      }))
    .padding(0.5);
 
  this.chart
    .append("g")
    .attr("transform", `translate(0, ${chart_height})`)
    .call(d3.axisBottom(xScale))
    .style("stroke-width", 2)
    .style("font-size", 20)
    .attr("color", "#540374");

const color = d3.scaleOrdinal()
.range(["#1aa590", "#003c57", "#8a9b2e", "#22d0b6", "#27a0cc", "#118c7b", "#746cb1",
"#871a5b"])
.domain(contents_val.map((g) => {
  if(this.bottom){
        return g[this.bottom]
      }
}));

    const barGroups = this.chart
    .selectAll("rect")
    .data(contents_val)
    .enter();

  barGroups
    .append("rect")
    .attr("class", "bar")
    .attr("fill", color)
    .attr("rx", 5)
    .attr("x", (g) => {
      if(this.bottom){
        return xScale(g[this.bottom])
      }})
    .attr("y", (g) => {
      if(this.left){
return yScale(g[this.left]);
      }
    })
    .attr("width", xScale.bandwidth())
    .transition()
    .duration(4000)
    .attr("height", (g) => {
      if(this.left){
        return chart_height - yScale(g[this.left]);
      }
     })
    
    svg
  .append('text')
  .attr('class', 'label')
  .attr('x', -(chart_height / 2) - margin)
  .attr('y', margin / 2.4)
  .attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'middle')
  .text(() => {
      if(this.left){
          return this.left;
      }
    })
    .style("font-size", 30)
  .style("fill", "#540374")
    .style("text-transform", "uppercase")
 
svg
  .append('text')
  .attr('class', 'label')
  .attr('x', chart_width / 2 + margin)
  .attr('y', chart_height + margin * 1.7)
  .attr('text-anchor', 'middle')
  .text(() => {
      if(this.bottom){
          return this.bottom;
      }
    })
    .style("font-size", 30)
  .style("fill", "#540374")
    .style("text-transform", "uppercase")
 
svg
  .append('text')
  .attr('class', 'title')
  .attr('x', chart_width / 2 + margin)
  .attr('y', 30)
  .attr('text-anchor', 'middle')
  .text(() => {
      if(this.title){
          return this.title;
      }
    })
  .style("font-size", 30)
  .style("fill", "#540374")
    .style("text-transform", "uppercase")

  console.log(this.contents);
  this.left = "";
  this.bottom = "";
  this.title = "";
  },
  printSection() {
    if(this.chart){
      var doc = new jsPDF("l", "pt", "a4");
      var element = document.getElementById('printSection');
      var  width = element.style.width;
      var  height = element.style.height;
      html2canvas(element).then((canvas) =>{
        const img = canvas.toDataURL("image/png");

        doc.addImage(img, "PNG", 140, 80, width, height);
        doc.save("Chart.pdf")

      })
    }else{
      this.msg = "Please upload a file!"
    }
      }
}
}
</script>

<style scoped>

</style>
