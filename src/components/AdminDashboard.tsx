import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export const AdminDashboard = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error(error);
    setReports(data || []);
  };

  const updateReportStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('reports')
      .update({ status })
      .eq('id', id);
    if (error) console.error(error);
    fetchReports();
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Admin Dashboard</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id} className="p-2 border-b">
            <p>Reported Item: {report.reported_item}</p>
            <p>Reason: {report.reason}</p>
            <p>Status: {report.status}</p>
            <button
              onClick={() => updateReportStatus(report.id, 'Resolved')}
              className="text-green-500 underline"
            >
              Mark as Resolved
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
