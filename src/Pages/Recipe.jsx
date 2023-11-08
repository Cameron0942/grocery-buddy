//? REACT
import { useState, useEffect } from "react";

//? AXIOS
import axios from "axios";

//? MATERIAL UI
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";
import { Button, CircularProgress } from "@material-ui/core";

const ExpandMore = styled((props) => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  backgroundColor: "",
}));

// This function takes a string of instructions as input and formats it as an unordered list
function formatInstructions(instructions) {
  // Split the instructions string into an array of lines using the newline character '\n'
  const lines = instructions.split("\n");

  return (
    <ul>
      {/* Map each line of instructions to a list item (<li>) */}
      {lines.map((line, index) => (
        <>
          <li key={index}>{line}</li>
          <Divider sx={{ backgroundColor: "#000000", height: "1px" }} />
        </>
      ))}
    </ul>
  );
}

function encodeBase64(arrayBuffer) {
  const binaryString = Array.from(new Uint8Array(arrayBuffer))
    .map((byte) => String.fromCharCode(byte))
    .join("");
  return btoa(binaryString);
}

const Recipe = () => {
  const [responseMessage, setResponseMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [expandedStates, setExpandedStates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  //* Get background img from Pexels
  useEffect(() => {
    const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
    const searchQuery = "food ingredients";
    const perPage = 70;

    axios
      .get(
        `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=${perPage}`,
        {
          headers: {
            Authorization: apiKey,
          },
        }
      )
      .then((response) => {
        const photos = response.data.photos;

        // Choose a random photo from the response
        const randomIndex = Math.floor(Math.random() * photos.length);
        const randomPhoto = photos[randomIndex];

        // Get the original image URL
        const imageUrl = randomPhoto.src.original;

        // Update the #root element's background-image property
        const rootElement = document.getElementById("root");
        if (rootElement) {
          rootElement.style.backgroundImage = `url(${imageUrl})`;
        }
      })
      .catch((error) => {
        console.error("Error fetching images: ", error);
      });
  }, []);

  //* Fill array with collapsable card state to false (when responseMessage exists)
  useEffect(() => {
    if (responseMessage) {
      setExpandedStates(new Array(responseMessage.length).fill(false));
    }
  }, [responseMessage]);

  useEffect(() => {
    makePostRequest("https://grocery-buddy-hz65.onrender.com/recipe");
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    setExpandedStates(new Array(responseMessage.length).fill(false));
    setExpanded(false);
  };

  const handleExpandClick = (index) => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };

  async function makePostRequest(url) {
    try {
      setLoading(true);

      const payload = JSON.parse(localStorage.getItem("list")) || ["chicken"];

      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setResponseMessage(data);
      } else {
        console.log(`HTTP Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  const handleReturnToGroceryList = () => {
    window.location.href = "/";
  };
  const renderCards = () => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const visibleCards = responseMessage.slice(startIndex, endIndex);

    return visibleCards.map((recipe, index) => (
      <Card
        key={index}
        sx={{
          backgroundColor: "#ecf3ff",
          marginBottom: 2,
          width: "30dvw",
          paddingLeft: 4,
          paddingRight: 4,
          paddingBottom: 2,
        }}
        className="responsive-card"
      >
        <CardHeader
          title={recipe.Title}
          sx={{
            textAlign: "center",
            "& .MuiTypography-root": {
              fontSize: "40px",
            },
          }}
          className="responsive-card-header"
        />
        <Divider
          sx={{
            backgroundColor: "#000000",
            height: "2px",
            marginBottom: 1,
          }}
        ></Divider>

        <div
          style={{
            width: "70%",
            height: "100%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <CardMedia
            component="img"
            height="100%"
            src={`data:image/jpeg;base64,${encodeBase64(recipe.image.data)}`}
            alt={recipe.Title}
            sx={{
              objectFit: "cover",
              aspectRatio: "auto",
              loading: "lazy",
              marginBottom: 1,
              borderRadius: "4px",
              outline: "1px solid black",
            }}
            className="responsive-card-img"
          />
        </div>
        <Divider sx={{ backgroundColor: "#000000", height: "2px" }} />
        <Typography variant="h5">Ingredients:</Typography>
        <CardContent>
          {JSON.parse(recipe.Ingredients.replace(/'/g, '"')).map(
            (ingredient, index) => (
              <>
                <li key={index} style={{ fontSize: "18px" }}>
                  {ingredient}
                </li>
                <Divider sx={{ backgroundColor: "#000000", height: "1px" }} />
              </>
            )
          )}
        </CardContent>

        <Typography variant="h5">Instructions:</Typography>
        <ExpandMore
          expand={expandedStates[index]}
          onClick={() => handleExpandClick(index)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>

        <Collapse in={expandedStates[index]} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph sx={{ fontSize: "18px" }}>
              {formatInstructions(recipe.Instructions)}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    ));
  };

  const totalPageCount = Math.ceil(
    (responseMessage?.length ?? 0) / cardsPerPage
  );

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(5px)",
        height: "100dvh",
      }}
    >
      {/*<Link to="/">Go back to Grocery List</Link>*/}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            textShadow: "1px 1px black",
          }}
          className="responsive-suggested-recipe-header"
        >
          Suggested Recipes
        </h1>
        <Typography
          variant="body1"
          sx={{}}
          className="responsive-suggested-recipe-description"
        >
          These recipes are suggested to you based on the items in your grocery
          list. If your grocery list contains at least half of the ingredients
          for a recipe, it will be suggested to you. To generate more recipes{" "}
          <a href="/" style={{ textDecoration: "none", color: "#a8c8f7" }}>
            <u>try adding more items to your grocery list!</u>
          </a>
        </Typography>

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 10, marginBottom: 10 }}
          onClick={handleReturnToGroceryList}
        >
          Return to grocery list
        </Button>
      </div>
      <div>
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <span style={{ color: "#ffffff", textShadow: "1px 1px black" }}>
              Loading recipes...
            </span>
            <CircularProgress size={75} color="secondary" />
          </div>
        )}

        {responseMessage && (
          <div style={{ paddingBottom: 2 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={totalPageCount}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                size="large"
                sx={{
                  marginBottom: 2,
                  backgroundColor: "rgba(184, 184, 184, 0.8)",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignContent: "stretch",
                justifyContent: "space-evenly",
                alignItems: "baseline",
              }}
            >
              {renderCards()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipe;
