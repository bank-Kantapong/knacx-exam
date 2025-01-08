import { Button } from "antd";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addToCart, Product } from "../features/cartSlice";
import { RootState } from "../store/store";
import CartModal from "../Components/CartModal";

const QUANTITY = 20;

const ShoppingCart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenCart, setIsOpenCart] = useState<boolean>(false);
  const isInitProduct = useRef<boolean>(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const getProductList = useCallback(async () => {
    if (isLoading || isInitProduct.current) return;

    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://fakerapi.it/api/v2/products?_quantity=${QUANTITY}`
      );
      if (data) {
        // image url จาก api เสียเลยต้องฟิก image แทน
        const newData = data.data.map((bookItem: Product) => ({
          ...bookItem,
          image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        }));
        setProducts(newData);
        isInitProduct.current = true;
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [isLoading]);

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  const handleAdd = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">ระบบจัดการตะกร้าสินค้า</h1>
      <div
        className="relative flex justify-end px-4 cursor-pointer"
        onClick={() => setIsOpenCart(true)}
      >
        <ShoppingCartOutlined className="text-3xl" />
        {cartItems.length > 0 && (
          <div className="absolute top-[-10px] right-0 flex items-center justify-center w-8 h-w-8 text-white bg-red-500 rounded-full">
            {cartItems.length}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 overflow-auto border border-gray-200 rounded-md md:grid-cols-5 h-1/2 max-h-[700px]">
        {isLoading ? (
          <div className="text-center col-span-full">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {products?.map((productItem: Product) => (
              <div
                key={productItem.id}
                className="flex flex-col justify-between gap-4 p-2 bg-white border border-gray-100 rounded-md shadow-md"
              >
                <div className="flex flex-col gap-4">
                  <img alt="image" src={productItem.image} />
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-black text-md">
                      {productItem.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {productItem.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="font-semibold text-black text-md text-end">
                    {productItem.price.toLocaleString()} บาท
                  </p>
                  <Button
                    block
                    type="primary"
                    onClick={() => handleAdd(productItem)}
                  >
                    เพิ่มลงตะกร้า
                  </Button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <CartModal open={isOpenCart} onClose={() => setIsOpenCart(false)} />
    </div>
  );
};

export default ShoppingCart;
