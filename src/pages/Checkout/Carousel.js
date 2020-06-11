import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';

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
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      > 
      {items.map(x => x.amount > 0 ? 
        (<div key={x.item.food_id} className="card item">
          <div className="card-content has-no-padding item-content">
            <div className="item-image-container">
              <img
                src={x.item.image}
                className="item-image"
                alt="Placeholder image"
              ></img>
            </div>
            <div className="item-info">
              <p className="item-brand has-text-grey no-overflow">
                {x.item.brand}
              </p>
              <p className="title is-6 has-text-grey-dark no-overflow">
                {x.item.food_name}
              </p>
              <p className="subtitle has-font-13 has-text-grey no-overflow">
                1 {x.item.unit} ({x.item.weight}{" "}
                {x.item.weight_unit})
              </p>
              {/* <QuantityInput
                foodItem={foodItem}
                bankId={obj.id}
                limit={foodItem.quantity}
              /> */}
            </div>
          </div>
          <div className="card-footer">
            <div className="item-price">
              <span className="subtitle has-font-13 has-text-grey">
                ${x.item.price}
              </span>
            </div>
            <div className="item-tags">
                <span className="subtitle is-6"> x{x.amount}</span>
              {/* <SplitTags bankUrl={bankUrl} str={x.item.type} /> */}
            </div>
          </div>
        </div>):"")
      
      
      
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
