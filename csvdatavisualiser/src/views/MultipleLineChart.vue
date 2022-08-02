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
            <input type="text" v-model="valueA" placeholder="Left">
            <input type="text" v-model="valueB" placeholder="Left">
            <input type="text" v-model="valueC" placeholder="Left">
              <!-- <p>Input the name of the header you want to use for your vertical line</p> -->
            <input type="text" v-model="bottom" placeholder="Bottom">
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
      valueA:'',
      valueB:'',
      valueC:'',
      bottom:'',
      msg:'',
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
        if(this.valueA === this.data.meta.fields[i]){
          console.log(this.valueA)
        }else{
          // console.log("error")
        }
        }
        for(const i in this.data.meta.fields){
        if(this.valueB === this.data.meta.fields[i]){
          console.log(this.valueB)
        }else{
          // console.log("error")
        }
        }
        for(const i in this.data.meta.fields){
        if(this.valueC === this.data.meta.fields[i]){
          console.log(this.valueC)
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
      
      //All Group
      
    },
  renderChart(contents_val){
const width = 600;
const height = 500;
const spacing = 120
const parseDate = d3.timeParse("%d-%b-%y")

// append the svg object to the body of the page
  const svg = d3
    .select("svg")
    // .attr("width", width)
    // .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`);

    this.chart = svg
    .append("g")
    .attr('transform','translate(' + spacing/2 + ',' + spacing/2 + ')');
 
 contents_val.forEach((g) =>{
    if(this.bottom){
    g[this.bottom] = parseDate(g[this.bottom])
    g[this.left] = +g[this.left]
    }
  })
 

//scales
const xScale = d3.scaleTime()
    .domain(d3.extent(contents_val, (g) => {
      if(this.bottom){
        return g[this.bottom]
      }
      }))
    .range([0, width-spacing]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(contents_val, (g) => {
      if(this.valueA && this.valueB){
return Math.max(g[this.valueA], g[this.valueB], g[this.valueC]);
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
      .call(xAxis);
    
  // Y-axis
  this.chart
  .append('g')
  .call(yAxis);
    
const line1 = d3.line()
.x((g) => {
  console.log(xScale(g[this.bottom]))
        return xScale(g[this.bottom])
})
.y((g) => {
  console.log(yScale(g[this.valueA]))
    return yScale(g[this.valueA]);
})

const line2 = d3.line()
.x((g) => {
  console.log(xScale(g[this.bottom]))
        return xScale(g[this.bottom])
})
.y((g) => {
  console.log(yScale(g[this.valueB]))
    return yScale(g[this.valueB]);
})

const line3 = d3.line()
.x((g) => {
  console.log(xScale(g[this.bottom]))
        return xScale(g[this.bottom])
})
.y((g) => {
  console.log(yScale(g[this.valueC]))
    return yScale(g[this.valueC]);
})

this.chart
    .append("path")
    .data([contents_val])
    .attr("class", "line") 
   .attr("d", line1)
    .style("fill", "none")
    .style("stroke", "#540374")
    .style("stroke-width", "3");

    this.chart
    .append("path")
    .data([contents_val])
    .attr("class", "line") 
   .attr("d", line2)
    .style("fill", "none")
    .style("stroke", "blue")
    .style("stroke-width", "3");

    this.chart
    .append("path")
    .data([contents_val])
    .attr("class", "line") 
   .attr("d", line3)
    .style("fill", "none")
    .style("stroke", "red")
    .style("stroke-width", "3");
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
