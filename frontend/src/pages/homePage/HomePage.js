import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import config from "../../util/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import "../../App.css";

const RECIPES = gql`
  query GetRECIPES {
    recipes {
      data {
        id
        attributes {
          title
          body
          rating
          time
          uuid
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
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const HomePage = () => {
  const { data, error, loading } = useQuery(RECIPES);
  const { Meta } = Card;

  return (
    <div>
      <h1>Home</h1>
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1>{error.message}</h1>
      ) : (
        <div>
          <div className="card-grid">
            {data.recipes.data.map((item) => (
              <Link key={item.id} className="link" to={`/details/${item.id}`}>
                <Card
                  hoverable={true}
                  style={{ borderRadius: 20 }}
                  cover={
                    <img
                      alt="example"
                      src={
                        config.BASE_ENDPOINT_URL +
                        `${item.attributes.image.data[0].attributes.url}`
                      }
                      height={240}
                      style={{
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                      }}
                    />
                  }
                >
                  <Meta
                    title={item.attributes.title}
                    style={{ marginBottom: 10 }}
                  ></Meta>
                  <div className="card-row">
                    {item.attributes.time + " min"}
                    <div className="card-row">
                      {[...Array(item.attributes.rating)].map(() => (
                        <div key={uuidv4()}>
                          <FontAwesomeIcon
                            icon={faStar}
                            color="#FFC20E"
                            style={{ fontSize: 16 }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
