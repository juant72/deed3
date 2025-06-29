# VS Code Performance Optimization Script
# Ejecutar este script cuando VS Code comience a funcionar lento

Write-Host "🔧 Optimizando VS Code para mejor rendimiento..." -ForegroundColor Yellow

# 1. Limpiar cache de TypeScript
Write-Host "Limpiando cache de TypeScript..." -ForegroundColor Green
if (Test-Path "$env:TEMP\vscode-typescript") {
    Remove-Item "$env:TEMP\vscode-typescript" -Recurse -Force -ErrorAction SilentlyContinue
}

# 2. Limpiar logs antiguos de VS Code
Write-Host "Limpiando logs antiguos..." -ForegroundColor Green
$logsPath = "$env:APPDATA\Code\logs"
if (Test-Path $logsPath) {
    Get-ChildItem $logsPath | Where-Object { $_.CreationTime -lt (Get-Date).AddDays(-7) } | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
}

# 3. Verificar uso de memoria
Write-Host "Verificando procesos de VS Code..." -ForegroundColor Green
$codeProcesses = Get-Process Code -ErrorAction SilentlyContinue
if ($codeProcesses) {
    $totalMemory = ($codeProcesses | Measure-Object WorkingSet -Sum).Sum / 1MB
    Write-Host "Uso total de memoria: $([math]::Round($totalMemory, 2)) MB" -ForegroundColor Cyan
    
    if ($totalMemory -gt 4000) {
        Write-Host "⚠️  ADVERTENCIA: Alto uso de memoria detectado!" -ForegroundColor Red
        Write-Host "Considera reiniciar VS Code si experimentas lentitud." -ForegroundColor Yellow
    }
}

# 4. Verificar tamaño de node_modules
Write-Host "Verificando tamaño de dependencias..." -ForegroundColor Green
$nodeModulesSize = 0
if (Test-Path "node_modules") {
    $nodeModulesSize = (Get-ChildItem "node_modules" -Recurse -File | Measure-Object Length -Sum).Sum / 1MB
    Write-Host "Tamaño de node_modules: $([math]::Round($nodeModulesSize, 2)) MB" -ForegroundColor Cyan
}

# 5. Sugerencias de optimización
Write-Host "`n📋 Recomendaciones para prevenir crashes:" -ForegroundColor Yellow
Write-Host "1. Reiniciar VS Code cada 2-3 horas de trabajo intensivo" -ForegroundColor White
Write-Host "2. Cerrar pestañas/archivos no utilizados regularmente" -ForegroundColor White
Write-Host "3. Deshabilitar extensiones no esenciales temporalmente" -ForegroundColor White
Write-Host "4. Usar 'Developer: Reload Window' en lugar de reinicio completo" -ForegroundColor White
Write-Host "5. Monitorear el uso de memoria en Task Manager" -ForegroundColor White

# 6. Crear comando rápido para reload
Write-Host "`n🔄 Comando rápido - Reload Window:" -ForegroundColor Green
Write-Host "Ctrl+Shift+P -> 'Developer: Reload Window'" -ForegroundColor Cyan

Write-Host "`n✅ Optimización completada!" -ForegroundColor Green
