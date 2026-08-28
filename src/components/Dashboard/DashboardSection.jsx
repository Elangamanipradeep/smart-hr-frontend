function DashboardSection({ title, children }) {

    return (

        <div className="card shadow-sm border-0 rounded-4 h-100">

            <div className="card-body">

                <h5 className="fw-bold mb-4">
                    {title}
                </h5>

                {children}

            </div>

        </div>

    );

}

export default DashboardSection;