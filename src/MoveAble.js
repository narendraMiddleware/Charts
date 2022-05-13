// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
// import RGL, { WidthProvider } from "react-grid-layout";

// import "./styles.css";

// const ReactGridLayout = WidthProvider(RGL);

// let idCounter = 0;

// const getId = () => {
//   idCounter++;

//   return idCounter.toString();
// };
// const [data, setData] = useState([]);

// useEffect(() => {
//     loadData();
//   }, []);
//   const [chartList, setChartList] = useState([]);

//   const loadData = (url) => {
//     const response = fetch(url);
//     response.then( response => {
//       const jsonPromise = response.json();
//       jsonPromise.then( json => {
//         setData(json);
//         addChartOnBtnClick(json)
//       });
//     });
//   };

// export default class MinMaxLayout extends React.PureComponent {
//   static defaultProps = {
//     isDraggable: true,
//     isResizable: true,
//     items: 5,
//     rowHeight: 30,
//     preventCollision: false,
//     cols: 12
//   };

//   state = {
//     layout: [
//       { x: 0, y: 0, w: 3, h: 3, i: getId() },
//       { x: 0, y: 1, w: 3, h: 3, i: getId() }
//     ]
//   };
  

//   render() {
//     return (
//       <React.Fragment>
//         <button onClick={this.addNewItem}>Add item</button>
//         <ReactGridLayout
//           {...this.props}
//           onLayoutChange={layout => this.setState({ layout })}
//         >
//           {this.state.layout.map(item => (
//             <div key={item.i} data-grid={item}>
//               <span>{item.i}narendra</span>
//               <LineChart data={typeof p.json !== "undefined" ? p.json : data} />
//             </div>
//           ))}
//         </ReactGridLayout>
//       </React.Fragment>
//     );
//   }

//   addNewItem = () => {
//     const { layout } = this.state;
//     const newItem = { x: 0, y: 0, w: 3, h: 3, i: getId() };

//     if (layout.some(item => item.x === 0 && item.y === 0)) {
//       this.setState({
//         layout: layout
//           .map(item => {
//             if (item.x === 0) {
//               return { y: item.y++, ...item };
//             }

//             return item;
//           })
//           .concat([newItem])
//       });
//     } else {
//       this.setState({ layout: layout.concat([newItem]) });
//     }
//   };
// }

// // module.exports = MinMaxLayout;

// // if (require.main === module) {
// //   require("../test-hook.jsx")(module.exports);
// // }

// // const rootElement = document.getElementById("root");
// // ReactDOM.render(<MinMaxLayout />, rootElement);
