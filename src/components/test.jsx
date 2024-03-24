// modal

import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const MyModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        BackdropProps={{
          onClick: (event) => {
            // 防止點擊背景區域時關閉 modal
            event.stopPropagation();
          },
        }}
      >
        <Box sx={{ width: 300, height: 200, bgcolor: 'background.paper', borderRadius: 2, p: 2 }}>
          {/* modal 內容 */}
          <h2>Modal Content</h2>
          <Button onClick={handleClose}>Close Modal</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default MyModal;


// -----

// fixed category

import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Category } from '@mui/icons-material';

const MyModal = () => {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0); // 預設選中的 tab index
  const [shopData, setShopData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // 從後端獲取數據，假設shopData是你從後端獲取的數據
    // 設置 shopData 狀態
    const fetchedData = { /* 從後端獲取的數據 */ };
    setShopData(fetchedData.data.all_shop_list);

    // 設置初始顯示的數據
    setFilteredData(fetchedData.data.all_shop_list.filter(item => item.shop_category_id === tabValue));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTabChange = (event, newValue) => {
    // 更新選中的 tab index
    setTabValue(newValue);
    // 根據選中的 shop_category_id 過濾數據
    const filtered = shopData.filter(item => item.shop_category_id === newValue);
    setFilteredData(filtered);
  };

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <div>
      <button onClick={handleOpen}>Open Modal</button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            {/* 根據你的 shopData 動態生成 Tabs */}
            {shopData.map((item, index) => (
              <Tab key={index} label={item.shop_category_id} />
            ))}
          </Tabs>
          {/* 顯示所選 category 的內容 */}
          <div>
            {filteredData.map((item, index) => (
              <div key={index}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <img src={item.image} alt={item.title} />
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MyModal;



// ------

// unknown Category



import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const MyModal = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [tabValue, setTabValue] = useState(0); // 預設選中的 tab index
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // 從後端獲取數據
    const fetchedData = { /* 從後端獲取的數據 */ };
    setShopData(fetchedData.data.all_shop_list);

    // 獲取所有的類別
    const allCategories = fetchedData.data.all_shop_list.reduce((acc, curr) => {
      if (!acc.includes(curr.shop_category_id)) {
        acc.push(curr.shop_category_id);
      }
      return acc;
    }, []);
    setCategories(allCategories);

    // 初始化顯示的數據
    setFilteredData(fetchedData.data.all_shop_list.filter(item => item.shop_category_id === allCategories[0]));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    const filtered = shopData.filter(item => item.shop_category_id === newValue);
    setFilteredData(filtered);
  };

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <div>
      <button onClick={handleOpen}>Open Modal</button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>



          <Tabs value={tabValue} onChange={handleTabChange}>
            {/* 根據獲取到的類別動態生成 Tabs */}
            {categories.map((category, index) => (
              <Tab key={index} label={category} value={category} />
            ))}
          </Tabs>
          {/* 顯示所選 category 的內容 */}
          <div>
            {filteredData.map((item, index) => (
              <div key={index}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <img src={item.image} alt={item.title} />
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MyModal;



// ----- shopping cart

import React, { useState } from 'react';

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Items {
  [key: string]: Item[];
}

const ShoppingCart: React.FC = () => {
  const [items, setItems] = useState<Items>({
    category1: [
      { id: 1, name: 'Product 1', price: 10, quantity: 1 },
      { id: 2, name: 'Product 2', price: 20, quantity: 1 }
    ],
    category2: [
      { id: 3, name: 'Product 3', price: 15, quantity: 1 },
      { id: 4, name: 'Product 4', price: 25, quantity: 1 }
    ]
    // 可以添加更多類別
  });

  // 計算總金額
  const totalAmount = Object.values(items).reduce((total, category) => {
    return total + category.reduce((categoryTotal, item) => {
      return categoryTotal + (item.price * item.quantity);
    }, 0);
  }, 0);

  // 增加商品數量
  const increaseQuantity = (categoryId: string, itemId: number) => {
    setItems(prevItems => ({
      ...prevItems,
      [categoryId]: prevItems[categoryId].map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    }));
  };

  // 減少商品數量
  const decreaseQuantity = (categoryId: string, itemId: number) => {
    setItems(prevItems => ({
      ...prevItems,
      [categoryId]: prevItems[categoryId].map(item => {
        if (item.id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    }));
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {Object.entries(items).map(([category, categoryItems]) => (
          <div key={category}>
            <h3>{category}</h3>
            {categoryItems.map(item => (
              <li key={item.id}>
                <span>{item.name}</span>
                <span>Quantity: {item.quantity}</span>
                <button onClick={() => increaseQuantity(category, item.id)}>+</button>
                <button onClick={() => decreaseQuantity(category, item.id)}>-</button>
              </li>
            ))}
          </div>
        ))}
      </ul>
      <div>Total Amount: {totalAmount}</div>
    </div>
  );
};

export default ShoppingCart;


// -----   footer

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    top: 'auto',
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.footer}>
      <Toolbar>
        <Typography variant="body1" color="inherit">
          &copy; 2024 Your Company Name
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;





// mui tabs


import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}




// kkjjkjjk


import React, { useEffect, useState } from "react";
import { Box, Card, Container, IconButton, Modal, Skeleton, Stack, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material";
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Product } from "@/state";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

// 修改購物車商品項目的型別
type CartItem = {
  product_id: number;
  groupbuy_id: string;
  shop_category_id: string;
  title: string;
  price: number;
  quantity: number; // 新增商品購買數量
}

export type ProductsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  groupbuyId: string;
}

export const ProductsModal:React.FC<ProductsModalProps> = ({ isOpen, onClose, groupbuyId }) => {
  const { breakpoints }  = useTheme();
  const isSmall = useMediaQuery(breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const [categories, setCategories] = useState<(number | string)[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>();
  // 新增購物車狀態
  const [shoppingCart, setShoppingCart] = useState<{ items: CartItem[], totalQuantity: number }>({ items: [], totalQuantity: 0 });
  
  useEffect(() => {
    async function fetchProducts() {
      if (groupbuyId) {
        try {
          const response = await fetch('https://shopstore-groupbuyapidev.openinfo.info/api/groupbuy/detail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "partner_id":"0933807030",
              "groupbuy_id": `${groupbuyId}`,
            }),
          });
          const productsData = await response.json();
          
          
          if (productsData && productsData.data && productsData.data.all_shop_list) {
            const allCategories = productsData?.data.all_shop_list.reduce((acc: (number | string)[], curr: any) => {
              if (!acc.includes(curr.shop_category_id)) {
                acc.push(curr.shop_category_id);
              }
              return acc;
            }, []);
            setCategories(allCategories);
            setProducts(productsData?.data.all_shop_list);
            if (categories.length === 0) {
              const filteredData = productsData?.data.all_shop_list.filter((product: Product) => product.shop_category_id === allCategories[0]);
              console.log("filteredData");
              console.log(filteredData);
              setFilteredProducts(filteredData);
            }
          } else {
            console.log("can not fetch all products' categories ");
          }
        } catch(error) {
          console.log(error);
        }
      }
    }
    fetchProducts();
  }, [groupbuyId, categories.length]);
  
  const handleTabChange = (event: any, newValue: number) => {
    setTabValue(newValue);
    const category = categories[newValue]; 
    const filtered = products?.filter( product => product.shop_category_id === category);
    setFilteredProducts(filtered);
  };

  // 購物車處理函數 - 增加商品
  const addToCart = (id: number) => {
    const clickedProduct = filteredProducts?.find((product) => product.product_id === id);
    if (clickedProduct) {
      const { product_id, groupbuy_id, shop_category_id, title, price } = clickedProduct;
      // 更新購物車狀態
      setShoppingCart(prevState => ({
        ...prevState,
        items: [...prevState.items, { product_id, groupbuy_id, shop_category_id, title, price, quantity: 1 }], // 初始數量為1
        totalQuantity: prevState.totalQuantity + 1,
      }));
      // 存入 localStorage
      localStorage.setItem('shoppingCart', JSON.stringify({
        items: [...shoppingCart.items, { product_id, groupbuy_id, shop_category_id, title, price, quantity: 1 }],
        totalQuantity: shoppingCart.totalQuantity + 1,
      }));
    }
  };

  // 購物車處理函數 - 減少商品
  const removeFromCart = (id: number) => {
    // 暫時省略
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description" 
      disableAutoFocus={true}
      // disableScrollLock
    >
      <Container
        sx={{
          ...modalStyle,
          animation: 'slide-up-fade-in 0.5s forwards',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflowY: 'auto',
          overflowX: 'hidden',
          maxHeight: '80vh',
        }}
        maxWidth="lg"
      >
        {!filteredProducts ? 
            <Stack spacing={1} my="2rem">
              <Skeleton variant="rectangular" width={210} height={60} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </Stack> :
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#ee4747",
                }
              }}
              centered
              sx={(theme) => ({
                ".Mui-selected": {
                  color: theme.palette.grey[800],
                },
              })}
            >
              {categories.map((category, index) => (
                <Tab
                  key={category}
                  label={category}
                  value={index}
                  sx={(theme) => ({
                    fontSize: '1.75rem',
                    color: theme.palette.grey[800],
                  })}
                />
              ))}
            </Tabs>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: `${isSmall ? undefined : 'repeat(auto-fit, minmax(350px, 1fr))'}`,
                gap: "0.5rem",
                mb: "2.5rem"
              }}
              maxWidth="lg"
            >
              {filteredProducts.map((product, index) => (
                product.limit_total_product_amount > product.practice_order_amount ?
                (<Card 
                  elevation={2}
                  key={index}
                  sx={(theme) => ({
                  p: '1rem',
                  textAlign: 'center',
                  border: `2px solid ${theme.palette.grey[50]}`,
                  display: isSmall ? 'flex': undefined,
                  width: isSmall ? '100vw' : undefined,
                  backgroundColor: theme.palette.secondary.light,
                })}>
                  <img
                    style={{
                      height: isSmall ? '100%' : '50%',
                      width: isSmall ? '30%' : '100%',
                      objectFit: 'cover',
                      margin: isSmall ? 'auto' : undefined
                    }}
                    src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" alt="image"
                  />
                  <Box sx={{ flexGrow: isSmall ? 1 : undefined }}
                  >
                    <Typography variant="h2" fontWeight={600} py="0.25rem" px="0.5rem">
                      {product.title}
                    </Typography>
                    <Typography variant="h5" textAlign="left" py="0.25rem" px="0.5rem">
                      已賣出: {product.practice_order_amount}/{product.limit_total_product_amount} 組
                    </Typography>
                    <Typography variant="h5" textAlign="left" py="0.25rem" px="0.5rem">
                      {product.description}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" py="0.25rem" px="0.5rem">
                      <Typography variant="h4">$ {product.price}</Typography>
                        <Box display="flex" justifyContent="center" alignItems="center">
                          <IconButton color="warning" onClick={() => addToCart(product.product_id)}><AddCircleRoundedIcon /></IconButton> {/* 修改點擊事件 */}
                          <Typography variant="h4"  p="0.5rem"> 4 </Typography>
                          <IconButton color="warning"><RemoveCircleRoundedIcon/></IconButton>
                        </Box>
                      </Box>              
                    </Box>
                </Card>) :
                (<Card 
                  elevation={2}
                  key={index}
                  sx={(theme) => ({
                  p: '1rem',
                  textAlign: 'center',
                  border: `2px solid ${theme.palette.grey[50]}`,
                  display: isSmall ? 'flex': undefined,
                  width: isSmall ? '100vw' : undefined,
                  backgroundColor: theme.palette.secondary.light,
                  position: 'relative',
                  zIndex: '100',
                })}>
                  <img
                    style={{
                      height: isSmall ? '100%' : '50%',
                      width: isSmall ? '30%' : '100%',
                      objectFit: 'cover',
                      margin: isSmall ? 'auto' : undefined,
                      opacity: '0.25',
                    }}
                    src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" alt="image"
                  />
                  <Box sx={{ flexGrow: isSmall ? 1 : undefined, opacity: '0.25' }}
                  >
                    <Typography variant="h2" fontWeight={600} py="0.25rem" px="0.5rem">
                      {product.title}
                    </Typography>
                    <Typography variant="h5" textAlign="left" py="0.25rem" px="0.5rem">
                      已賣出: {product.practice_order_amount}/{product.limit_total_product_amount} 組
                    </Typography>
                    <Typography variant="h5" textAlign="left" py="0.25rem" px="0.5rem">
                      {product.description}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      py="0.25rem"
                      px="0.5rem"
                    >
                      <Typography variant="h4">$ {product.price}</Typography>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton color="warning" disabled><RemoveCircleRoundedIcon /></IconButton>
                        <Typography variant="h4"  p="0.5rem"> 4 </Typography>
                        <IconButton color="warning" disabled><AddCircleRoundedIcon/></IconButton>
                      </Box>
                    </Box>              
                  </Box>
                  <Typography
                    position="absolute"
                    top="50%"
                    left="50%"
                    color="red"
                    variant="h3"
                    letterSpacing={3}
                    border="2px solid red"
                    fontSize="2rem"
                    sx={{
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    銷售一空
                  </Typography>
                </Card>)                
              ))}
            </Box>          
          </>}
      </Container>
    </Modal>
  );
};





setFilteredProducts((prevfilteredProducts) => {
  const updatedFilteredProducts = [...prevfilteredProducts];
  const clickCartIndex = updatedFilteredProducts?.findIndex((product) => product.product_id === id);
  const clickCartProduct = prevfilteredProducts[clickCartIndex];

  if (clickCartProduct && clickCartProduct?.quantity) {
    const updatedCartProduct = {
      ...clickCartProduct,
      quantity: clickCartProduct.quantity + amount,
    };
    updatedFilteredProducts[clickCartIndex] = updatedCartProduct;
  } else if(clickCartProduct){
    const updatedCartProduct = {
      ...clickCartProduct,
      quantity: amount,
    };
    updatedFilteredProducts[clickCartIndex] = updatedCartProduct;
  }

  return updatedFilteredProducts;
});