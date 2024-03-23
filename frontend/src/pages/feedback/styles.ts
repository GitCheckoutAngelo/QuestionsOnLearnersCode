import { Colour } from '../../utils/colour/Colour'

export const sx = {
  page: {
    width: '100vw',
    maxWidth: '100vw',
    height: 'calc(100vh - 6rem)',
    bgcolor: '',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    rowGap: '2rem',
    // outline: '1px solid white',
    py: '3rem',
  },
  button: {
    bgcolor: 'white',
    color: Colour.Primary.L6,
    // width: '10rem',
    px: '1.5rem',
    ':hover': {
      bgcolor: Colour.Secondary.L0,
    },
    textTransform: 'none',
    mt: '16px',
    maxWidth: '12rem'
  },
}
