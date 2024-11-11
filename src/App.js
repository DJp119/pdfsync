import React, { useEffect, useState } from "react";
import socket from "./socket";
import { Document, Page } from "@react-pdf-viewer/core";
import PDFViewer from "./Components/PDFViewer/PDFViewer";
import "@react-pdf-viewer/core/lib/styles/index.css";


function App() {
    // const [loading, setLoading] = useState(true);

    const [role, setRole] = useState(null); // Admin or Viewer
    const [currentPage, setCurrentPage] = useState(1);
    const [pdfFile, setPdfFile] = useState("http://darshanpatel911.s3-website-us-east-1.amazonaws.com/");
    
    useEffect(() => {
      socket.on("pageChange", ({ Page }) => {
        setCurrentPage(Page);
      });
    
      return () => {
        socket.off("pageChange");
      };
    }, []);

    const handleRoleSelection = (role) => {
        setRole(role);
    };

    return (
        <div className="App">
            {!role ? (
                <div>
                    <h2>Select Your Role</h2>
                    <button onClick={() => handleRoleSelection("Admin")}>Admin</button>
                    <button onClick={() => handleRoleSelection("Viewer")}>Viewer</button>
                </div>
            ) : (
                <PDFViewer role={role} currentPage={currentPage} setCurrentPage={setCurrentPage} pdfFile={pdfFile} />
                
            )}
        </div>
    );
}

export default App;
