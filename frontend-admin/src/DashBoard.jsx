import React from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaBuilding,
  FaTrashAlt,
  FaUserSecret,
  FaUserCheck,
} from "react-icons/fa";
import Navbar from "./Navbar";

const mockCompanies = [
  {
    _id: "1",
    name: "Ahsj",
    email: "test@gmail.com",
    createdAt: "2025-04-27T17:53:41.896Z",
  },
  {
    _id: "2",
    name: "Arjun Industries",
    email: "arjun@gmail.com",
    createdAt: "2025-05-03T17:41:23.300Z",
  },
];

const mockDevelopers = [
  {
    _id: "1",
    fullName: "Arjun",
    email: "rrnayak2004@gmail.com",
    phoneNumber: "1234567890",
    createdAt: "2025-04-07T09:48:02.899Z",
  },
  {
    _id: "2",
    fullName: "Rama Raju",
    email: "ramrajmbu@gmail.com",
    phoneNumber: "9999999999",
    createdAt: "2025-05-04T13:28:44.026Z",
  },
];

const DashBoard = () => {
  const companyCount = mockCompanies.length;
  const developerCount = mockDevelopers.length;
  const totalHires = 8; // mock
  const suspiciousAccounts = 1; // mock

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-tr from-blue-50 to-blue-100 min-h-screen p-6 md:p-10">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-blue-800">
            Admin Dashboard <span className="text-black">(View Only)</span>
          </h1>
          <p className="text-blue-600">Overview and monitoring panel</p>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Companies"
            count={companyCount}
            Icon={FaBuilding}
            color="blue-500"
          />
          <StatCard
            title="Developers"
            count={developerCount}
            Icon={FaUsers}
            color="blue-400"
          />
          <StatCard
            title="Total Hires"
            count={totalHires}
            Icon={FaUserCheck}
            color="green-500"
          />
          <StatCard
            title="Suspicious"
            count={suspiciousAccounts}
            Icon={FaUserSecret}
            color="red-400"
          />
        </div>

        {/* Companies Table */}
        <DataTable
          title="Companies"
          headers={["Name", "Email", "Created At"]}
          data={mockCompanies}
          renderRow={(company) => [
            company.name,
            company.email,
            new Date(company.createdAt).toLocaleDateString(),
          ]}
        />

        {/* Developers Table */}
        <DataTable
          title="Developers"
          headers={["Full Name", "Email", "Phone", "Created At"]}
          data={mockDevelopers}
          renderRow={(dev) => [
            dev.fullName,
            dev.email,
            dev.phoneNumber,
            new Date(dev.createdAt).toLocaleDateString(),
          ]}
        />
      </div>
    </>
  );
};

// Stat Card Component
const StatCard = ({ title, count, Icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className={`bg-white rounded-2xl shadow-lg p-6 border-l-8 border-${color} flex items-center space-x-4`}
  >
    <Icon className={`text-${color} text-4xl`} />
    <div>
      <h2 className="text-lg font-semibold text-blue-800">{title}</h2>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  </motion.div>
);

// Data Table Component
const DataTable = ({ title, headers, data, renderRow }) => (
  <section className="mb-12">
    <h3 className="text-2xl font-semibold text-blue-800 mb-4">{title}</h3>
    <div className="overflow-x-auto rounded-xl shadow bg-white">
      <table className="w-full table-auto text-sm text-left text-gray-700">
        <thead className="bg-blue-200 text-blue-900 uppercase text-xs tracking-wider">
          <tr>
            {headers.map((h, idx) => (
              <th key={idx} className="px-6 py-3">
                {h}
              </th>
            ))}
            <th className="px-6 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="border-t hover:bg-blue-50 transition">
              {renderRow(item).map((cell, idx) => (
                <td key={idx} className="px-6 py-4">
                  {cell}
                </td>
              ))}
              <td className="px-6 py-4 text-right">
                <button
                  className="rounded-full p-2 bg-red-100 text-red-400 cursor-not-allowed opacity-50 hover:opacity-100 hover:ring-2 hover:ring-red-300 transition"
                  disabled
                  title="Delete (disabled)"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default DashBoard;
