import DashboardLayout from "../../layouts/DashboardLayout";
import EmployeeFormComponent from "../../components/EmployeeForm/EmployeeForm";
import { useParams } from "react-router-dom";
import { getEmployee, updateEmployee } from "../../services/employeeService";

function EmployeeForm() {

    const { id } = useParams();
    
    return (
        <DashboardLayout>
            <EmployeeFormComponent />
        </DashboardLayout>
    );
}

export default EmployeeForm;