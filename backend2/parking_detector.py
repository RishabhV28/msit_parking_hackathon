import cv2
import numpy as np
import json

# Load image
image = cv2.imread("parking_lot.jpg")
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
blur = cv2.GaussianBlur(gray, (5,5), 0)
edges = cv2.Canny(blur, 50, 150)

# Find contours (parking spots)
contours, _ = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

parking_spots = []
for i, contour in enumerate(contours):
    x, y, w, h = cv2.boundingRect(contour)
    if 100 < w < 300 and 50 < h < 200:  # Filtering valid parking spots
        cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)
        parking_spots.append({"id": i, "x": x, "y": y, "status": "free"})

# Save results
with open("parking_data.json", "w") as f:
    json.dump(parking_spots, f)

cv2.imshow("Detected Parking Spots", image)
cv2.waitKey(0)
cv2.destroyAllWindows()
