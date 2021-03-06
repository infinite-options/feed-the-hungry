import React, { useState, useEffect } from "react";
import {
  Link,
  useRouteMatch,
  useLocation,
  withRouter,
  useParams,
  useHistory,
} from "react-router-dom";
import useQuery from "components/Hooks/useQuery";
import Icons from "components/Icons/Icons";
import Vegetarian from "assets/image/vegetarian.png";
import Vegan from "assets/image/vegan.png";
import GlutenFree from "assets/image/gluten_free.png";
import Kosher from "assets/image/kosher.png";

// render filtering tabs
function BankFilters() {
  let history = useHistory();
  let query = useQuery();

  const [activeFilters, setActiveFilters] = useState(
    query && query.get("search") ? query.get("search").split(" ") : []
  );
  const [isClicked, setIsClicked] = useState(false);
  const HandleFilter = (e, name) => {
    if (e.target.checked) setActiveFilters((prevState) => [...prevState, name]);
    else setActiveFilters(activeFilters.filter((x) => x !== name));

    setIsClicked(true);
  };
  useEffect(() => {
    let url = "search=";
    if (activeFilters.length > 0) {
      for (var i = 0; i < activeFilters.length; i++) {
        url += activeFilters[i];
        if (i !== activeFilters.length - 1) url += "+";
      }
      history.push(`products?${url}`);
    } else if (activeFilters.length === 0 && isClicked)
      history.push("products");
  }, [activeFilters]);

  const isChecked = (name) => {
    if (activeFilters.find((x) => x === name)) return true;
    return false;
  };
  return (
    <div className="bank-filters">
      <p className="subtitle is-7 is-bold has-text-grey" style={{marginBottom:'1rem'}}>Filter by</p>
      <div className="container">
        <div className="field is-grouped">
          <div className="control">
            <label
              className="checkbox"
              onClick={(e) => HandleFilter(e, "vegetarian")}
            >
              <input
                className="no-checkbox"
                type="checkbox"
                defaultChecked={isChecked("vegetarian")}
              />
              <span
                className={
                  isChecked("vegetarian")
                    ? "icon tooltip filter is-active"
                    : "icon tooltip filter"
                }
              >
                <img src={Vegetarian} alt="Vegetarian" />
                <span className="tooltiptext">Vegetarian</span>
              </span>
            </label>
          </div>
          <div className="control">
            <label
              className="checkbox"
              onClick={(e) => HandleFilter(e, "vegan")}
            >
              <input
                className="no-checkbox"
                type="checkbox"
                defaultChecked={isChecked("vegan")}
              />
              <span
                className={
                  isChecked("vegan")
                    ? "icon tooltip filter is-active"
                    : "icon tooltip filter"
                }
              >
                <img src={Vegan} alt="Vegan" />
                <span className="tooltiptext">Vegan</span>
              </span>
            </label>
          </div>
          <div className="control">
            <label
              className="checkbox"
              onClick={(e) => HandleFilter(e, "gluten-free")}
            >
              <input
                className="no-checkbox"
                type="checkbox"
                defaultChecked={isChecked("gluten-free")}
              />
              <span
                className={
                  isChecked("gluten-free")
                    ? "icon tooltip filter is-active"
                    : "icon tooltip filter"
                }
              >
                <img src={GlutenFree} alt="Gluten Free" />
                <span className="tooltiptext">Gluten-free</span>
              </span>
            </label>
          </div>
          <div className="control">
            <label
              className="checkbox"
              onClick={(e) => HandleFilter(e, "kosher")}
            >
              <input
                className="no-checkbox"
                type="checkbox"
                defaultChecked={isChecked("kosher")}
              />
              <span
                className={
                  isChecked("kosher")
                    ? "icon tooltip filter is-active"
                    : "icon tooltip filter"
                }
              >
                <img src={Kosher} alt="Kosher" />
                <span className="tooltiptext">Kosher</span>
              </span>
            </label>
          </div>
        </div>
      </div>
      {/* <div className="tabs is-right">
                <ul>
                    <li className={activeTab === 'all' ? 'is-active': ''} onClick={(e) => HandleClickTab(e, "all")}>
                        <Link to={`/banks/${bankId}/products`} >
                            <span className="icon is-small"><i className="fas fa-image" aria-hidden="true"></i></span>
                            <span>All</span>
                        </Link>
                    </li>
                    <li className={activeTab === 'vegetarian' ? 'is-active': ''} onClick={(e) => HandleClickTab(e, "vegetarian")}>
                        <Link to={`/banks/${bankId}/products?type=vegetarian`} >
                            <span className="icon is-small"><i className="fas fa-image" aria-hidden="true"></i></span>
                            <span>Vegetarian</span>
                        </Link>
                    </li>
                    <li className={activeTab === 'vegan' ? 'is-active' : ''} onClick={(e) => HandleClickTab(e, "vegan")}>
                        <Link to={`/banks/${bankId}/products?type=vegan`}>
                            <span className="icon is-small"><i className="fas fa-music" aria-hidden="true"></i></span>
                            <span>Vegan</span>
                        </Link>
                    </li>
                    <li className={activeTab === 'gluten-free' ? 'is-active' : ''} onClick={(e) => HandleClickTab(e, "gluten-free")}>
                        <Link to={`/banks/${bankId}/products?type=gluten-free`}>
                            <span className="icon is-small"><i className="fas fa-film" aria-hidden="true"></i></span>
                            <span>Gluten-free</span>
                        </Link>
                    </li>
                    <li className={activeTab === 'kosher' ? 'is-active' : ''} onClick={(e) => HandleClickTab(e, "kosher")}>
                        <Link to={`/banks/${bankId}/products?type=kosher`}>
                            <span className="icon is-small"><i className="far fa-file-alt" aria-hidden="true"></i></span>
                            <span>Kosher</span>
                        </Link>
                    </li>
                </ul>   
            </div> */}
    </div>
  );
}

export default withRouter(BankFilters);
