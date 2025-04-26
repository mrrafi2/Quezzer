import Account from "./account";
import Logo from "./logo";
import Nav from "./nav";
import classes from "./style/header.module.css"; 

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.headerContainer}>
        <Logo />

        <div className={classes.headerRight}>
          <Account />
          <Nav />
        </div>
      </div>
    </header>
  );
}
