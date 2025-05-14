from flask import Flask, render_template, request, jsonify
import os
import json
from travel_predictor import TravelDestinationPredictor

app = Flask(__name__)

# Initialize the predictor
predictor = TravelDestinationPredictor()

# Check if model exists, if not, train it
if not os.path.exists('travel_predictor_model.joblib'):
    print("Training new model...")
    predictor.train()
    predictor.save_model()
else:
    print("Loading existing model...")
    predictor.load_model()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get form data
    data = request.get_json()
    
    # Convert form data to model input format
    user_preferences = {
        "budget": int(data.get('budget', 3)),
        "travel_type_preference": data.get('travel_type', 'Beach'),
        "continent_preference": data.get('continent', 'Europe'),
        "has_children": data.get('has_children') == 'true',
        "num_children": int(data.get('num_children', 0)),
        "youngest_child_age": int(data.get('youngest_child_age', 0)),
        "culture_importance": float(data.get('culture_importance', 0.5)),
        "nature_importance": float(data.get('nature_importance', 0.5)),
        "adventure_importance": float(data.get('adventure_importance', 0.5)),
        "relaxation_importance": float(data.get('relaxation_importance', 0.5))
    }
    
    # Make prediction
    results = predictor.predict(user_preferences)
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
