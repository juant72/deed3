import React from "react";
import { Header, Footer, Copyright } from "./index";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="template-color-1 nft-body-connect">
            <Header />
            {children}
            <Footer />
            <Copyright />
        </div>
    );
};

export default Layout;
