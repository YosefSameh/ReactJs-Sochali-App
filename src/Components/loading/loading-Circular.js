import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingCircular() {
  return (
    <div className='d-flex justify-content-center mb-2 '>
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    </div>
  );
}