#!/usr/bin/env pwsh

# Script para arreglar errores comunes de TypeScript en archivos TSX

$clientPath = "c:\Users\Juan\work\encrypia\labs\deed3\client"
Set-Location $clientPath

# Obtener todos los archivos TSX
$files = Get-ChildItem -Recurse -Filter "*.tsx" | Where-Object { $_.FullName -notlike "*node_modules*" }

Write-Host "Arreglando errores comunes en archivos TSX..."

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Reemplazar atributos HTML comunes
    $content = $content -replace 'for=', 'htmlFor='
    $content = $content -replace 'tabindex=', 'tabIndex='
    $content = $content -replace 'allowfullscreen=', 'allowFullScreen='
    $content = $content -replace 'readonly=', 'readOnly='
    $content = $content -replace 'onclick=', 'onClick='
    
    # Arreglar valores de tabIndex como string a number
    $content = $content -replace 'tabIndex="-1"', 'tabIndex={-1}'
    $content = $content -replace 'tabIndex="0"', 'tabIndex={0}'
    $content = $content -replace 'tabIndex="1"', 'tabIndex={1}'
    
    # Arreglar rows para textarea
    $content = $content -replace 'rows="(\d+)"', 'rows={$1}'
    
    # Solo escribir si el contenido cambió
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Arreglado: $($file.Name)"
    }
}

Write-Host "Terminado!"
