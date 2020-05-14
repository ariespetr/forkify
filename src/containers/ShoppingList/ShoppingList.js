import React from "react";
import styles from "./ShoppingList.module.css";
import ShoppingListItem from "./ShoppingListItem/ShoppingListItem";
import Footer from "../../components/Footer/Footer";
import { useStore } from "../../store";

const ShoppingList = () => {
  const state = useStore()[0];
  const { items } = state.shoppingList;

  const renderShoppingListItem = () => {
    if (items.length > 0)
      return items.map((item, index) => {
        return (
          <ShoppingListItem
            items={items}
            key={index}
            index={index}
            item={item}
          />
        );
      });
  };

  return (
    <div className={styles.shopping}>
      <h2 className="heading-2">My Shopping List</h2>
      <ul className={styles.shopping__list}>{renderShoppingListItem()}</ul>
      <Footer />
    </div>
  );
};

export default ShoppingList;
