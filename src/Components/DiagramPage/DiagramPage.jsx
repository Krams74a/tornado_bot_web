import s from "./DiagramPage.module.css"
import { connect } from "react-redux"
import { Chart } from "react-google-charts";

const DiagramPage = (props) => {
    let data = props.nodesList
    let newData = []
    data.forEach(node => {
        newData.push(node.statement)
    });
    let statements = []
    newData.forEach(node => {
        if (statements.includes(node) === false) {
            statements.push(node)
        }
    });

    let diagramData = [
        
    ]

    statements.forEach(statement => {
        let elementToCount = statement; 

        let count = newData.filter(x => x === elementToCount).length
        diagramData.push([elementToCount, count])
    });
    

    diagramData.unshift(["Состояние", "Количество"])

    console.log(diagramData)

    const options = {
        title: "Узлы Торнадо",
        pieHole: 0.2,
        is3D: false,
        height: 700,
        width: 1600,
        backgroundColor: {
            fill: "#424242",
            stroke: "black",
            strokeWidth: 2
        },
        legend: {
            textStyle: {color: "white"}
        },
        titleTextStyle: {
          color: "white"  
        },
        colors: ['#16C60C', '#886CE4', '#E81224', '#F7630C', '#0078D7', '#FFF100']
    };

    return (
        <div className={s.diagramPage}>
            <Chart className={s.diagram}
                chartType="PieChart"
                data={diagramData}
                options={options}
                width={"100%"}
                height={"400px"}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        nodesList: state.nodes.nodesList
    }
}

const DiagramPageContainer = connect(mapStateToProps, {})(DiagramPage)

export default DiagramPageContainer