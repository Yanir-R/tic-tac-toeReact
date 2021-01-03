
// return on each Click the value of Square

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    )
}
  
export default Square;