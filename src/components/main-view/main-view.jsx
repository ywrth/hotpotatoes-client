export const MainView = () => { // exposing the main-view component - import components to the other files
    return ( // only one root element, hence the big div
    <React.Fragment> 
      <div> 
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <button>TEST</button>
      </React.Fragment> // or I can use <> instead of react.fragment
    );
  };