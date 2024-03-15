import s from "./DiagramPage.module.css"
import { connect } from "react-redux"
import { Chart } from "react-google-charts";
import { compose } from "redux";

const DiagramPage = (props) => {
    if (props.nodesList) {
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
            fill: "#1d1d1d"
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
    } else {
        return <div>Loading...</div>
    }
    
}

const mapStateToProps = (state) => {
    return {
        nodesList: state.nodes.nodesList,
        isAuth: state.auth.isAuth
    }
}

const DiagramPageContainer = compose(connect(mapStateToProps, {}))(DiagramPage)

export default DiagramPageContainer