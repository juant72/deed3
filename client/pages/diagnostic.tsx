import React from "react";
import Head from "next/head";

export default function DiagnosticPage() {
    return (
        <>
            <Head>
                <title>DIAGNOSTIC PAGE WORKING</title>
            </Head>
            <div style={{
                margin: 0,
                padding: 0,
                backgroundColor: '#ff0000',
                color: 'white',
                fontFamily: 'Arial, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh'
            }}>
                <div style={{
                    textAlign: 'center',
                    border: '5px solid white',
                    padding: '50px',
                    fontSize: '4rem',
                    fontWeight: 'bold'
                }}>
                    DIAGNOSTIC PAGE WORKING
                </div>
            </div>
        </>
    );
}
