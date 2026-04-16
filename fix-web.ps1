Get-ChildItem -Recurse -Filter *.html | ForEach-Object {

    $file = $_.FullName
    $content = Get-Content $file -Raw

    # CSS
    $content = $content -replace 'href="[^"]*assets/css/style.css"', 'href="../../assets/css/style.css"'

    # Imágenes
    $content = $content -replace 'src="[^"]*assets/img/', 'src="../../assets/img/'

    # Añadir estilo a imágenes si no tienen
    $content = $content -replace '<img(?![^>]*style=)', '<img style="max-width:100%; height:auto;"'

    # Hero
    $content = $content -replace 'class="hero"', 'class="hero hero-small"'

    # Encoding básico
    $content = $content -replace 'Ã¡','á'
    $content = $content -replace 'Ã©','é'
    $content = $content -replace 'Ã­','í'
    $content = $content -replace 'Ã³','ó'
    $content = $content -replace 'Ãº','ú'
    $content = $content -replace 'Ã±','ñ'

    Set-Content -Path $file -Value $content -Encoding UTF8

    Write-Output "Procesado: $file"
}