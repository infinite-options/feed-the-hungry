import {faShippingFast, faCube, faMapPin, faClock, faMapMarkerAlt,
    faCalendarAlt, faCheckCircle, faCheck, faStar, faSearch, faBoxOpen,
    faShoppingCart, faPlus, faMinus, faChevronUp, faChevronDown, faTimes,
    faLongArrowAltLeft, faTrashAlt, faCircleNotch, faShoppingBasket,
    faLongArrowAltRight, faChevronLeft, faChevronRight, faWalking, faTruck, 
    faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons';
import Delivery from './Delivery.png';
import Pickup from './Pickup.png';
import { Icon } from 'leaflet';
import Kosher from 'assets/image/kosher.png';
import GlutenFree from 'assets/image/gluten_free.png';
import Vegan from 'assets/image/vegan.png';
import Vegetarian from 'assets/image/vegetarian.png';


var MarkerIcon = (color, width=25, height=41) => {
    return new Icon({
        iconUrl:  `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [width, height],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
}
export default {
    faShippingFast, faCube, faMapPin, faClock, faMapMarkerAlt,
    faCalendarAlt, faCheckCircle, faCheck, faStar, faSearch,
    faShoppingCart, faPlus, faMinus, faChevronUp, faChevronDown,
    Delivery, Pickup, faTimes, faLongArrowAltLeft,
    faTrashAlt, faCircleNotch, Kosher, GlutenFree, Vegan, Vegetarian,
    faShoppingBasket, faLongArrowAltRight, faChevronLeft, faChevronRight,
    faWalking, faTruck, faEnvelope, faLock, faBoxOpen, MarkerIcon
}

// How to use this component?
// add the icon you want to both 'import' statement and 'export default' statement in this file

// Then, in your component, do:
// import Icons from 'components/Icons/Icons"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// ....
// <FontAwesome icon={ Icons.yourIcon } />