
import { useEffect, useState } from 'react'
import './App.css'
import PageContainer from './container/PageContainer';
import Header from './components/Header';
import RouterCofig from './config/RouterCofig';
import Loading from './components/Loading';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import {
  calculateBasket,
  removeFromBasket,
  setDrawer,
  increaseProductCount, // YENİ
  decreaseProductCount  // YENİ
} from './redux/slices/basketSlice';
import {
  FiShoppingCart,
  FiArrowLeft,
  FiPlus,  // YENİ
  FiMinus  // YENİ
} from 'react-icons/fi';

function App() {
  const { products, drawer, totalAmount } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, [])

  return (
    <div>
      <PageContainer>
        <Header />
        <RouterCofig />
        <Loading />

        <Drawer anchor='right' open={drawer} onClose={() => dispatch(setDrawer())}>
          {products.length === 0 ? (
            // Sepet boşsa gösterilecek ekran
            <div
              style={{
                width: '350px',
                minHeight: '100%',
                boxSizing: 'border-box',
                padding: '40px 25px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}>
              <div
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  backgroundColor: '#f3eafa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '25px'
                }}>
                <FiShoppingCart size={55} color='rgb(166, 116, 211)'/>
              </div>

              <h2 style={{fontSize:'24px', marginBottom:'10px', color:'#292333'}}>
                Sepetiniz Boş!
              </h2>

              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.7',
                  color: '#777',
                  marginBottom: '25px'
                }}>
                Henüz sepetinize ürün eklemediniz.
              </p>

              <button onClick={() => dispatch(setDrawer())}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '6px',
                  backgroundColor: 'rgb(166, 116, 211)',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}>
                <FiArrowLeft size={17} />
                Alışverişe Devam Et
              </button>
            </div>
          ) : (
            // Sepette Ürün varsa gösterilecek ekran
            <div style={{ width: '100%', minWidth: '420px', maxWidth: '550px'}}>
              {products.map((product) => (
                <div key={product.id}>
                  <div className="flex-row" style={{ padding: '20px' }}>
                    <img
                      style={{ marginRight: '5px' }}
                      src={product.image}
                      width={50}
                      height={50}
                      alt={product.title}
                    />

                    <p style={{ width: '320px', marginRight: '5px'}}>
                      {product.title}
                    </p>

                    {/* Ürün adedini azaltma */}
                    <button
                      onClick={() => dispatch(decreaseProductCount(product.id))}
                      disabled={product.count <= 1}
                      aria-label="Ürün adedini azalt"
                      style={{
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        backgroundColor: 'white',
                        cursor: product.count <= 1 ? 'not-allowed' : 'pointer',
                        opacity: product.count <= 1 ? 0.4 : 1
                      }}
                    >
                      <FiMinus size={18} />
                    </button>

                    {/* Güncel ürün adedi */}
                    <span style={{
                      margin: '0 10px',
                      fontWeight: 'bold'
                    }}>
                      {product.count}
                    </span>

                    {/* Ürün adedini artırma */}
                    <button
                      onClick={() => dispatch(increaseProductCount(product.id))}
                      aria-label="Ürün adedini artır"
                      style={{
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        backgroundColor: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      <FiPlus size={18} />
                    </button>

                    {/* Ürünün toplam fiyatı */}
                    <p style={{
                      fontWeight: 'bold',
                      marginRight: '10px',
                      marginLeft: '10px',
                      width: '90px'
                    }}>
                      {product.price * product.count} TL
                    </p>

                    <button
                      onClick={() => {
                        dispatch(
                          removeFromBasket(product.id)
                        )
                      }}
                      style={{
                        padding: '5px',
                        borderRadius: '5px',
                        backgroundColor: 'rgb(166, 116, 211)',
                        border: 'none',
                        color: 'white',
                        width: '50px',
                        cursor: 'pointer'
                      }}
                    >
                    Sil
                    </button>
                  </div>
                </div>
              ))}

              <div>
                <p style={{ textAlign: 'center', fontWeight: 'bold'}}> Toplam Tutar: {totalAmount} TL </p>
              </div>
            </div>
          )}
        </Drawer>
      </PageContainer>
    </div>
  )
}

export default App
