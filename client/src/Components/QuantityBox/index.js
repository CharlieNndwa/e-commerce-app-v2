import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import Button from "@mui/material/Button";

const QuantityBox = ({ quantity, onQuantityChange }) => {

  const minus = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const plus = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="quantityDrop d-flex align-items-center">
      <Button onClick={minus}>
        <FaMinus />
      </Button>
      <input type="text" value={quantity} readOnly />
      <Button onClick={plus}>
        <FaPlus />
      </Button>
    </div>
  );
};

export default QuantityBox;
