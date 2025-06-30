# VS Code Optimization Script for Large Projects
# This script helps apply the optimizations and restart VS Code cleanly

Write-Host "🔧 VS Code Optimization Script" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan

# Function to check if VS Code is running
function Test-VSCodeRunning {
    return (Get-Process "Code" -ErrorAction SilentlyContinue) -ne $null
}

# Function to gracefully close VS Code
function Stop-VSCode {
    Write-Host "🛑 Closing VS Code..." -ForegroundColor Yellow
    
    if (Test-VSCodeRunning) {
        # Try graceful shutdown first
        Get-Process "Code" -ErrorAction SilentlyContinue | ForEach-Object {
            $_.CloseMainWindow() | Out-Null
        }
        
        # Wait a bit for graceful shutdown
        Start-Sleep -Seconds 3
        
        # Force close if still running
        if (Test-VSCodeRunning) {
            Write-Host "⚠️  Forcing VS Code to close..." -ForegroundColor Red
            Stop-Process -Name "Code" -Force -ErrorAction SilentlyContinue
        }
        
        # Wait a bit more to ensure processes are fully terminated
        Start-Sleep -Seconds 2
    }
    
    Write-Host "✅ VS Code closed" -ForegroundColor Green
}

# Function to clear VS Code cache
function Clear-VSCodeCache {
    Write-Host "🧹 Clearing VS Code cache..." -ForegroundColor Yellow
    
    $cacheLocations = @(
        "$env:APPDATA\Code\User\workspaceStorage",
        "$env:APPDATA\Code\CachedExtensions",
        "$env:APPDATA\Code\logs",
        "$env:APPDATA\Code\CachedExtensionVSIXs"
    )
    
    foreach ($location in $cacheLocations) {
        if (Test-Path $location) {
            try {
                Remove-Item -Path $location -Recurse -Force -ErrorAction SilentlyContinue
                Write-Host "  ✅ Cleared: $location" -ForegroundColor Green
            } catch {
                Write-Host "  ⚠️  Could not clear: $location" -ForegroundColor Yellow
            }
        }
    }
}

# Function to check system resources
function Test-SystemResources {
    Write-Host "💻 Checking system resources..." -ForegroundColor Yellow
    
    $memory = Get-WmiObject -Class Win32_OperatingSystem
    $availableMemoryGB = [math]::Round($memory.FreePhysicalMemory / 1024 / 1024, 2)
    $totalMemoryGB = [math]::Round($memory.TotalVisibleMemorySize / 1024 / 1024, 2)
    
    Write-Host "  💾 Available Memory: $availableMemoryGB GB / $totalMemoryGB GB" -ForegroundColor Cyan
    
    if ($availableMemoryGB -lt 4) {
        Write-Host "  ⚠️  Low memory detected. Consider closing other applications." -ForegroundColor Yellow
    } else {
        Write-Host "  ✅ Memory looks good" -ForegroundColor Green
    }
}

# Function to optimize Windows for development
function Optimize-WindowsForDev {
    Write-Host "⚡ Applying Windows optimizations..." -ForegroundColor Yellow
    
    try {
        # Disable Windows Search for project directories (temporarily)
        $projectPath = Split-Path -Parent $PSScriptRoot
        Write-Host "  🔍 Optimizing Windows Search for: $projectPath" -ForegroundColor Cyan
        
        # Note: This would require admin privileges, so we'll just recommend it
        Write-Host "  💡 Recommendation: Exclude project folders from Windows Search indexing" -ForegroundColor Blue
        Write-Host "     Go to: Settings > Search > Searching Windows > Advanced Search Indexer Settings" -ForegroundColor Blue
        
        # Set high performance power plan
        Write-Host "  ⚡ Checking power plan..." -ForegroundColor Cyan
        $currentPlan = powercfg /getactivescheme
        if ($currentPlan -notlike "*High performance*") {
            Write-Host "  💡 Recommendation: Switch to High Performance power plan for development" -ForegroundColor Blue
        } else {
            Write-Host "  ✅ High Performance power plan active" -ForegroundColor Green
        }
        
    } catch {
        Write-Host "  ⚠️  Some optimizations require admin privileges" -ForegroundColor Yellow
    }
}

# Function to start VS Code with optimizations
function Start-VSCodeOptimized {
    Write-Host "🚀 Starting VS Code with optimizations..." -ForegroundColor Yellow
    
    $projectPath = Split-Path -Parent $PSScriptRoot
    $vsCodeArgs = @(
        $projectPath,
        "--disable-extensions",  # Start without extensions first
        "--new-window",
        "--wait"
    )
    
    try {
        Write-Host "  📁 Opening project: $projectPath" -ForegroundColor Cyan
        Start-Process "code" -ArgumentList $vsCodeArgs -NoNewWindow
        
        Write-Host "✅ VS Code started" -ForegroundColor Green
        Write-Host "💡 After VS Code loads, you can enable extensions one by one" -ForegroundColor Blue
        
    } catch {
        Write-Host "❌ Failed to start VS Code. Make sure VS Code is installed and in PATH." -ForegroundColor Red
        Write-Host "   You can manually open VS Code and load the project folder." -ForegroundColor Yellow
    }
}

# Main execution
Write-Host ""
Write-Host "This script will:"
Write-Host "1. 🛑 Close VS Code gracefully"
Write-Host "2. 🧹 Clear VS Code cache"
Write-Host "3. 💻 Check system resources"
Write-Host "4. ⚡ Apply Windows optimizations"
Write-Host "5. 🚀 Restart VS Code with optimizations"
Write-Host ""

$confirm = Read-Host "Do you want to continue? (Y/N)"
if ($confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host "❌ Operation cancelled" -ForegroundColor Red
    exit
}

Write-Host ""

# Execute optimization steps
Stop-VSCode
Clear-VSCodeCache
Test-SystemResources
Optimize-WindowsForDev

Write-Host ""
Write-Host "🎉 Optimizations completed!" -ForegroundColor Green
Write-Host ""

$startVSCode = Read-Host "Start VS Code now? (Y/N)"
if ($startVSCode -eq "Y" -or $startVSCode -eq "y") {
    Start-VSCodeOptimized
} else {
    Write-Host "✅ You can manually start VS Code when ready" -ForegroundColor Green
    Write-Host "💡 Use 'code .' from the project directory" -ForegroundColor Blue
}

Write-Host ""
Write-Host "📝 Additional recommendations:" -ForegroundColor Cyan
Write-Host "  • Install only essential extensions (see .vscode/extensions.json)" -ForegroundColor Blue
Write-Host "  • Keep only one large project open at a time" -ForegroundColor Blue
Write-Host "  • Use 'Reload Window' command if VS Code becomes sluggish" -ForegroundColor Blue
Write-Host "  • Monitor memory usage in Task Manager" -ForegroundColor Blue
Write-Host ""
