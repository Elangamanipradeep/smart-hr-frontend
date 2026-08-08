import "./DashboardCard.css";

function DashboardCard({ title, value }) {

    return (

        <div className="dashboard-card">

            <h6>{title}</h6>

            <h3>{value}</h3>

        </div>

    );

}

export default DashboardCard;