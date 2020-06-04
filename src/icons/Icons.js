import {faShippingFast, faCube, faMapPin, faClock, faMapMarkerAlt,
    faCalendarAlt, faCheckCircle, faCheck, faStar, faSearch,
    faShoppingCart, faPlus, faMinus, faChevronUp, faChevronDown, faTimes,
    faLongArrowAltLeft, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import RoomIcon from '@material-ui/icons/Room';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Delivery from '../icons/Delivery.png';
import Pickup from '../icons/Pickup.png';
import { Icon } from 'leaflet';

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
    faTrashAlt
}