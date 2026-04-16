Get-ChildItem -Recurse -Filter index.html | ForEach-Object {

    $file = $_.FullName
    $content = Get-Content $file -Raw

    # eliminar header viejo
    $content = [regex]::Replace($content, '<header[\s\S]*?</header>', '')

    # nuevo header limpio
    $newHeader = @"
<header class="header">
  <div class="container header-container">
    <a href="/" class="logo">
      <img src="/assets/img/logo-gadgetsmania2.png" alt="Gadgetsmania">
    </a>
    <nav class="nav">
      <a href="/">Inicio</a>
      <a href="/comparativa/">Comparativas</a>
      <a href="/reviews/">Reviews</a>
      <a href="/mejores/">Mejores</a>
    </nav>
  </div>
</header>
"@

    # meter header justo después de <body>
    $content = $content -replace '<body>', "<body>`n$newHeader"

    Set-Content $file $content -Encoding UTF8

    Write-Output "OK: $file"
}