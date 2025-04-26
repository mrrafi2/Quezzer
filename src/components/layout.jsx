import Header from "./header";

export default function Layout ( {children} ) {

    return(
        <>
        <Header/>
        <div>
        <div className="container-fluid p-2 ">
            {children}
        </div>
        </div>
        </>
    )
}