import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import CartItem from 'pages/Checkout/CartItem';
import Icons from 'components/Icons/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Carousel({obj}){
  const items = JSON.parse(window.localStorage.getItem(obj.id)) || [];
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={5}
        gutter={20}
        leftChevron={<button className="button round-btn"><span className="icon"><FontAwesomeIcon icon={Icons.faChevronLeft} /></span></button>}
        rightChevron={<button className="button round-btn"><span className="icon"><FontAwesomeIcon icon={Icons.faChevronRight} /></span></button>}
        outsideChevron
        chevronWidth={chevronWidth}
      > 
      {items.map(x => 
        <CartItem key={x.item.food_id} foodItem={x} />)
      }
        {/* <div style={{ height: 200, background: '#EEE' }}>First card</div> */}
      </ItemsCarousel>
    </div>
  );
};
export default Carousel;
