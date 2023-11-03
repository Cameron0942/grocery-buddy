//? PAGES
import Title from "../Components/Title";
import InputArea from "../Components/InputArea";
import GroceryList from "../Components/GroceryList";
import SmartList from "../Components/SmartList";

const MainPage = () => {
  return (
    <>
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", height: "100dvh" }}>
        <Title />
        <InputArea />
        <GroceryList />
        <SmartList />
      </div>
    </>
  );
};

export default MainPage;
