import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Card, Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHamburger } from "@fortawesome/free-solid-svg-icons";
import { useParams, Link } from "react-router-dom";
import config from "../../util/config";
import { v4 as uuidv4 } from "uuid";
import spinner from "../../assets/Infinity-2.9s-200px.svg";

const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      data {
        attributes {
          name
          recipes {
            data {
              attributes {
                title
                body
                rating
                time
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
              id
            }
          }
        }
        id
      }
    }
  }
`;
const Category = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id },
  });
  const { Meta } = Card;

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
    <h1>{error}</h1>
  ) : (
    <div>
      <h1>{data.category.data.attributes.name}</h1>
      <div>
        <div className="card-grid">
          {data.category.data.attributes.recipes.data.map((item) => (
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
    </div>
  );
};

export default Category;
