import { Colour } from '../../../../../../utils/colour/Colour'

export const sx = {
  slider: {
    width: '100%',
    height:
      'calc(100% - 6rem - 2rem)' /* minuses due to heights from top-bar and padding */,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: '1rem',
    py: '1rem',
    // outline: '1px solid pink',
    position: 'relative',
  },
  viewFrame: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflowY: 'visible',
    overflowX: 'hidden',
  },
  slidingFrame: {
    position: 'absolute',
    height: '100%',
    transition: '0.4s ease',
    // bgcolor: 'red'
  },
  sliderIndicator: {
    display: 'flex',
    justifyContent: '',
    alignItems: 'start',
    width: '75%',
    color: 'white',
  },
  navigateButton: {
    color: 'white',
    bgcolor: '',
    width: 'auto',
    ':hover': {
      color: Colour.Primary.L0
    },
    ':active': {
      color: Colour.Primary.L1
    },
    textTransform: 'none',
    fontSize: '1rem',
  },
  submitQuizButton: {
    bgcolor: 'white',
    color: Colour.Primary.L6,
    // width: '10rem',
    px: '1.5rem',
    ':hover': {
      bgcolor: Colour.Secondary.L0,
    },
    textTransform: 'none'
  },
  viewSummaryButton: { 
    bgcolor: 'white',
    color: Colour.Primary.L6,
    px: '1.5rem',
    ':hover': {
        bgcolor: Colour.Secondary.L0,
    },
    textTransform: 'none'
  }
};
