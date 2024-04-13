"use client";

// pages/workspace.tsx
import { useEffect, useState } from "react";

interface Workspace {
  id: string;
  name: string;
  description: string;
  image: string;
  address: string;
  created_at: string;
  updated_at: string;
}

interface Medication {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  timing: string;
  duration: string;
  start_from: string;
  details: string;
}

interface WorkspaceData {
  workspace: Workspace;
  medications: Medication[];
}

const MyComponent = () => {
  const [workspaces, setWorkspaces] = useState<WorkspaceData[]>([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      fetchData(token);
    }
  }, []);

  const fetchData = async (token: string) => {
    const response = await fetch(
      "https://yantra-hack.souvik150.com/doctors/pharmacy",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (data.status) {
      setWorkspaces(data.data); // assuming data.data is an array of workspaces
    } else {
      console.error("Failed to fetch data:", data.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      {workspaces.map((workspaceData) => (
        <div key={workspaceData.workspace.id} className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-blue-700 mb-2">
              {workspaceData.workspace.name}
            </h1>
            <p className="text-gray-700 mb-4">
              {workspaceData.workspace.description}
            </p>
            <div className="flex flex-col md:flex-row md:items-center">
              <img
                className="w-full md:w-1/3 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-4"
                src={workspaceData.workspace.image}
                alt="Workspace Image"
              />
              <div className="text-sm">
                <p className="text-gray-600">
                  <strong>Address:</strong> {workspaceData.workspace.address}
                </p>
                <p className="text-gray-600">
                  <strong>Created at:</strong>{" "}
                  {new Date(
                    workspaceData.workspace.created_at
                  ).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <strong>Updated at:</strong>{" "}
                  {new Date(
                    workspaceData.workspace.updated_at
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          {workspaceData.medications.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mt-4">
              <h2 className="text-xl font-semibold text-green-700 mb-3">
                Medications
              </h2>
              <table className="w-full text-left rounded-lg">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Name
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Dose
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Frequency
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Duration
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Start From
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {workspaceData.medications.map((medication) => (
                    <tr
                      key={medication.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4 text-gray-700">{medication.name}</td>
                      <td className="p-4 text-gray-700">{medication.dose}</td>
                      <td className="p-4 text-gray-700">
                        {medication.frequency}
                      </td>
                      <td className="p-4 text-gray-700">
                        {medication.duration}
                      </td>
                      <td className="p-4 text-gray-700">
                        {new Date(medication.start_from).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-gray-700">
                        {medication.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
