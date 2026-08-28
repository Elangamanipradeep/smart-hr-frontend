import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import "./DepartmentChart.css";

ChartJS.register(
    ArcElement,
    Tooltip
);


function DepartmentChart({ departments }) {

    const totalEmployees = departments.reduce(
        (total, department) =>
            total + Number(department.employee_total || 0),
        0
    );


    const chartColors = [
        "#6b86b5",
        "#48b58a",
        "#f5a623",
        "#b64db4",
        "#3f7edb",
        "#8b5cf6",
        "#ef6c5b",
        "#14b8a6",
    ];


    const data = {

        labels: departments.map(
            (department) => department.name
        ),

        datasets: [

            {

                data: departments.map(
                    (department) =>
                        Number(department.employee_total || 0)
                ),

                backgroundColor: departments.map(
                    (_, index) =>
                        chartColors[
                            index % chartColors.length
                        ]
                ),

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
                            totalEmployees > 0
                                ? (
                                    (value / totalEmployees) *
                                    100
                                ).toFixed(1)
                                : 0;

                        return ` ${value} employees (${percentage}%)`;

                    },

                },

            },

        },

    };


    return (

        <div className="department-chart">

            <div className="department-chart-canvas">

                <Doughnut
                    data={data}
                    options={options}
                />

            </div>


            <div className="department-chart-legend">

                {departments.map(
                    (department, index) => {

                        const employeeCount =
                            Number(
                                department.employee_total || 0
                            );

                        const percentage =
                            totalEmployees > 0
                                ? (
                                    (employeeCount /
                                        totalEmployees) *
                                    100
                                ).toFixed(1)
                                : "0.0";


                        return (

                            <div
                                className="department-legend-item"
                                key={department.name}
                            >

                                <div className="department-legend-name">

                                    <span
                                        className="legend-dot"
                                        style={{
                                            backgroundColor:
                                                chartColors[
                                                    index %
                                                    chartColors.length
                                                ],
                                        }}
                                    ></span>

                                    <span
                                        className="department-name"
                                        title={department.name}
                                    >

                                        {department.name}

                                    </span>

                                </div>


                                <span className="department-legend-value">

                                    {employeeCount}

                                    {" "}

                                    ({percentage}%)

                                </span>

                            </div>

                        );

                    }
                )}

            </div>

        </div>

    );

}

export default DepartmentChart;