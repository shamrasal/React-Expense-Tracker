import classes from './Header.module.css'

const Header = () => {
    return (

        <div className={classes.header}>
            <span className={classes.span1}>
                <h1>MyWebLink</h1>
            </span>
            <span className={classes.span2}>
                <h4>Home</h4>
                <h4>About</h4>
                <h4>Contact Us</h4>
            </span>
        </div>
    )
}
export default Header