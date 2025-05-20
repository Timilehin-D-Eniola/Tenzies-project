
export default function (props) {
  const styles = {
    backgroundColor: props.isHeld ? "#522546" : "white", color: props.isHeld ? "white" : "#522546"
  };

  return (
     <button 
     onClick={props.hold}
     style={styles}>{props.value}</button>  
    
  )
}