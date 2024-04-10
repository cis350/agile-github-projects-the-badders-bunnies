import { useAuth } from './useAuth.tsx';
import { Button } from '@mui/material';

const LogoutButton = () => {
  const {signedIn, setSignedIn} = useAuth()

  const signOut = async () => {
      try {
        const res = await fetch(`/api/account/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: null,
        });
        if (!res.ok) {
          throw new Error('Failed to post answer');
        }
        alert('Answer posted successfully');
        setSignedIn(false);
      } catch (error) {
        alert('Failed to post answer');
      }
    };

  return (
    <>
      {signedIn && <div>
        <Button onClick={signOut} variant={'contained'}>
          Log Out
        </Button>
      </div>}
    </>
  )
}

export default LogoutButton