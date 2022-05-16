import React, { useEffect, useState } from "react";
import "./styles.css";
import LineChart from "./LineChart";
// import ChartComponent from "./Charts/ChartComponent";
import HeatMap from './Charts/HeatMap1';
import ScatterPlot from './Charts/ScatterPlot';
import Hexagons from './Charts/Hexagon';
import DonutChart from "./Charts/DonutChart";
import RealTimeBarChart from './Charts/RealTimeBarChart';
import Header from "./Header";
import InputFieldComponent from "./InputFieldComponent";
import RGL, { WidthProvider } from "react-grid-layout";
import { v4 as uuidv4 } from 'uuid';
import BarChart from "./BarChart";


const ReactGridLayout = WidthProvider(RGL);

export default function App() {
  const [data, setData] = useState([]);
  const [barchartData, setBarchartData] = useState([
{
	"Letter": "A",
	"Freq": 20
},
{
	"Letter" : "B",
	"Freq": 12
},
{
	"Letter" : "C",
	"Freq": 47
},
{
	"Letter" : "D",
	"Freq": 34
},
{
	"Letter" : "E",
	"Freq" : 54
},
{
	"Letter" : "F",
	"Freq" : 21
},
{
	"Letter" : "G",
	"Freq" : 57
},
{
	"Letter" : "H",
	"Freq" : 31
},
{
	"Letter" : "I",
	"Freq" : 17
},
{
	"Letter" : "J",
	"Freq" : 5
},
{
	"Letter" : "K",
	"Freq" : 23
},
{
	"Letter" : "L",
	"Freq" : 39
},
{
	"Letter" : "M",
	"Freq" : 29
},
{
	"Letter" : "N",
	"Freq" : 33
},
{
	"Letter" : "O",
	"Freq" : 18
},
{
	"Letter" : "P",
	"Freq" : 35
},
{
	"Letter" : "Q",
	"Freq" : 11
},
{
	"Letter" : "R",
	"Freq" : 45
},
{
	"Letter" : "S",
	"Freq" : 43
},
{
	"Letter" : "T",
	"Freq" : 28
},
{
	"Letter" : "U",
	"Freq" : 26
},
{
	"Letter" : "V",
	"Freq" : 30
},
{
	"Letter" : "X",
	"Freq" : 5
},
{
	"Letter" : "Y",
	"Freq" : 4
},
{
	"Letter" : "Z",
	"Freq" : 2
}
]
);
const [childRefreshFunction, setChildRefreshFunction] = useState(null);
const [childRefreshFunctionSC, setChildRefreshFunctionSC] = useState([]);

  useEffect(() => {
    // loadData();
    // scatterplotChart({'a':'a'})
  }, []);

  const [chartList, setChartList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [childData, setChildData] = useState("");
  const passURLFunc = (value, graphType) => {
    loadData(value, graphType);
  }

  const loadData = (url, graphType) => {


    const response = fetch(url);
    response.then( response => {
      const jsonPromise = response.json();
      jsonPromise.then( json => {
        // console.log(json[0]);
        setData(json);
        // const graphType = json[0] ? Object.keys(json[0]).length : 0;

        // scatterplotChart(json);

        if(graphType === "line_chart"){
            lineChart(json)
        } else if(graphType === "bar_chart"){
            barChart(json)
        } else if(graphType === "donut_chart") {
            donutChart(json);
        } else if(graphType === "heat_map") {
            heatmapChart(json)
        } else if(graphType === "hexagon") {
            HexagonChart(json);
        } else if(graphType === "scatter_plot") {
            scatterplotChart(json);
        }
      });
    });
  };

  const LineChartComponent = (p) => {
    let tempUID = uuidv4();
    setClassList((classList) => [...classList, tempUID]);
    return  <LineChart data={typeof p.json !== "undefined" ? p.json : data} classnameCustom={tempUID} />
  };
  const lineChart = json => {
      setChartList([
        ...chartList,
        { i: <LineChartComponent json={json} key={chartList.length} /> , x: 10, y: 10, w: 5, h: 10 },
      ]);
  };

  const HeatMapChartComponent = (p) => {
    let tempUID = uuidv4();
    setClassList((classList) => [...classList, tempUID]);
    return  <HeatMap setRefreshFunction={(f) => {setChildRefreshFunction(f);}} data={typeof p.json !== "undefined" ? p.json : data} classnameCustom={tempUID} />
  };
  const heatmapChart = json => {
      setChartList([
        ...chartList,
        { i: <HeatMapChartComponent json={json} key={chartList.length} /> , x: 10, y: 10, w: 5, h: 10 },
      ]);
  };

  const HexagonChartComponent = (p) => {
    let tempUID = uuidv4();
    setClassList((classList) => [...classList, tempUID]);
    return <Hexagons setRefreshFunctionSC={(f) => {setChildRefreshFunctionSC([...childRefreshFunctionSC,f]);}} data={typeof p.json !== "undefined" ? p.json : data} classnameCustom={tempUID} />
  }

  const HexagonChart = json => {
    console.log(json);
    setChartList([
      ...chartList,
      { i: <HexagonChartComponent json={json} key={chartList.length} /> },
    ]);
  };


  const ScatterplotChartComponent = (p) => {
    let tempUID = uuidv4();
    setClassList((classList) => [...classList, tempUID]);
    return  <ScatterPlot setRefreshFunctionSC={(f) => {setChildRefreshFunctionSC([...childRefreshFunctionSC,f]);}} data={typeof p.json !== "undefined" ? p.json : data} classnameCustom={tempUID} />
  };
  const scatterplotChart = json => {
      setChartList([
        ...chartList,
        { i: <ScatterplotChartComponent json={json} key={chartList.length} /> , x: 10, y: 10, w: 5, h: 10 },
      ]);
  };


  const BarChartComponent = (p) => {
    let tempUID = uuidv4()+'-barChart';
    setClassList((classList) => [...classList, tempUID]);
    return <BarChart data={barchartData} classnameCustom={tempUID} />
  };

  const barChart = json => {
    setChartList([
      ...chartList,
      { i: <BarChartComponent json={json} key={chartList.length} /> , x: 10, y: 10, w: 5, h: 10 },
    ]);
  };


  const DonutChartComponent = (p) => {
    let tempUID = uuidv4();
    setClassList((classList) => [...classList, tempUID]);
    return <DonutChart data={p.json} classnameCustom={tempUID} />
  };

  const donutChart = json => {
    setChartList([
      ...chartList,
      { i: <DonutChartComponent json={json} key={chartList.length} /> , x: 10, y: 10, w: 5, h: 10 },
    ]);
  };

  const layouts = [
    { i: "a", x: 0, y: 0, w: 4, h: 9, static: false },
  ];

  const settings ={
    isDraggable: true,
    isResizable: true,
    items: 5,
    rowHeight: 30,
    cols: 12,
    transformScale: 1,
    preventCollision: false,
    verticalCompact: true,
  }

  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  },300);

  const layoutChange = (layouts) => {
    // console.log(classList);
    // console.log(document.getElementsByClassName(classList[layouts.i]));
    // childRefreshFunction(document.getElementsByClassName(classList[layouts.i])[0].parentElement.parentElement.clientHeight,document.getElementsByClassName(classList[layouts.i])[0].parentElement.parentElement.clientWidth);
    childRefreshFunctionSC.forEach((func) => {
      func(document.getElementsByClassName(classList[layouts.i])[0].parentElement.parentElement.clientHeight,document.getElementsByClassName(classList[layouts.i])[0].parentElement.parentElement.clientWidth);
    })
    document.getElementsByClassName(classList[layouts.i])[0].setAttribute("height", document.getElementsByClassName(classList[layouts.i])[0].parentElement.parentElement.clientHeight);
    document.getElementsByClassName(classList[layouts.i])[0].setAttribute("width", document.getElementsByClassName(classList[layouts.i])[0].parentElement.parentElement.clientWidth);
    window.dispatchEvent(new Event('resize'))
  }


  const onLayoutChange = (layout, layouts) => {
    if(!classList[layouts.i].includes("-barChart"))
      layoutChange(layouts);
  }

  const onResizeStopCustom = (layout, layouts) => {
    if(!classList[layouts.i].includes("-barChart"))
      layoutChange(layouts);
  }




  return (
    <div className="App">
      <InputFieldComponent passURLFunc = {passURLFunc}/>
        {/* <RealTimeBarChart /> */}
        {/* <RealTimeBarChart width={600} height={400} /> */}

        <ReactGridLayout
        {...settings}
          container spacing={8}
          onResize={onLayoutChange}
          autoSize={true}
          onResizeStop={onResizeStopCustom}
          verticalCompact= {true}
          padding={[10,10]}
          style={{height:'570px'}}
        >

          {chartList.map((item, index) => {
            return <div key={index} data-grid={layouts[0]}>
              {item.i ? item.i : item }
          </div>
          })}
        </ReactGridLayout>

    </div>
  );
}
