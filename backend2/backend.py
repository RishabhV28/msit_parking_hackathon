from fastapi import FastAPI
import json

app = FastAPI()

@app.get("/parking-availability")
def get_parking_data():
    with open("parking_data.json", "r") as f:
        data = json.load(f)
    return {"spots": data}

# Run server
if _name_ == "_main_":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
