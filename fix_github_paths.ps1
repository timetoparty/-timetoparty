# This script updates all paths in HTML files from /Afonso-Macedo-web-portfolio/ to /MyData/

# Define the source and destination directories
$sourceDir = "C:\Users\afons\Desktop\Portfolio\Afonso-main"
$destDir = "C:\Users\afons\Desktop\Portfolio\MyData"

# Create the destination directory if it doesn't exist
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force
}

# Get all HTML files in the source directory and its subdirectories
$htmlFiles = Get-ChildItem -Path $sourceDir -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.FullName)..."
    
    # Read the content of the file
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace all occurrences of /Afonso-Macedo-web-portfolio/ with /MyData/
    $updatedContent = $content -replace "/Afonso-Macedo-web-portfolio/", "/MyData/"
    
    # Calculate the relative path to maintain the same directory structure
    $relativePath = $file.FullName.Substring($sourceDir.Length)
    $destPath = Join-Path -Path $destDir -ChildPath $relativePath
    
    # Create the destination directory if it doesn't exist
    $destFolder = Split-Path -Path $destPath -Parent
    if (-not (Test-Path $destFolder)) {
        New-Item -ItemType Directory -Path $destFolder -Force
    }
    
    # Write the updated content to the destination file
    $updatedContent | Out-File -FilePath $destPath -Encoding utf8
    
    Write-Host "Updated file saved to $destPath"
}

# Copy all non-HTML files (CSS, JS, images, etc.)
$nonHtmlFiles = Get-ChildItem -Path $sourceDir -Recurse | Where-Object { -not $_.PSIsContainer -and $_.Extension -ne ".html" }

foreach ($file in $nonHtmlFiles) {
    $relativePath = $file.FullName.Substring($sourceDir.Length)
    $destPath = Join-Path -Path $destDir -ChildPath $relativePath
    
    # Create the destination directory if it doesn't exist
    $destFolder = Split-Path -Path $destPath -Parent
    if (-not (Test-Path $destFolder)) {
        New-Item -ItemType Directory -Path $destFolder -Force
    }
    
    # Copy the file
    Copy-Item -Path $file.FullName -Destination $destPath -Force
    
    Write-Host "Copied file to $destPath"
}

Write-Host "All files have been processed and copied to $destDir with updated paths."
