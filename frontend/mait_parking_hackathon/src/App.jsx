import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
    const [spots, setSpots] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/parking-availability")
            .then(response => response.json())
            .then(data => setSpots(data.spots))
            .catch(error => console.error("Error fetching parking data:", error));
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        
        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await fetch("http://localhost:8000/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            console.log("Upload response:", data);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Parking Availability</h1>
            <div className="upload-section">
                <input type="file" onChange={handleFileChange} className="file-input" />
                <button onClick={handleUpload} className="upload-button">Upload Image</button>
            </div>
            <div className="grid">
                {spots.map(spot => (
                    <div
                        key={spot.id}
                        className={`spot ${spot.status === "free" ? "free" : "occupied"}`}
                    >
                        Spot {spot.id} - {spot.status.toUpperCase()}
                    </div>
                ))}
            </div>
        </div>
    );
}
