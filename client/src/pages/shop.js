import React, { useEffect, useState } from 'react';
import { getProductsByCount, fetchProductsByFilter } from '../functions/product';
import {getCategories} from '../functions/category';
import {getSubs} from '../functions/sub';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { Menu, Slider, Checkbox,Radio } from 'antd';
import { DollarOutlined,DownSquareOutlined, StarOutlined } from '@ant-design/icons'
import Star from '../components/forms/Star';

const { SubMenu, ItemGroup } = Menu;


const Shop = () => {

    const [products, setProducts] = useState([]);
    //to show categories on the side bar
    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([]);
    const [brands, setBrands] = useState(["Apple", "Samsung", "Microsoft", "Lenovo", "Asus", "HP"]);
    const [colors, setColors] = useState(["Black", "Brown", "Silver", "White", "Blue"])
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [star, setStar] = useState('');
    // to store selected categories ids
    const [categoryIds, setCategoryIds] = useState([]);
    const [shipping, setShipping] = useState(false);
    const [brand, setBrand] = useState("");
    const [color, setColor] = useState("");

    // selected sub
    const [sub, setSub] = useState("");

    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        setLoading(true);
        loadAllProducts();
        getCategories().then((res) => setCategories(res.data));
        getSubs().then((res) => setSubs(res.data));
    }, []);


    // 1. load default products
    const loadAllProducts = () => {
        getProductsByCount(12)
            .then((p) => {
                setProducts(p.data);
                setLoading(false);
            });
    }
    // 2. load products on user search input
    const fetchProducts = (text) => {
        fetchProductsByFilter(text).then((res) => setProducts(res.data));
    }
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
        }, 300)
        return () => clearTimeout(delayed);
    }, [text]);

    // 3. load products based on price range
     useEffect(() => {
       console.log("ok to request");
       fetchProducts({ price });
     }, [ok])

     const handleSlider= (value) => {
        // reset other values 
        dispatch({type:"SEARCH_QUERY", payload:{text:""}})
        setCategoryIds([]);
        setStar("");
        setSub("");
        setBrand("");        
        setColor("");
        setShipping("");
         setPrice(value);
         setTimeout(() => {
               setOk(!ok) ;
         },300)
         
     }

   // 4. load products based on category

   const showCategories = () => categories.map((c) => <div key = {c._id} >
                                                        <Checkbox className='pb-2 pl-4' 
                                                                       name="category" 
                                                                      value={c._id} 
                                                                   onChange={handleCheck} 
                                                                    checked={categoryIds.includes(c._id)}  >    
                                                                    
                                                                    {c.name}  
                                                                    <br/> 
                                                        </Checkbox>    
                                                      </div>);

 const handleCheck = (e) => {
    // clear the seatch query
    dispatch({type:"SEARCH_QUERY", payload:{text:""}})
    // reset the price
    setPrice([0,0]);
    //reset rating 
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);  // not found returns -1 found returns index 
   
    if (foundInTheState === -1) {
        inTheState.push(justChecked);
    } else {
        // if found in state remove it
        inTheState.splice(foundInTheState,1)
    }

    setCategoryIds(inTheState);
  
    fetchProducts({category:inTheState});
 }


// Filter by Star ratings

 const handleStarClick = num => {
    
    // reset other values
    // clear the seatch query
    dispatch({type:"SEARCH_QUERY", payload:{text:""}})
    // reset the price
    setPrice([0,0]);
    // reset categories
    setCategoryIds([]);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    setStar(num)
    fetchProducts({stars:num});

 }
const showStars = () => (
    <div className="pr-4 pl-4 pb-4">
        <Star starClick={handleStarClick} numberOfStars={5}/>
        <Star starClick={handleStarClick} numberOfStars={4}/>
        <Star starClick={handleStarClick} numberOfStars={3}/>
        <Star starClick={handleStarClick} numberOfStars={2}/>
        <Star starClick={handleStarClick} numberOfStars={1}/>
    </div>
)

// show products by subs

const handleSub = (sub) => {
   // console.log("SUB:",s);

   
    // reset other values
    // clear the seatch query
    dispatch({type:"SEARCH_QUERY", payload:{text:""}})
    // reset the price
    setPrice([0,0]);
    // reset categories
    setCategoryIds([]);
    setStar("");
    setSub(sub);
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({sub});
   
}
const showSubs = () => {
 return (    
    subs.map((s) =><div onClick={() => handleSub(s)} className='p-1 m-2 badcss badge' key={s._id}>
                       {s.name}</div> )
    
 )
}
 
