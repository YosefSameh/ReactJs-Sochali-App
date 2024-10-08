import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';


const Loading = ()=>{



    return (
        <div className='d-flex justify-content-center '>
            <Card sx={{ maxWidth: 620,height:"400px", width:"100%", m: 2 }} >
          <CardHeader
            avatar={
                <Skeleton animation="wave" variant="circular" width={40} height={40} />
            }
            title={
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
            }
            subheader={
                <Skeleton animation="wave" height={10} width="40%" />
            }
          />
            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
          <CardContent>
              <>
                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={10} width="80%" />
              </>
          </CardContent>
        </Card>
    </div>
      );
}



export default Loading