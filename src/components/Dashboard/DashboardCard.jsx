import "./DashboardCard.css";

function DashboardCard({ title, value, icon, color }) {

    return (

        <div className="dashboard-card">

            <div className="dashboard-card-top">

                <div
                    className="dashboard-card-icon"
                    style={{ backgroundColor: color }}
                >
                    {icon}
                </div>

                <h6>{title}</h6>

            </div>

            <h2>{value}</h2>

        </div>

    );

}

export default DashboardCard;