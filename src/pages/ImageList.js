import React from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import Loading from "../components/loading";
const ImageList = () => {
  const { loading, images, searchTerm } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  if (images.length < 1 || images === undefined) {
    return (
      <div className="not-found">
        <h1>We Couldn't Find Anything</h1>
        <p>
          <p>برای دسترسی به</p>
          <p>api</p>
          <p>به قندشکن نیاز است</p>
        </p>
      </div>
    );
  } else {
    return (
      <section className="image-list">
        {images.map((image) => {
          const { id, photographer, src, alt, height } = image;
          let img_src;
          if (height < 3000) {
            img_src = src.medium;
          } else {
            img_src = src.large;
          }
          return (
            <div key={id} className="list-item">
              <img src={img_src} alt={alt} />
              <Link to={`/image/${id}`}>
                <div className="overlay">
                  <h1 className="photo-info">Photo by: {photographer}</h1>
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    );
  }
};

export default ImageList;
