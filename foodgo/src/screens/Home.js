import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
// import Carousel from '../components/Carousel';

function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {

      let response = await fetch("https://backend-one-phi-22.vercel.app/api/fooddata", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();

      // // Log the response to debug structure
      console.log(response);
      console.log(response[0]);
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important", objectPosition: "top" }}>
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div class="d-flex justify-content-center">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button class="btn btn-outline-success text-whitef" type="submit">Search</button>  */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="images/file.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="images/french.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="images/gobi.jpeg" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div className="row mb-3" key={data._id}>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {foodItem.length > 0 ? (
                foodItem
                  .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map((filterItems) => (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Card foodItem={filterItems}
                        foodName={filterItems.name}
                        options={filterItems.options[0]}
                      />
                    </div>
                  ))
              ) : (
                <div>No items found</div>
              )}
            </div>
          ))
        ) : (
          <div>Loading categories...</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
