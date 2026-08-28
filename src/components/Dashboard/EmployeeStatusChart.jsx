import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import "./EmployeeStatusChart.css";

ChartJS.register(
    ArcElement,
    Tooltip
);


function EmployeeStatusChart({
    active,
    inactive,
}) {

    const total =
        Number(active || 0) +
        Number(inactive || 0);


    const activePercentage =
        total > 0
            ? ((Number(active || 0) / total) * 100).toFixed(1)
            : "0.0";


    const inactivePercentage =
        total > 0
            ? ((Number(inactive || 0) / total) * 100).toFixed(1)
            : "0.0";


    const data = {

        labels: [
            "Active",
            "Inactive",
        ],

        datasets: [

            {

                data: [
                    Number(active || 0),
                    Number(inactive || 0),
                ],

                backgroundColor: [
                    "#52bd7a",
                    "#ef5350",
                ],

                borderWidth: 2,

                borderColor: "#ffffff",

                hoverOffset: 4,

            },

        ],

    };


    const options = {

        responsive: true,

        maintainAspectRatio: false,

        cutout: "62%",

        plugins: {

            legend: {

                display: false,

            },

            tooltip: {

                callbacks: {

                    label: (context) => {

                        const value = context.raw;

                        const percentage =
                            total > 0
                                ? (
                                    (value / total) *
                                    100
                                ).toFixed(1)
                                : "0.0";

                        return ` ${value} employees (${percentage}%)`;

                    },

                },

            },

        },

    };


    return (

        <div className="employee-status-chart">

            <div className="employee-status-canvas">

                <Doughnut
                    data={data}
                    options={options}
                />

            </div>


            <div className="employee-status-legend">


                <div className="status-legend-item">

                    <div className="status-legend-name">

                        <span
                            className="status-dot active"
                        ></span>

                        <span>

                            Active

                        </span>

                    </div>

                    <span className="status-legend-value">

                        {active}

                        {" "}

                        ({activePercentage}%)

                    </span>

                </div>


                <div className="status-legend-item">

                    <div className="status-legend-name">

                        <span
                            className="status-dot inactive"
                        ></span>

                        <span>

                            Inactive

                        </span>

                    </div>

                    <span className="status-legend-value">

                        {inactive}

                        {" "}

                        ({inactivePercentage}%)

                    </span>

                </div>


            </div>

        </div>

    );

}

export default EmployeeStatusChart;