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
    <div id="printSection" class="w-full">
    <svg></svg></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import * as html2canvas from "html2canvas"
import jsPDF from "jspdf"
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
const parseDate = d3.timeParse("%d-%b-%y")

  const svg = d3
    .select("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom);
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${
    height + margin.top + margin.bottom}`)

    this.chart = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
  contents_val.forEach((g) =>{
    if(this.bottom){
    g[this.bottom] = parseDate(g[this.bottom])
    g[this.left] = +g[this.left]
    }
  })

  const yScale = d3
    .scaleLinear()
    .range([height, 0])
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
    .range([0, width])
    .domain(d3.extent(contents_val, (g) => {
      if(this.bottom){
        return g[this.bottom]
      }
      }));

  this.chart
    .append("g")
    .attr("transform", "translate(0, " + height + ")")
    .call(d3.axisBottom(xScale));

//define the line
const line = d3.line()
.x((g) => {
        return xScale(g[this.bottom])
})
.y((g) => {
    return yScale(g[this.left]);
})
// .curve(d3.curveCardinal)


this.chart
    .append("path")
    .data([contents_val])
    .attr("class", "line") 
   .attr("d", line)
        .attr("transform", "translate(" + 0 + "," + 100 + ")")
    .style("fill", "none")
    .style("stroke", "#540374")
    .style("stroke-width", "3");

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
        .attr("r", 8)
        .attr("transform", "translate(" + 0 + "," + 100 + ")")
        .style("fill", "#540374");

svg
  .append('text')
  .attr('class', 'label')
  .attr('x', -(height / 2))
  .attr('y', 50 / 2.4)
  .attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'middle')
  .text(() => {
      if(this.left){
          return this.left;
      }
    })
    .style("font-size", 20)
    .style("fill", "#540374");
 
svg
  .append('text')
  .attr('class', 'label')
  .attr('x', width/2)
  .attr('y', height + 80)
  .attr('text-anchor', 'middle')
  .text(() => {
      if(this.bottom){
          return this.bottom;
      }
    })
    .style("font-size", 20)
    .style("fill", "#540374");
 
svg
  .append('text')
  .attr('x', width / 2 + margin)
  .attr('y', 40)
  .attr('text-anchor', 'middle')
  .text(() => {
      if(this.title){
          return this.title;
      }
    })
  .style("font-size", 30)


        this.left = "";
        this.bottom = "";
  },
   printSection() {
      var doc = new jsPDF("l", "pt", "a4");
      var element = document.getElementById('printSection');
      var  width = element.style.width;
      var  height = element.style.height;
      html2canvas(element).then((canvas) =>{
        const img = canvas.toDataURL("image/png");

        doc.addImage(img, "PNG", 140, 80, width, height);
        doc.save("Chart.pdf")

      })
      }
}
}
</script>

<style scoped>

</style>
