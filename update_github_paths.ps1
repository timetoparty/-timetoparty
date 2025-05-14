# This script updates all paths in HTML files from /MyData/ to /web-portfolio/

# Define the source directory (which is the current directory)
$sourceDir = "C:\Users\afons\Desktop\Portfolio\MyData"

# Get all HTML files in the source directory and its subdirectories
$htmlFiles = Get-ChildItem -Path $sourceDir -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.FullName)..."
    
    # Read the content of the file
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace all occurrences of /MyData/ with /web-portfolio/
    $updatedContent = $content -replace "/MyData/", "/web-portfolio/"
    
    # Write the updated content back to the file
    $updatedContent | Out-File -FilePath $file.FullName -Encoding utf8
    
    Write-Host "Updated file saved to $($file.FullName)"
}

Write-Host "All HTML files have been updated with the correct paths."
