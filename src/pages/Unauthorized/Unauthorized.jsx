import { useNavigate } from "react-router-dom";

function Unauthorized() {

    const navigate = useNavigate();

    return (

        <div className="container py-5">

            <div className="text-center">

                <h1 className="display-4 fw-bold">
                    403
                </h1>

                <h2 className="mb-3">
                    Access Denied
                </h2>

                <p className="text-muted mb-4">
                    You are not authorized to access this page.
                </p>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/dashboard")}
                >
                    Back to Dashboard
                </button>

            </div>

        </div>

    );

}

export default Unauthorized;