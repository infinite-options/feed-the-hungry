import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import CartItem from 'pages/Checkout/CartItem';
import Icons from 'components/Icons/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Carousel({itemList}){
  // const items = JSON.parse(window.localStorage.getItem(bankInfo.id)) || [];
  // console.log(items);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 60;
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={4}
        gutter={20}
        leftChevron={<button className="button round-btn"><span className="icon"><FontAwesomeIcon icon={Icons.faChevronLeft} /></span></button>}
        rightChevron={<button className="button round-btn"><span className="icon"><FontAwesomeIcon icon={Icons.faChevronRight} /></span></button>}
        outsideChevron
        chevronWidth={chevronWidth}
      > 
      {itemList.map(x => 
        <CartItem key={x.info.food_id} foodItem={x} />)
      }
        {/* <div style={{ height: 200, background: '#EEE' }}>First card</div> */}
      </ItemsCarousel>
    </div>
  );
};
export default Carousel;
