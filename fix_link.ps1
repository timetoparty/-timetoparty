$content = Get-Content 'C:\Users\afons\Desktop\Portfolio\Afonso-main\index.html' -Raw
$content = $content -replace '<a href=projects/travel-predictor-static.html" class="btn primary-btn">Try It</a>', '<a href="projects/travel-predictor-static.html" class="btn primary-btn">Try It</a>'
$content = $content -replace '<a href="http://localhost:5000" class="btn primary-btn">Try It</a>', '<a href="projects/travel-predictor-static.html" class="btn primary-btn">Try It</a>'
$content | Set-Content 'C:\Users\afons\Desktop\Portfolio\Afonso-main\index.html' -Force
Write-Host "File updated successfully."
