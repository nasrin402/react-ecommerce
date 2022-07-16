import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { Space, Spin } from "antd";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="container-fluid mb-5">
        <div className="row border-top px-xl-5">
          <div className="col-lg-3">
            <AdminNav />
          </div>
          <div className="col-lg-9">
            {loading ? (
              <h2>
                {" "}
                <Space size="middle">
                  <Spin size="large" />
                </Space>
              </h2>
            ) : (
              <h2>Admin Dashboard</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminDashboard;
