document.addEventListener('DOMContentLoaded', function() {
    // Embedding model parameters directly to avoid CORS issues when running locally
    const modelParams = {
        "intercept": [-0.8770026227633579], 
        "coefficients": [[0.2249532511455302, 1.083653913162344, -0.14548859093028485, 0.06861082711162653, -0.09697407382267144, 0.6794557387252976, 0.19999459560845936, 0.3947756552736376]], 
        "feature_means": [3.8450520833333335, 121.68676277850591, 72.40518417462482, 29.15341959334565, 155.54822335025383, 32.457463672391015, 0.47187630208333325, 33.240885416666664], 
        "feature_stds": [3.3695780626988627, 30.43594886720766, 12.096346184037948, 8.79094192562453, 85.02110776922125, 6.8751513275037786, 0.33132859501277484, 11.76023154067868], 
        "features": ["Pregnancies", "Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"]
    };
    
    console.log('Model parameters loaded');
    
    // Handle form submission
    const diabetesForm = document.getElementById('diabetesForm');
    const resultCard = document.getElementById('resultCard');
    const resultValue = document.getElementById('resultValue');
    const resultMessage = document.getElementById('resultMessage');
    
    diabetesForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!modelParams) {
            alert('Model parameters are still loading. Please try again in a few seconds.');
            return;
        }
        
        // Get input values
        const inputs = {
            'Pregnancies': parseFloat(document.getElementById('pregnancies').value),
            'Glucose': parseFloat(document.getElementById('glucose').value),
            'BloodPressure': parseFloat(document.getElementById('bloodPressure').value),
            'SkinThickness': parseFloat(document.getElementById('skinThickness').value),
            'Insulin': parseFloat(document.getElementById('insulin').value),
            'BMI': parseFloat(document.getElementById('bmi').value),
            'DiabetesPedigreeFunction': parseFloat(document.getElementById('diabetesPedigree').value),
            'Age': parseFloat(document.getElementById('age').value)
        };
        
        // Validate inputs
        for (const [key, value] of Object.entries(inputs)) {
            if (isNaN(value)) {
                alert(`Please enter a valid number for ${key}`);
                return;
            }
        }
        
        // Get prediction
        const prediction = predictDiabetes(inputs, modelParams);
        
        // Display result
        resultCard.style.display = 'block';
        
        if (prediction.probability >= 0.5) {
            resultValue.innerText = `High Risk (${(prediction.probability * 100).toFixed(1)}%)`;
            resultMessage.innerText = 'Your inputs indicate a higher risk of diabetes. Please consult with a healthcare professional for proper screening.';
        } else {
            resultValue.innerText = `Low Risk (${(prediction.probability * 100).toFixed(1)}%)`;
            resultMessage.innerText = 'Your inputs indicate a lower risk of diabetes. However, regular health check-ups are still important.';
        }
        
        // Scroll to result
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    
    // Function to make prediction using logistic regression model
    function predictDiabetes(inputs, modelParams) {
        // Standardize inputs using the mean and std from training data
        const standardizedInputs = [];
        
        for (let i = 0; i < modelParams.features.length; i++) {
            const feature = modelParams.features[i];
            const value = inputs[feature];
            const mean = modelParams.feature_means[i];
            const std = modelParams.feature_stds[i];
            
            // Standardize: (x - mean) / std
            standardizedInputs.push((value - mean) / std);
        }
        
        // Calculate logistic regression: 1 / (1 + exp(-z))
        // where z = intercept + sum(coef * x_standardized)
        const coefficients = modelParams.coefficients[0];
        const intercept = modelParams.intercept[0];
        
        let z = intercept;
        for (let i = 0; i < standardizedInputs.length; i++) {
            z += coefficients[i] * standardizedInputs[i];
        }
        
        // Apply sigmoid function to get probability
        const probability = 1 / (1 + Math.exp(-z));
        
        return {
            probability: probability,
            prediction: probability >= 0.5 ? 1 : 0
        };
    }
});
