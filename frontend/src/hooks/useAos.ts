import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const useAos = () => {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);

    return AOS;
}

export default useAos