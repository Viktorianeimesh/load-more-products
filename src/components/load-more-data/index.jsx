import React, { useCallback, useEffect, useState } from 'react';
import { Audio } from 'react-loader-spinner';
import './styles.css';

export const LoadMoreData = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disabledButton, setDisabledButton] = useState(false);

  const fetchProducts = useCallback (async()=> {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
         count === 0 ? 0 : count * 20
        }`
      );

      const result = await response.json();

      if(result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result.products]);
        setLoading(false);
      }

    } catch(e) {
      console.log(e);
      setLoading(false);
    }
  }, [count])

  useEffect(() => {
    fetchProducts()
  }, [count, fetchProducts]);

  useEffect(() => {
    if (products && products.length === 100) {
      setDisabledButton(true)
    }
  }, [products]);

  if(loading){
    <Audio
      height="80"
      width="80"
      radius="9"
      color="green"
      ariaLabel="loading"
      wrapperStyle
      wrapperClass
    />
  }

  return (
    <div className="load-more-container">
      <div className="product-container">
        {
          products && products.length
          ? products.map(item => (
            <div className="product" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <p>{item.title}</p>
            </div>
          ))
          : null
        }
      </div>
      <div className="button-container">
        <button
          onClick={() => setCount(count + 1)}
          disabled={disabledButton}
        >
          Load More Products
        </button>
          {disabledButton && <p>You have reached to 100 products</p>}
      </div>
    </div>
  )
}
