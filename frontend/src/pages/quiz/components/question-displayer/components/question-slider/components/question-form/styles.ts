export const sx = {
  questionForm: {
    display: 'inline-block',
    height: '100%',
    transition: '0.6s ease',
    // bgcolor: 'yellow'
  },
  questionFormContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 'calc(3vh)',
    // rowGap: 'calc(2rem)',
    width: '75%',
    px: '12.5%',
    // bgcolor: 'green'
  },
  question: {
    width: '100%',
    // bgcolor: 'red',
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    // outline: '1px solid red'
  },
  choices: {
    width: 'calc(100% - 2px)',
    minHeight: '12rem',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
    // outline: '1px solid red',
    overflow: 'visible',
  },
}
