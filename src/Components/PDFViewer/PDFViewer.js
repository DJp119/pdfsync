import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation"; // New import
import socket from "../../socket";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';

function PDFViewer({ role, pdfFile }) {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const pageNavigationPluginInstance = pageNavigationPlugin(); // Initialize page navigation plugin
    const { CurrentPageInput, GoToFirstPageButton, GoToLastPageButton, GoToNextPageButton, GoToPreviousPage , jumpToPage} = pageNavigationPluginInstance;
    // const { jumpToPage } = pageNavigationPluginInstance; // Use this to jump to specific page
    // Current page state
    const [currentPage, setCurrentPage] = useState(1);
    // const [pageNumber, setPageNumber] = useState(1);
    // const handleNextPage = () => {
    //     setCurrentPage((prevPage) => {
    //         const newPage = prevPage + 1;
    //         socket.emit("pageChange", { page: newPage });

    //         jumpToPage(newPage - 1); // jumpToPage uses zero-indexed pages
    //         return newPage;
    //     });
    // };
    function handleNextPage(){
        setCurrentPage((currentPage) => currentPage + 1);
    }
    function handlePreviousPage(){
        setCurrentPage((currentPage) => currentPage - 1);
    }
    // const handlePreviousPage = () => {
    //     setCurrentPage((prevPage) => {
    //         const newPage = Math.max(prevPage - 1, 1);
    //         socket.emit("pageChange", { page: newPage });
    //         jumpToPage(newPage - 1);
    //         <GoToNextPageButton></GoToNextPageButton>
    //         return newPage;
    //     });
    // };

    // Listen to page changes from socket and update viewer page
    useEffect(() => {
        socket.on("pageChange", ({ page }) => {
            setCurrentPage(page);
            jumpToPage(page - 1); // Sync viewer page with received page
        });

        return () => {
            socket.off("pageChange");
        };
    }, [jumpToPage]);

    return (
        <div>
            <h2>PDF Viewer ({role})</h2>
            
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                 <Viewer
                    fileUrl={pdfFile}
                    // key={pageNumber}
                    // pageNumber={pageNumber}
                    plugins={[ pageNavigationPluginInstance]} // Add page navigation plugin
                    // plugins={[defaultLayoutPluginInstance, pageNavigationPluginInstance]} // Add page navigation plugin
                /> 
            </Worker>

            <div>
                {role === "Admin" && (
                    <>
                        <button onClick={handlePreviousPage} disabled={currentPage <= 1}>
                            Previous
                        </button>
                        <button onClick={handleNextPage}>
                            Next
                        </button>
                    </>
                )}
                <p>Current Page: {currentPage}</p>
            </div>

            {/* <div>
                <div
        style={{
            border: '1px solid rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        }}
    >
            <div
            style={{
                alignItems: 'center',
                backgroundColor: '#eeeeee',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'center',
                padding: '4px',
            }}
        >
            <div style={{ padding: '0px 2px' }}>
                <GoToFirstPageButton />
            </div>
            <div style={{ padding: '0px 2px' }}>
                <GoToPreviousPage />
            </div>
            <div style={{ padding: '0px 2px' }}>
                <CurrentPageInput />
            </div>
            <div style={{ padding: '0px 2px' }}>
                <GoToNextPageButton />
            </div>
            <div style={{ padding: '0px 2px' }}>
                <GoToLastPageButton />
            </div>
        </div>
        <div
            style={{
                flex: 1,
                overflow: 'hidden',
            }}
        >
            <Viewer fileUrl={pdfFile} plugins={[pageNavigationPluginInstance]}  />
        </div>
    </div>
            </div> */}
        
        </div>
    );
}
export default PDFViewer;

