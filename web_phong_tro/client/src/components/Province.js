
import { location } from '../utils/constant'
import ProvinceButton from './ProvinceButton';
function Province() {
    return ( 
        <div className='flex items-center gap-5 justify-center '>
            {location.map(item => {
                return(
                <ProvinceButton key={item.id} name={item.name} image={item.image} />
                )
            })}
            </div>
     );
}

export default Province;