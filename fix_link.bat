@echo off
powershell -Command "(Get-Content 'C:\Users\afons\Desktop\Portfolio\Afonso-main\index.html') -replace 'href=projects/travel-predictor-static.html\"', 'href=\"projects/travel-predictor-static.html\"' | Out-File -Encoding utf8 'C:\Users\afons\Desktop\Portfolio\Afonso-main\index.html.new'"
if %ERRORLEVEL% EQU 0 (
    move /y "C:\Users\afons\Desktop\Portfolio\Afonso-main\index.html.new" "C:\Users\afons\Desktop\Portfolio\Afonso-main\index.html"
    echo File updated successfully.
) else (
    echo Error updating file.
)
