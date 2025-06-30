import React from "react";

export default function DiagnosticPage() {
    return (
        <html>
            <head>
                <title>DIAGNOSTIC PAGE WORKING</title>
            </head>
            <body style={{
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
                    fontSize: '48px',
                    fontWeight: 'bold'
                }}>
                    🔥 DIAGNOSTIC PAGE FUNCIONANDO 🔥
                    <br />
                    {new Date().toLocaleString()}
                </div>
            </body>
        </html>
    );
}
