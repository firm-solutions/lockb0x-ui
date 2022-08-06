import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import Icon from '../../images/icon-02.svg';
import EditMenu from '../EditMenu';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard02() {


  return (
    <div className="flex flex-col col-span-full sm:col-span-2 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 pt-6 py-4 text-center">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Total Paid</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Paid</div>
        <div className="text-3xl font-bold text-slate-800 mr-2">$17,489</div>
      </div>

    </div>
  );
}

export default DashboardCard02;
