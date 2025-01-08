import { Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { Product, removeFromCart, removeAll } from "../features/cartSlice";
import { DeleteOutlined } from "@ant-design/icons";
import { useMemo } from "react";

interface CartModalType {
  open: boolean;
  onClose: () => void;
}

const CartModal = ({ open, onClose }: CartModalType) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const sumPrice = useMemo(() => {
    return cartItems.reduce(
      (accumulator, current) => accumulator + current.price,
      0
    );
  }, [cartItems]);

  return (
    <Modal
      title="รายการสินค้าในตะกร้า"
      open={open}
      centered
      onCancel={onClose}
      width="50%"
      footer={() => (
        <div className="flex items-center justify-end gap-4">
          <p className="font-semibold text-black text-md text-end w-fit text-nowrap">
            รวม {sumPrice.toLocaleString()} บาท
          </p>
          <Button type="primary" danger onClick={() => dispatch(removeAll())}>
            ลบรายการทั้งหมด
          </Button>
        </div>
      )}
    >
      <div className="flex flex-col gap-4 py-4 overflow-auto max-h-96">
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((cart: Product, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    alt="cart_image"
                    src={cart.image}
                    className="w-20 h-20 rounded-md"
                  />
                  <div className="flex flex-col w-1/2 gap-2">
                    <p className="font-semibold text-black text-md">
                      {cart.name}
                    </p>
                    <p className="text-sm text-gray-500">{cart.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold text-black text-md text-end w-fit text-nowrap">
                    {cart.price.toLocaleString()} บาท
                  </p>
                  <DeleteOutlined
                    className="text-xl text-red-500 cursor-pointer"
                    onClick={() => handleRemove(cart.id)}
                  />
                </div>
              </div>
            ))}
          </>
        ) : (
          <h1 className="py-10 text-center text-gray-500 text-md">
            ยังไม่มีรายการในตะกร้า
          </h1>
        )}
      </div>
    </Modal>
  );
};

export default CartModal;
