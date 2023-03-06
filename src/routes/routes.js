import LotteryTable from '../containers/LotteryTable';
import LotteriesPage from '../containers/LotteriesPage';
import IndexPage from '../components/IndexPage';
import PrizeTypesBar from '../components/PrizeTypesBar';

export default [
  {
    path: '/',
    component: IndexPage,
    key: 'root',
    routes: [
      {
        path: '/',
        component: LotteryTable,
        exact: true,
        key: 'lottery-table',
      },
      {
        path: '/',
        component: PrizeTypesBar,
        exact: true,
        key: 'prize-types-bar',
      },
      {
        path: '/lotteries',
        key: 'lotteries',
        component: LotteriesPage,
      },
    ],
  },
];
