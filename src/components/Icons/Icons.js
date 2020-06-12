import {faShippingFast, faCube, faMapPin, faClock, faMapMarkerAlt,
    faCalendarAlt, faCheckCircle, faCheck, faStar, faSearch,
    faShoppingCart, faPlus, faMinus, faChevronUp, faChevronDown, faTimes,
    faLongArrowAltLeft, faTrashAlt, faCircleNotch, faShoppingBasket,
    faLongArrowAltRight, faChevronLeft, faChevronRight, faWalking, faTruck} from '@fortawesome/free-solid-svg-icons';
import Delivery from './Delivery.png';
import Pickup from './Pickup.png';
import { Icon } from 'leaflet';
import Kosher from 'assets/image/kosher.png';
import GlutenFree from 'assets/image/gluten_free.png';
import Vegan from 'assets/image/vegan.png';
import Vegetarian from 'assets/image/vegetarian.png';
var greenIcon = new Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

export default {
    faShippingFast, faCube, faMapPin, faClock, faMapMarkerAlt,
    faCalendarAlt, faCheckCircle, faCheck, faStar, faSearch,
    faShoppingCart, faPlus, faMinus, faChevronUp, faChevronDown,
    Delivery, Pickup, greenIcon, faTimes, faLongArrowAltLeft,
    faTrashAlt, faCircleNotch, Kosher, GlutenFree, Vegan, Vegetarian,
    faShoppingBasket, faLongArrowAltRight, faChevronLeft, faChevronRight,
    faWalking, faTruck
}