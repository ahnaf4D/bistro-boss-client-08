import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment';
import { FaDollarSign, FaUsers } from 'react-icons/fa6';
import {
  BarChart,
  Bar,
  Cell as BarCell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  PieChart,
  Pie,
  Sector,
  Cell as PieCell,
  ResponsiveContainer,
} from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: stats = [], refetch } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/admin-stats`);
      return data;
    },
  });
  refetch();
  const { data: chartData = [] } = useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/order-stats`);
      return data;
    },
  });

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke='none' fill={fill} />;
  };
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const pieChartData = chartData.map((data) => {
    return { name: data.category, value: data.revenue };
  });
  return (
    <div>
      <h1 className='text-3xl font-medium'>
        Hi! Welcome {user?.displayName ? user?.displayName : 'Admin'} 🎉
      </h1>
      <div className='stats shadow my-8'>
        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <FaDollarSign className='text-4xl'></FaDollarSign>
          </div>
          <div className='stat-title'>Total Revenue</div>
          <div className='stat-value'>{stats.revenue}</div>
        </div>
        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <FaUsers className='text-2xl'></FaUsers>
          </div>
          <div className='stat-title'>Total Customers</div>
          <div className='stat-value'>{stats.customers}</div>
          <div className='stat-desc flex gap-4'>
            May 24 2024 -{moment().format('MMM Do YY')}
          </div>
        </div>

        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-8 h-8 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
              ></path>
            </svg>
          </div>
          <div className='stat-title'>Total Products</div>
          <div className='stat-value'>{stats.products}</div>
        </div>

        <div className='stat'>
          <div className='stat-figure text-secondary'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-8 h-8 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
              ></path>
            </svg>
          </div>
          <div className='stat-title'>Total Orders</div>
          <div className='stat-value'>{stats.orders}</div>
        </div>
      </div>
      <div className='flex'>
        <div className='w-1/2'>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='category' />
            <YAxis />
            <Bar
              dataKey='quantity'
              fill='#8884d8'
              shape={<TriangleBar />}
              label={{ position: 'top' }}
            >
              {chartData.map((entry, index) => (
                <BarCell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className='w-1/2'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {pieChartData.map((entry, index) => (
                  <PieCell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend></Legend>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
