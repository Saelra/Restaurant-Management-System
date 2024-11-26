import React from "react";
import PropTypes from "prop-types";

const MenuItem = ({ item, onEdit, onDelete }) => (
  <div className="menu-item">
    <h3>{item.name}</h3>
    <p>Price: ${item.price}</p>
    <p>Description: {item.description}</p>
    <button onClick={() => onEdit(item)}>Edit</button>
    <button onClick={() => onDelete(item.id)}>Delete</button>
  </div>
);

MenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MenuItem;
