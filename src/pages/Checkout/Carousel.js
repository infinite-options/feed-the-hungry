import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import CartItem from 'pages/Checkout/CartItem';
import Icons from 'components/Icons/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Carousel({obj}){
  const items = JSON.parse(window.localStorage.getItem(obj.id)) || [];
  console.log(items);
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
      {items.map(x => x.amount > 0 ? 
        (<CartItem key={x.item.food_id} foodItem={x} />
          ): null)
      }
        {/* <div style={{ height: 200, background: '#EEE' }}>First card</div>
        <div style={{ height: 200, background: '#EEE' }}>Second card</div>
        <div style={{ height: 200, background: '#EEE' }}>Third card</div>
        <div style={{ height: 200, background: '#EEE' }}>Fourth card</div> */}
      </ItemsCarousel>
    </div>
  );
};
export default Carousel;
