
import { Table } from './components/table/Table'
import { Laptop } from './components/laptop/Laptop'
import { Cat } from './components/cat/Cat'

const CatWithLaptop = () => {
  return (
    <svg 
        viewBox="0 0 1080 406" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        data-aos='fade-up'
        style={{ 
          // outline: '1px solid white', 
          width: '75%' 
        }}
        >
        <g clipPath="url(#clip0_333_395)">
            <Table/>
            <Laptop/>
            <Cat/>
        </g>
        <defs>
            <clipPath id="clip0_333_395">
                <rect width="1080" height="406" fill="white"/>
            </clipPath>
        </defs>
    </svg>
  )
}

export default CatWithLaptop