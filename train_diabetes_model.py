import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import json

# Load the dataset
df = pd.read_csv('data/DiabetesBinaryClassification.csv')

# Rename columns for easier handling
df.columns = [
    'Pregnancies', 
    'Glucose', 
    'BloodPressure', 
    'SkinThickness', 
    'Insulin', 
    'BMI', 
    'DiabetesPedigreeFunction', 
    'Age', 
    'Outcome'
]

# Separate features and target
X = df.drop('Outcome', axis=1)
y = df['Outcome']

# Replace zeros with NaN in specific columns (these shouldn't be zero)
for column in ['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI']:
    X[column] = X[column].replace(0, np.NaN)

# Fill missing values with mean
X = X.fillna(X.mean())

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Feature scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train logistic regression model
model = LogisticRegression(max_iter=1000)
model.fit(X_train_scaled, y_train)

# Evaluate model
y_pred = model.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

print(f"Model Accuracy: {accuracy:.4f}")
print("\nClassification Report:")
print(report)

# Save model parameters in JSON format for use in JavaScript
model_params = {
    'intercept': model.intercept_.tolist(),
    'coefficients': model.coef_.tolist(),
    'feature_means': X.mean().tolist(),
    'feature_stds': X.std().tolist(),
    'features': X.columns.tolist()
}

with open('js/diabetes_model.json', 'w') as f:
    json.dump(model_params, f)

print("\nModel parameters saved to js/diabetes_model.json")
