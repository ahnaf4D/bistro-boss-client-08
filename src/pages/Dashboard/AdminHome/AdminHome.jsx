import useAuth from '../../../hooks/useAuth';

const AdminHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1 className='text-3xl font-medium'>
        Hi! Welcome {user?.displayName ? user?.displayName : 'Admin'}
      </h1>
    </div>
  );
};

export default AdminHome;
