import userInfoBg from '../../assets/user-info-bg.svg'

export const sx = {
    login: {
      width: '100%',
      height: '100%', 
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'end'
  },
  form: {
      bgcolor: 'white',
      width: '36rem',
      maxWidth: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      // position: 'absolute',
      // right: '0'
  },
  formContent: {
      width: '66%',
      maxWidth: '26rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      rowGap: '3rem',
      // bgcolor: 'pink'
      // outline: '1px solid pink'
  },
  contentHeader: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'start',
      width: '100%',
      rowGap: '1rem'
  },
  contentBody: {
      width: '100%',
      display: 'flex',
      flexDirection : 'column',
      alignItems: 'center',
      rowGap: '1.5rem'
  }
};

export const styles = {
    userInfo: {
      backgroundImage: `url(${userInfoBg})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    },
    form: {
      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  }
}