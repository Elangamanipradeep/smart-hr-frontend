import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import { getDashboardData } from "../../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getDashboardData();

            setDashboard(response);

        }

        catch (error) {

            console.log(error);

        }

    };

    if (!dashboard) {

        return (
            <DashboardLayout>

                <h3>Loading...</h3>

            </DashboardLayout>
        );

    }

    return (

        <DashboardLayout>

            <h2 className="mb-4">

                Dashboard

            </h2>

            <div className="row g-4">

                <div className="col-md-3">

                    <DashboardCard
                        title="Total Employees"
                        value={dashboard.total_employees}
                    />

                </div>

                <div className="col-md-3">

                    <DashboardCard
                        title="Departments"
                        value={dashboard.total_departments}
                    />

                </div>

                <div className="col-md-3">

                    <DashboardCard
                        title="Active Employees"
                        value={dashboard.active_employees}
                    />

                </div>

                <div className="col-md-3">

                    <DashboardCard
                        title="Inactive Employees"
                        value={dashboard.inactive_employees}
                    />

                </div>

            </div>

        </DashboardLayout>

    );

}

export default Dashboard;