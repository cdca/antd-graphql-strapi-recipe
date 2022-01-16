import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import config from "../../util/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger, faStar } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import "../../App.css";
import spinner from "../../assets/Infinity-2.9s-200px.svg";

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
      {loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "#a085ca", paddingTop: 60 }}>
            Waiting for Heroku to wake up...
          </h1>
          ;
          <img src={spinner} style={{ height: 300, width: 300 }} />
          <h3>
            {" "}
            Sadly there are no images in this app, so I've put some Fa-Icons{" "}
            <FontAwesomeIcon
              icon={faStar}
              style={{ color: "#a085ca", fontSize: 24 }}
            />
          </h3>
        </div>
      ) : error ? (
        <h1>{error.message}</h1>
      ) : (
        <div>
          <h1>Home</h1>
          <div className="card-grid">
            {data.recipes.data.map((item) => (
              <Link key={item.id} className="link" to={`/details/${item.id}`}>
                <Card
                  hoverable={true}
                  style={{ borderRadius: 20 }}
                  cover={
                    <FontAwesomeIcon
                      icon={faHamburger}
                      style={{ height: 250 }}
                      className="cover-icon"
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
