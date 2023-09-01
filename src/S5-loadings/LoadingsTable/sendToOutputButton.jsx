const sendToOutputButton = (props) => {
  // const { setOutputData } = S5DataSlice();

  const handleClick = (event) => {
    // setOutputData(props.data);
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      Send Table Data to Output
    </button>
  );
};
