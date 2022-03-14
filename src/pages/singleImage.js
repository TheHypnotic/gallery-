import React, { useCallback, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import Loading from "../components/loading";

const SingleImage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setIsLoading, loading } = useGlobalContext();
  const [image, setImage] = useState({});
  const url = `https://api.pexels.com/v1/photos/${id}`;
  const key = process.env.REACT_APP_PEXELS_API_KEY;

  const fetchApi = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: key,
        },
      });
      const data = await response.json();
      if (data) {
        setImage(data);
        setIsLoading(false);
      } else {
        setImage({});
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      setImage({});
      setIsLoading(false);
    }
  });

  useEffect(() => {
    fetchApi();
  }, [id]);
  const { photographer, src, photographer_url } = image;

  if (loading || src === undefined) {
    return <Loading />;
  }
  if (!image || typeof image.src === undefined) {
    return (
      <div>
        <h1>ops! something went wrong!</h1>
      </div>
    );
  } else {
    return (
      <section className="single-img-sec ">
        <div className="single-img-info">
          <a
            className="photographer-url"
            href={photographer_url}
            target="_blank"
          >
            <h2>Photo by: {photographer}</h2>
          </a>
          <button
            className="go-back-btn"
            onClick={() => {
              navigate(-1);
            }}
          >
            go back
          </button>
        </div>
        <img className="single-img" src={src.large} alt={src.original} />
      </section>
    );
  }
};

export default SingleImage;
