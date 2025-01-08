import { Button, Table } from "antd";
import AddProductModal from "../Components/AddProductModal";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export interface ProductFormValues {
  name: string;
  price: number;
}

export interface ProductsType {
  name: string;
  price: number;
  key: number;
  updated_at: string;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [openAddProduct, setOpenAddProduct] = useState<boolean>(false);
  const [selectedFormData, setSelectedFormData] = useState<ProductsType | null>(
    null
  );

  useEffect(() => {
    const localProducts = localStorage.getItem("products");
    if (products.length === 0 && localProducts) {
      setProducts(JSON.parse(localProducts));
    }
  }, [products.length]);

  const handleDeleteProduct = (productKey: number) => {
    setProducts((prev) => {
      const newPrev = prev.filter(
        (productItem) => productItem.key !== productKey
      );
      localStorage.setItem("products", JSON.stringify(newPrev));
      return newPrev;
    });
  };

  const onSubmitProduct = (values: ProductFormValues) => {
    setProducts((prev) => {
      if (selectedFormData) {
        const newPrev = prev.map((productItem) =>
          productItem.key === selectedFormData.key
            ? { ...productItem, ...values }
            : productItem
        );
        localStorage.setItem("products", JSON.stringify(newPrev));
        return newPrev;
      } else {
        const newProduct = {
          ...values,
          key: products.length + 1,
          updated_at: dayjs().format("DD/MM/YYYY"),
        };
        const newPrev = [...prev, newProduct];
        localStorage.setItem("products", JSON.stringify(newPrev));
        return newPrev;
      }
    });
    setOpenAddProduct(false);
    setSelectedFormData(null);
  };

  const handleEdit = (formData: ProductsType) => {
    setSelectedFormData(formData);
    setOpenAddProduct(true);
  };

  const handleClose = () => {
    setSelectedFormData(null);
    setOpenAddProduct(false);
  };

  const exportToCSV = () => {
    if (products.length === 0) {
      alert("ไม่มีข้อมูลสินค้าให้ export");
      return;
    }

    const headers = ["ชื่อสินค้า", "ราคา", "วันที่อัพเดท"];
    const rows = products.map((productItem: ProductsType) => [
      productItem.name,
      productItem.price,
      productItem.updated_at,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "products.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      title: "ชื่อสินค้า",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ราคา",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "วันที่อัพเดท",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "",
      render: (_: string, record: ProductsType) => (
        <div className="flex justify-end gap-4">
          <p
            className="cursor-pointer text-md hover:text-blue-500"
            onClick={() => handleEdit(record)}
          >
            แก้ไข
          </p>
          <p
            className="cursor-pointer text-md hover:text-blue-500"
            onClick={() => handleDeleteProduct(record.key)}
          >
            ลบ
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">ระบจัดการสินค้า CRUD</h1>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Button
            className="w-fit"
            type="primary"
            size="large"
            onClick={() => setOpenAddProduct(true)}
          >
            เพิ่มรายการสินค้า
          </Button>
          <Button
            className="w-fit"
            type="default"
            size="large"
            onClick={exportToCSV}
          >
            Export to CSV
          </Button>
        </div>
        <Table dataSource={products} columns={columns} pagination={false} />
      </div>
      <AddProductModal
        open={openAddProduct}
        onClose={handleClose}
        onSubmit={onSubmitProduct}
        formData={selectedFormData}
      />
    </div>
  );
};

export default ProductManagement;
