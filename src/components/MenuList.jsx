import React from "react";
import PropTypes from "prop-types";
import MenuItem from "./MenuItem";

const MenuList = ({ items, onEdit, onDelete }) => (
  <div className="menu-list">
    {items.length ? (
      items.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))
    ) : (
      <p>No items in the menu.</p>
    )}
  </div>
);

MenuList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MenuList;
