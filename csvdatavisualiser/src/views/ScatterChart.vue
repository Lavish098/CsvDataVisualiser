<template>
  <div class="hello pt-5 md:w-10/12 lg:w-3/4
  container flex flex-col md:items-center md:px-6 mx-auto md:space-y-0">
  <h1 class="errorMessage">{{msg}}</h1>
    <Loading v-show="loading"/>
    <div class="header">
          
      <div class="datainput">
         <div class="upload-file">
          <label for="csv-file">Upload CSV File</label>
          <input type="file" id="csv-file" accept=".csv" @change="parse_csv"><br>
          <span>{{ this.fileName }}</span>
          </div> 
          <div class="data-info">
            <!-- <p>Input the name of the header you want to use for your horizontal line</p> -->
            <input type="text" v-model="left" placeholder="Left">
              <!-- <p>Input the name of the header you want to use for your vertical line</p> -->
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
import Loading from "../components/Loading.vue"
export default {
  components:{
    Loading
  },
data(){
  return{
    parsed_csv: null,
      uploaded_csv_data: null,
      feedback: null,
      contents: [],
      data:[],
      left:'',
      bottom:'',
      title:'',
      msg: '',
    chart:null,
    loading:null,
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
    
    if(this.data){
      this.msg = ""
    }
      console.log(this.data)
    },
    getContent(){
      this.loading = true;
        this.contents = this.data.data;
        this.loading = false;

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
const width = 600;
const height = 500;
const spacing = 120
// const formatPercent = d3.format('.2%')
// var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

// append the svg object to the body of the page
  const svg = d3
    .select("svg")
    // .attr("width", width)
    // .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`);

    this.chart = svg
    .append("g")
    .attr('transform','translate(' + spacing/2 + ',' + spacing/2 + ')');
 
//scales
const xScale = d3.scaleLinear()
    .domain([d3.min(contents_val, (g) => {
      if(this.bottom){
        return g[this.bottom]
      }})-1, 
        d3.max(contents_val, (g) => {
          if(this.bottom){
        return g[this.bottom]
      }
        })+1])
    .range([0, width-spacing]);
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(contents_val, (g) => {
      if(this.left){
return g[this.left];
      }
    })])
    .range([height-spacing, 0]);
 
 // X-axis
	const xAxis = d3.axisBottom(xScale);
  // Y-axis
	const yAxis = d3.axisLeft(yScale);
     // X-axis
  this.chart
  .append('g')
      .attr('transform', 'translate(0,' + (height - spacing) + ')')
    .attr("color", "#540374")
      .call(xAxis);
    
  // Y-axis
  this.chart
  .append('g')
    .attr("color", "#540374")
  .call(yAxis);

    const color = d3.scaleOrdinal()
.range(["#1aa590", "#003c57", "#8a9b2e", "#22d0b6", "#27a0cc", "#118c7b", "#746cb1",
"#871a5b"])
.domain(contents_val.map((g) => {
  if(this.bottom){
        return g[this.bottom]
      }
}));

const scatterGroups = this.chart
    .selectAll("circle")
    .data(contents_val)
    .enter();
 
  scatterGroups
    .append("circle")
    .attr("cx",  (g) => { 
      if(this.bottom){
        return xScale(g[this.bottom])
      }} )
    .attr("cy",  (g) => { 
      if(this.left){
return yScale(g[this.left]);
      }} )
      .transition()
    .duration(4000)
    .attr("r", 10)
    .attr('stroke-width',1)
    .attr('fill', color)
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

  svg
  .append('text')
  .attr('class', 'label')
  .attr('x', -(height / 2) - margin)
  .attr('y', margin / 2.4)
  .attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'end')
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
  .attr('x', width / 2 + margin)
  .attr('y', height + margin * 1.7)
  .attr('text-anchor', 'end')
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
  .attr('x', width / 2)
  .attr('y', 0)
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
.bar{
  fill: #319bbe;
}
</style>
