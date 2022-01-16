import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Image, Row, Col, Carousel, Card } from "antd";
import ReactMarkdown from "react-markdown";
import config from "../../util/config";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import spinner from "../../assets/Infinity-2.9s-200px.svg";

const RECIPE = gql`
  query GetRecipe($id: ID!) {
    recipe(id: $id) {
      data {
        id
        attributes {
          title
          body
          rating
          uuid
          time
          ingredients
          image {
            data {
              id
              attributes {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

const Details = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(RECIPE, {
    variables: { id: id },
  });

  const contentStyle = {
    height: "300px",
    lineHeight: "300px",
    textAlign: "center",
    background: "#a085ca",
    width: "400px",
  };

  return loading ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src={spinner} style={{ height: 300, width: 300, paddingTop: 40 }} />
    </div>
  ) : error ? (
    <div>
      <h1>{error}</h1>
      <Link to="/">Back</Link>
    </div>
  ) : (
    <>
      <h1>{data.recipe.data.attributes.title}</h1>
      <div className="content-row">
        <div className="content-column">
          <Card
            title="General info"
            style={{
              width: "90%",
              borderRadius: 20,
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            <div className="card-row">
              Time to make: {data.recipe.data.attributes.time} min{" "}
              <div className="card-row">
                Rating:
                <div className="card-row">
                  {[...Array(data.recipe.data.attributes.rating)].map(() => (
                    <div key={uuidv4()}>
                      <FontAwesomeIcon
                        icon={faStar}
                        color="#FFC20E"
                        style={{ fontSize: 15, marginLeft: 2 }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          <Card
            title="How to make"
            bordered={true}
            hoverable={false}
            style={{ width: "90%", borderRadius: 20 }}
          >
            <ReactMarkdown>{data.recipe.data.attributes.body}</ReactMarkdown>
          </Card>
        </div>
        <div className="content-column">
          <Card style={{ width: "450px", borderRadius: 20 }}>
            <Carousel
              style={contentStyle}
              autoplay={true}
              pauseOnDotsHover={true}
              pauseOnFocus={true}
              infinite={true}
              arrows={true}
              pauseOnHover={true}
            >
              {data.recipe.data.attributes.image.data.map((c) => (
                <div key={uuidv4}>
                  <Image
                    src={config.BASE_ENDPOINT_URL + `${c.attributes.url}`}
                    alt="No image"
                    height={300}
                    width="100%"
                  />
                </div>
              ))}
            </Carousel>
          </Card>
          <Card
            title="Ingredients"
            bordered={true}
            hoverable={false}
            style={{ borderRadius: 20, width: 450 }}
          >
            <ReactMarkdown>
              {data.recipe.data.attributes.ingredients}
            </ReactMarkdown>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Details;
