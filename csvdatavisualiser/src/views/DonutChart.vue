<template>
  <div class="hello pt-5 md:w-10/12 lg:w-3/4
  container flex flex-col md:items-center md:px-6 mx-auto md:space-y-0">
    <div class="header">
          
      <div class="datainput">
          <div class="upload-file">
          <label for="csv-file">Upload CSV File</label>
          <input type="file" id="csv-file" accept=".csv" @change="parse_csv"><br>
          <span>{{ this.fileName }}</span>
          </div> <div class="data-info">
            <!-- <p>Input the name of the header you want to use for your horizontal line</p> -->
            <input type="text" v-model="sector" placeholder="sector">
              <!-- <p>Input the name of the header you want to use for your vertical line</p> -->
              <input type="text" v-model="name" placeholder="name">
              <button @click="getContent">Visualise</button>
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
      sector:'',
      name:'',
    chart:null,
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
        skipEmptyLines:true,
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
        this.contents = this.data.data

        for(const i in this.data.meta.fields){
        if(this.sector === this.data.meta.fields[i]){
          console.log(this.sector)
        }else{
          // console.log("error")
        }
        }

        for(const i in this.data.meta.fields){
        if(this.name === this.data.meta.fields[i]){
          console.log(this.name)
        }else{
          // console.log("error")
        }
        }
    },
  renderChart(contents_val){
  const svg_width = 400;
  const svg_height = 400;
  const svg_radius = Math.min(svg_width, svg_height) / 2;
  var colorScale = d3.scaleOrdinal()
  .range(["#3399ff", "#5daef8", "#86c3fa", "#add6fb", "#d6ebfd"]);
  
  const svg = d3
    .select("svg")
    // .attr("width", svg_width)
    // .attr("height", svg_height)
    .attr("radius", svg_radius)
    .attr("viewBox", `0 0 ${svg_width} ${svg_height}`);

    this.chart = svg
    .append("g")
    .attr("transform", "translate(" + svg_width / 2 + "," + svg_height / 2 +")");
 
  const pie = d3.pie().value((g) => {
      if(this.sector){
        return g[this.sector]
      }
  })
  const path = d3.arc().outerRadius(svg_radius).innerRadius(120);

  // const label = d3.arc().outerRadius(svg_radius).innerRadius(svg_radius - 80);

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
    .transition()
    .duration(2000)
    .attrTween("d", tweenPie)
    .style("opacity", 0.7)

    function tweenPie(b){
      b.innerRadius = 0;
      var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
      return (t) =>{ return path(i(t))}
    }


    var legendSize = 18
  var legendSpacing = 4

  const legend = PieGroups
    .selectAll(".legend")
    .data(colorScale.domain())
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) =>{ 
      var height = legendSize + legendSpacing
      var offset = height * colorScale.domain().length / 2
      var x = legendSize * -2;
      var y = (i * height) - offset
      return `translate(${x}, ${y})`
    });

    legend.append("rect")
    .attr("width", legendSize)
    .attr("height", legendSize)
    .attr("fill", (d, i) => {
      return colorScale(i);
    });

    legend.append("text")
    .attr("x", legendSize + legendSpacing)
    .attr("y", legendSize - legendSpacing)
    .text((g) => {
      if(this.name){
        return g.data[this.name]
      }
    })
    .style("font-size",5)
    .attr("fill", (d, i) => {
      return colorScale(i);
    });
 
// PieGroups
//     .append("text")
//     .attr("transform", (g) => { 
//                return "translate(" + label.centroid(g) + ")"; 
//             })
//     .text((g) => {
//         if(this.name){
//         return g.data[this.name]
//       }
//     })
    
//     .style("text-anchor", "middle")
//     .style("font-size", 17);

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
