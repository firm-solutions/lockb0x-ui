import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import useAuth from '../../hooks/useAuth';

function DashboardCard01() {

  return (
    <div className="flex flex-col col-span-full sm:col-span-4 rounded-sm   custom-dashboard-box">
      <div className="px-5 pt-6 py-4 text-center">
        <h2 className="text-lg font-semibold text-white mb-2">Project Balance</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Balance</div>
        <div className="text-3xl font-bold text-white mr-2">$24,780</div>
      </div>
    </div>
  );
}

export default DashboardCard01;
