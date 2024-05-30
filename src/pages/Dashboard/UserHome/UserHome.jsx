import useAuth from '../../../hooks/useAuth';

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 className='text-3xl font-medium'>
        Hi, Welcome {user?.displayName ? user?.displayName : 'User'}
      </h2>
    </div>
  );
};

export default UserHome;
