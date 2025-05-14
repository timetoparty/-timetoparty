// Travel Destination Predictor - JavaScript Implementation
// This is a simplified version of the Python model that runs entirely in the browser

// Function to predict top destinations based on user preferences
function predictDestinations(userPreferences) {
    // First, filter destinations by continent if a specific continent is selected
    let filteredDestinations = destinations;
    if (userPreferences.continent_preference !== "Any") {
        filteredDestinations = destinations.filter(dest => 
            dest.continent === userPreferences.continent_preference
        );
        
        // If no destinations match the selected continent, fall back to all destinations
        if (filteredDestinations.length === 0) {
            filteredDestinations = destinations;
        }
    }
    
    // Calculate scores for each destination
    const destinationScores = filteredDestinations.map(dest => {
        // Budget match (closer to user's budget = better)
        const budgetMatch = 1 - Math.abs(dest.budget_level - userPreferences.budget) / 4;
        
        // Type match
        const typeMatch = dest.type === userPreferences.travel_type_preference ? 1.0 : 0.3;
        
        // Family friendliness (more important if user has young children)
        const familyImportance = userPreferences.num_children > 0 && userPreferences.youngest_child_age < 12 ? 1.0 : 0.3;
        const familyScore = dest.family_friendly * familyImportance;
        
        // Preference matches
        const cultureScore = dest.culture_score * userPreferences.culture_importance;
        const natureScore = dest.nature_score * userPreferences.nature_importance;
        const adventureScore = dest.adventure_score * userPreferences.adventure_importance;
        const relaxationScore = dest.relaxation_score * userPreferences.relaxation_importance;
        
        // Calculate total score (no need for continent match since we've already filtered)
        const totalScore = (budgetMatch + typeMatch + familyScore + 
                          cultureScore + natureScore + adventureScore + relaxationScore) / 7;
        
        // Return destination with its score
        return {
            name: dest.name,
            type: dest.type,
            continent: dest.continent,
            match_score: Math.round(totalScore * 100),
            probability: totalScore
        };
    });
    
    // Sort destinations by score (descending)
    destinationScores.sort((a, b) => b.match_score - a.match_score);
    
    // Return top 5 destinations
    return destinationScores.slice(0, 5);
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const budget = parseInt(document.getElementById('budget').value);
    const travelType = document.getElementById('travel_type').value;
    const continent = document.getElementById('continent').value;
    const hasChildren = document.getElementById('has_children').value === 'true';
    const numChildren = parseInt(document.getElementById('num_children').value);
    const youngestChildAge = parseInt(document.getElementById('youngest_child_age').value);
    
    // Get importance values and convert from 0-10 scale to 0-1 scale
    const cultureImportance = parseInt(document.getElementById('culture_importance').value) / 10;
    const natureImportance = parseInt(document.getElementById('nature_importance').value) / 10;
    const adventureImportance = parseInt(document.getElementById('adventure_importance').value) / 10;
    const relaxationImportance = parseInt(document.getElementById('relaxation_importance').value) / 10;
    
    // Create user preferences object
    const userPreferences = {
        budget: budget,
        travel_type_preference: travelType,
        continent_preference: continent,
        has_children: hasChildren,
        num_children: numChildren,
        youngest_child_age: youngestChildAge,
        culture_importance: cultureImportance,
        nature_importance: natureImportance,
        adventure_importance: adventureImportance,
        relaxation_importance: relaxationImportance
    };
    
    // Get predictions
    const results = predictDestinations(userPreferences);
    
    // Display results
    displayResults(results);
}

// Function to display results
function displayResults(results) {
    const resultsContainer = document.getElementById('resultsContainer');
    const destinationCards = document.getElementById('destinationCards');
    
    // Clear previous results
    destinationCards.innerHTML = '';
    
    // Create a list for results
    const resultsList = document.createElement('ol');
    resultsList.className = 'destination-list';
    
    // Create a list item for each destination
    results.forEach(destination => {
        const listItem = document.createElement('li');
        listItem.className = 'destination-item';
        
        listItem.innerHTML = `
            <div class="destination-info">
                <h3 class="destination-name">${destination.name}</h3>
                <p class="destination-type">${destination.type} | ${destination.continent}</p>
                <div class="destination-match">
                    <span class="match-label">Match:</span>
                    <div class="match-bar">
                        <div class="match-progress" style="width: ${destination.match_score}%"></div>
                    </div>
                    <span class="match-percentage">${destination.match_score}%</span>
                </div>
            </div>
        `;
        
        resultsList.appendChild(listItem);
    });
    
    destinationCards.appendChild(resultsList);
    
    // Show results
    resultsContainer.style.display = 'block';
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

// Initialize the form when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Update range value displays
    document.querySelectorAll('input[type="range"]').forEach(range => {
        const valueDisplay = document.getElementById(range.id + '_value');
        range.addEventListener('input', () => {
            valueDisplay.textContent = range.value;
        });
    });
    
    // Show/hide children options
    const hasChildrenSelect = document.getElementById('has_children');
    const childrenOptions = document.querySelectorAll('.children-options');
    
    hasChildrenSelect.addEventListener('change', () => {
        const showChildOptions = hasChildrenSelect.value === 'true';
        childrenOptions.forEach(option => {
            option.style.display = showChildOptions ? 'block' : 'none';
        });
        
        if (!showChildOptions) {
            document.getElementById('num_children').value = 0;
            document.getElementById('youngest_child_age').value = 0;
        }
    });
    
    // Add form submission handler
    document.getElementById('predictorForm').addEventListener('submit', handleFormSubmit);
});
