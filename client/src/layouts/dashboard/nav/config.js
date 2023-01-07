// component

import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Customer Head',
    path: '/dashboard/customerHead',
    icon: icon('ic_user'),
  },
  {
    title: 'accounting Entry',
    path: '/dashboard/accountingentry',
    icon: icon('ic_cart'),
  },
  {
    title: 'individual Report',
    path: '/dashboard/individualreport',
    icon: icon('ic_user'),
  },
  {
    title: 'Customer Report',
    path: '/dashboard/dailyreport',
    icon: icon('ic_user'),
  },
  {
    title: 'Historical Report',
    path: '/dashboard/historicalreport',
    icon: icon('ic_user'),
  },
  {
    title: 'Employee Enrollment',
    path: '/dashboard/EmployeeEnrollment',
    icon: icon('ic_user'),
  },
];

export default navConfig;
