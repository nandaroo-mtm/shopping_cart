import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router'
import { addToCart } from "../features/cartSlice";
import { useGetAllProductsQuery } from "../features/productsApi";
import img1 from '../images/product_1.png'
import img2 from '../images/product_2.png'
import img3 from '../images/product_3.png'


const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart= (product)=>{
    dispatch(addToCart(product));
    navigate('/cart');
  }

  return (
    <div className="home-container">
      {isLoading ? (
        <p>Loading</p>
      ) : error ? (
        <p>An error occured!</p>
      ) : (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data.map((product) => (
              <div key={product.id} className="product">
                <h3 className="product-title">{product.title}</h3>
                <img src={product.id === 1? img1: product.id === 2? img2: img3} alt={product.title} />
                <div className="details">
                    <span>{product.description}</span>
                    <span className="price">${product.price}</span>
                </div>
                <button className="cart-btn" onClick={()=> handleAddToCart(product)}>Add To Cart</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
