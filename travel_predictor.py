import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
import joblib
import json

# Define the travel destination prediction model class
class TravelDestinationPredictor:
    def __init__(self):
        self.model = None
        self.destinations = None
        self.preprocessor = None
        
    def generate_sample_data(self, n_samples=1000):
        """Generate synthetic data for training the model"""
        np.random.seed(42)
        
        # Define destinations with their characteristics
        destinations = [
            {"name": "Paris, France", "type": "City", "continent": "Europe", "family_friendly": 0.6, "budget_level": 3, "culture_score": 0.9, "nature_score": 0.3, "adventure_score": 0.4, "relaxation_score": 0.6},
            {"name": "Bali, Indonesia", "type": "Beach", "continent": "Asia", "family_friendly": 0.7, "budget_level": 2, "culture_score": 0.7, "nature_score": 0.9, "adventure_score": 0.8, "relaxation_score": 0.9},
            {"name": "New York City, USA", "type": "City", "continent": "North America", "family_friendly": 0.5, "budget_level": 4, "culture_score": 0.9, "nature_score": 0.2, "adventure_score": 0.6, "relaxation_score": 0.3},
            {"name": "Kyoto, Japan", "type": "City", "continent": "Asia", "family_friendly": 0.7, "budget_level": 3, "culture_score": 1.0, "nature_score": 0.6, "adventure_score": 0.5, "relaxation_score": 0.7},
            {"name": "Costa Rica", "type": "Adventure", "continent": "Central America", "family_friendly": 0.8, "budget_level": 2, "culture_score": 0.6, "nature_score": 1.0, "adventure_score": 0.9, "relaxation_score": 0.7},
            {"name": "Santorini, Greece", "type": "Beach", "continent": "Europe", "family_friendly": 0.6, "budget_level": 3, "culture_score": 0.7, "nature_score": 0.8, "adventure_score": 0.5, "relaxation_score": 0.9},
            {"name": "Swiss Alps", "type": "Mountain", "continent": "Europe", "family_friendly": 0.7, "budget_level": 4, "culture_score": 0.5, "nature_score": 1.0, "adventure_score": 0.8, "relaxation_score": 0.7},
            {"name": "Marrakech, Morocco", "type": "City", "continent": "Africa", "family_friendly": 0.5, "budget_level": 2, "culture_score": 0.9, "nature_score": 0.6, "adventure_score": 0.7, "relaxation_score": 0.6},
            {"name": "Maldives", "type": "Beach", "continent": "Asia", "family_friendly": 0.6, "budget_level": 5, "culture_score": 0.4, "nature_score": 0.9, "adventure_score": 0.6, "relaxation_score": 1.0},
            {"name": "Barcelona, Spain", "type": "City", "continent": "Europe", "family_friendly": 0.8, "budget_level": 3, "culture_score": 0.9, "nature_score": 0.5, "adventure_score": 0.6, "relaxation_score": 0.7},
            {"name": "Cape Town, South Africa", "type": "City", "continent": "Africa", "family_friendly": 0.7, "budget_level": 2, "culture_score": 0.8, "nature_score": 0.9, "adventure_score": 0.8, "relaxation_score": 0.6},
            {"name": "Tokyo, Japan", "type": "City", "continent": "Asia", "family_friendly": 0.6, "budget_level": 4, "culture_score": 0.9, "nature_score": 0.3, "adventure_score": 0.7, "relaxation_score": 0.4},
            {"name": "Cancun, Mexico", "type": "Beach", "continent": "North America", "family_friendly": 0.9, "budget_level": 3, "culture_score": 0.5, "nature_score": 0.8, "adventure_score": 0.7, "relaxation_score": 0.9},
            {"name": "Rome, Italy", "type": "City", "continent": "Europe", "family_friendly": 0.7, "budget_level": 3, "culture_score": 1.0, "nature_score": 0.4, "adventure_score": 0.5, "relaxation_score": 0.6},
            {"name": "Queenstown, New Zealand", "type": "Adventure", "continent": "Oceania", "family_friendly": 0.8, "budget_level": 3, "culture_score": 0.5, "nature_score": 1.0, "adventure_score": 1.0, "relaxation_score": 0.6},
            {"name": "Lisbon, Portugal", "type": "City", "continent": "Europe", "family_friendly": 0.8, "budget_level": 2, "culture_score": 0.8, "nature_score": 0.6, "adventure_score": 0.6, "relaxation_score": 0.7},
            {"name": "Phuket, Thailand", "type": "Beach", "continent": "Asia", "family_friendly": 0.7, "budget_level": 2, "culture_score": 0.7, "nature_score": 0.8, "adventure_score": 0.8, "relaxation_score": 0.9},
            {"name": "Yellowstone, USA", "type": "Nature", "continent": "North America", "family_friendly": 0.9, "budget_level": 3, "culture_score": 0.3, "nature_score": 1.0, "adventure_score": 0.8, "relaxation_score": 0.7},
            {"name": "Dubai, UAE", "type": "City", "continent": "Asia", "family_friendly": 0.8, "budget_level": 5, "culture_score": 0.7, "nature_score": 0.4, "adventure_score": 0.8, "relaxation_score": 0.8},
            {"name": "Machu Picchu, Peru", "type": "Adventure", "continent": "South America", "family_friendly": 0.5, "budget_level": 3, "culture_score": 0.9, "nature_score": 0.9, "adventure_score": 0.9, "relaxation_score": 0.4}
        ]
        
        self.destinations = destinations
        
        # Generate synthetic user preferences
        data = []
        for _ in range(n_samples):
            # User preferences
            budget = np.random.randint(1, 6)  # 1-5 (low to high)
            travel_type_pref = np.random.choice(['City', 'Beach', 'Mountain', 'Adventure', 'Nature'])
            continent_pref = np.random.choice(['Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania', 'Central America'])
            has_children = np.random.choice([True, False])
            num_children = np.random.randint(0, 4) if has_children else 0
            youngest_child_age = np.random.randint(1, 18) if num_children > 0 else 0
            culture_importance = np.random.random()  # 0-1
            nature_importance = np.random.random()  # 0-1
            adventure_importance = np.random.random()  # 0-1
            relaxation_importance = np.random.random()  # 0-1
            
            # Calculate scores for each destination based on user preferences
            destination_scores = []
            for dest in destinations:
                # Budget match (closer to user's budget = better)
                budget_match = 1 - abs(dest["budget_level"] - budget) / 4
                
                # Type match
                type_match = 1.0 if dest["type"] == travel_type_pref else 0.3
                
                # Continent match
                continent_match = 1.0 if dest["continent"] == continent_pref else 0.5
                
                # Family friendliness (more important if user has young children)
                family_importance = 1.0 if num_children > 0 and youngest_child_age < 12 else 0.3
                family_score = dest["family_friendly"] * family_importance
                
                # Preference matches
                culture_score = dest["culture_score"] * culture_importance
                nature_score = dest["nature_score"] * nature_importance
                adventure_score = dest["adventure_score"] * adventure_importance
                relaxation_score = dest["relaxation_score"] * relaxation_importance
                
                # Calculate total score
                total_score = (budget_match + type_match + continent_match + family_score + 
                              culture_score + nature_score + adventure_score + relaxation_score) / 8
                
                destination_scores.append(total_score)
            
            # Select destination with highest score
            best_destination_idx = np.argmax(destination_scores)
            selected_destination = destinations[best_destination_idx]["name"]
            
            # Add to dataset
            data.append({
                "budget": budget,
                "travel_type_preference": travel_type_pref,
                "continent_preference": continent_pref,
                "has_children": has_children,
                "num_children": num_children,
                "youngest_child_age": youngest_child_age,
                "culture_importance": culture_importance,
                "nature_importance": nature_importance,
                "adventure_importance": adventure_importance,
                "relaxation_importance": relaxation_importance,
                "destination": selected_destination
            })
        
        return pd.DataFrame(data)
    
    def train(self, data=None):
        """Train the model on either provided or synthetic data"""
        if data is None:
            data = self.generate_sample_data()
        
        # Split features and target
        X = data.drop('destination', axis=1)
        y = data['destination']
        
        # Define preprocessing for numerical and categorical features
        numerical_features = ['budget', 'num_children', 'youngest_child_age', 
                             'culture_importance', 'nature_importance', 
                             'adventure_importance', 'relaxation_importance']
        categorical_features = ['travel_type_preference', 'continent_preference', 'has_children']
        
        numerical_transformer = StandardScaler()
        categorical_transformer = OneHotEncoder(handle_unknown='ignore')
        
        self.preprocessor = ColumnTransformer(
            transformers=[
                ('num', numerical_transformer, numerical_features),
                ('cat', categorical_transformer, categorical_features)
            ])
        
        # Create and train the model pipeline
        self.model = Pipeline(steps=[
            ('preprocessor', self.preprocessor),
            ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
        ])
        
        # Train the model
        self.model.fit(X, y)
        
        # Evaluate the model
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.model.fit(X_train, y_train)
        accuracy = self.model.score(X_test, y_test)
        print(f"Model accuracy: {accuracy:.2f}")
        
        return accuracy
    
    def predict(self, user_preferences):
        """Predict top destinations based on user preferences"""
        if self.model is None:
            self.train()
        
        # Convert user preferences to DataFrame
        user_df = pd.DataFrame([user_preferences])
        
        # Get probabilities for all destinations
        probabilities = self.model.predict_proba(user_df)[0]
        
        # Get class labels (destinations)
        destinations = self.model.classes_
        
        # Create list of (destination, probability) tuples and sort by probability
        destination_probs = [(dest, prob) for dest, prob in zip(destinations, probabilities)]
        destination_probs.sort(key=lambda x: x[1], reverse=True)
        
        # Return top 5 destinations with their probabilities
        top_destinations = destination_probs[:5]
        
        # Format results
        results = []
        for dest_name, prob in top_destinations:
            # Find destination details
            dest_info = next((d for d in self.destinations if d["name"] == dest_name), None)
            if dest_info:
                results.append({
                    "name": dest_name,
                    "probability": float(prob),
                    "type": dest_info["type"],
                    "continent": dest_info["continent"],
                    "match_score": int(prob * 100)
                })
        
        return results
    
    def save_model(self, filename="travel_predictor_model.joblib"):
        """Save the trained model to a file"""
        if self.model is None:
            self.train()
        joblib.dump(self.model, filename)
        
        # Also save destinations data
        with open("destinations.json", "w") as f:
            json.dump(self.destinations, f)
        
        print(f"Model saved to {filename}")
    
    def load_model(self, filename="travel_predictor_model.joblib"):
        """Load a trained model from a file"""
        self.model = joblib.load(filename)
        
        # Load destinations data
        with open("destinations.json", "r") as f:
            self.destinations = json.load(f)
        
        print(f"Model loaded from {filename}")


# Example usage
if __name__ == "__main__":
    # Create and train the model
    predictor = TravelDestinationPredictor()
    accuracy = predictor.train()
    
    # Save the model
    predictor.save_model()
    
    # Example prediction
    user_preferences = {
        "budget": 3,  # 1-5 scale
        "travel_type_preference": "Beach",
        "continent_preference": "Europe",
        "has_children": True,
        "num_children": 2,
        "youngest_child_age": 8,
        "culture_importance": 0.7,  # 0-1 scale
        "nature_importance": 0.8,
        "adventure_importance": 0.5,
        "relaxation_importance": 0.9
    }
    
    results = predictor.predict(user_preferences)
    print("\nTop destination recommendations:")
    for i, dest in enumerate(results, 1):
        print(f"{i}. {dest['name']} ({dest['type']}, {dest['continent']}) - {dest['match_score']}% match")