// Show Products by Brand

const handleBrand = (e) => {
    // clear other filters

        // clear the seatch query
        dispatch({type:"SEARCH_QUERY", payload:{text:""}});        
        setPrice([0,0]);        
        setCategoryIds([]);
        setSub("");
        setStar("");                
        setBrand(e.target.value);
        setColor("");        
        fetchProducts({brand:e.target.value});
        setShipping("");

}
const showBrands = () => {
    
    return (    
       brands.map((s) =><Radio  value = {s} className=' brand  ' name ={s} checked = {s === brand} onChange={handleBrand}>
                          {s}</Radio> )
       
    )
}

// Show Products by Color

const handleColor = (e) => {
    // clear other filters

        // clear the seatch query
        dispatch({type:"SEARCH_QUERY", payload:{text:""}});        
        setPrice([0,0]);        
        setCategoryIds([]);
        setSub("");
        setStar("");
        setBrand("");        
        setColor(e.target.value);
        setShipping("");
        fetchProducts({color:e.target.value});

}

const showColors = () => {
    return (    
        colors.map((s) =><Radio  value = {s} className='brand' name ={s} checked = {s === color} onChange={handleColor}>
                           {s}</Radio> )
        
     )
}

// Show Products by Shipping
const handleShipping = (e) => {
  // clear the seatch query
  dispatch({type:"SEARCH_QUERY", payload:{text:""}});        
  setPrice([0,0]);        
  setCategoryIds([]);
  setSub("");
  setStar("");
  setBrand("");        
  setColor("");
  setShipping(e.target.value);
  fetchProducts({shipping:e.target.value});
}
const showShipping = () => {
 return (<div>
     <Checkbox  onChange={handleShipping} value="Yes" checked ={shipping === "Yes"}> Yes</Checkbox>
     <Checkbox  onChange={handleShipping} value="No" checked ={shipping === "No"}> No</Checkbox>
     </div>
 )
}
    return (
        
        <div className='container-fluid'>       
            <div className="row">
                <div className="col-md-2">
                    <h5 className='mt-2'>Search/Filter</h5>
                    <hr />
                    <Menu mode="inline" defaultOpenKeys={["1","2","3","4","5","6","7"]}>

                        <SubMenu key="1" title={<span className='h6'><DollarOutlined /> Price</span>}>
                            <div>
                                <Slider className="ml-1 mr-4"
                                    tipFormatter={(v) => `$${v}`}
                                    range
                                    value={price}
                                    max="4999"
                                    onChange={handleSlider} />
                            </div>
                        </SubMenu>

                        <SubMenu key="2" title={<span className='h6'><DownSquareOutlined /> Categories</span>}>
                            <div>
                                {showCategories()}
                            </div>
                        </SubMenu>
                        
                        <SubMenu key="3" title={<span className='h6'><StarOutlined /> Ratings </span>}>
                            <div className='pb-3'>
                              {showStars()}
                            </div>
                        </SubMenu>

                        <SubMenu key="4" title={<span className='h6'><DownSquareOutlined /> Sub Categories</span>}>
                            <div>
                             {showSubs()} 
                            </div>
                        </SubMenu>

                        <SubMenu key="5" title={<span className='h6'><DownSquareOutlined /> Brand</span>}>
                            <div>
                             {showBrands()} 
                            </div>
                        </SubMenu>

                        <SubMenu key="6" title={<span className='h6'><DownSquareOutlined /> Color</span>}>
                            <div>
                             {showColors()} 
                            </div>
                        </SubMenu>

                        <SubMenu key="7" title={<span className='h6'><DownSquareOutlined /> Shipping </span>}>
                            <div>
                           {showShipping()}
                            </div>
                        </SubMenu>

                    </Menu>

                </div>
                <div className="col-md-9">
                
                    {loading ? (<h4 className='text-danger mt-2'> Loading</h4>) : (<h4 className='mt-2'> Products</h4>)}
                    {products.length < 1 && <p>No products found</p>}

                    <div className="row">
                        {products.map((p) => (
                            <div key={p._id} className="col-md-3">
                                <ProductCard product={p} />

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;