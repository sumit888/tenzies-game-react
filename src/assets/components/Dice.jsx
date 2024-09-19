function Dice(props){

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return(<>
        <section className="dice-box" style={styles} onClick={props.holdDice}>
            <h1 className="dice-num">{props.value}</h1>
        </section>
    </>)
}

export default Dice