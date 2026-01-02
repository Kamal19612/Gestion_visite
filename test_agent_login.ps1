# Script to create an agent user and test login
# Prerequisites: Backend must be running on http://localhost:8080

$BackendUrl = "http://localhost:8080"

# Step 1: Try to login with admin account first to create agent
Write-Host "=== Step 1: Admin Login ===" -ForegroundColor Cyan

$adminCreds = @{
    email = "admin@gestionvisite.com"
    password = "Admin@123"
}

$adminLoginResponse = Invoke-WebRequest -Uri "$BackendUrl/api/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body (ConvertTo-Json $adminCreds) `
    -ErrorAction SilentlyContinue

if ($adminLoginResponse.StatusCode -eq 200) {
    $adminToken = ($adminLoginResponse.Content | ConvertFrom-Json).token
    Write-Host "✓ Admin logged in successfully" -ForegroundColor Green
    Write-Host "Token: $($adminToken.Substring(0, 50))..." -ForegroundColor Gray
    
    # Step 2: Create agent user
    Write-Host "`n=== Step 2: Create Agent User ===" -ForegroundColor Cyan
    
    $agentData = @{
        firstName = "Test"
        lastName = "Agent"
        email = "agent@test.com"
        password = "test123"
        confirmPassword = "test123"
        whatsapp = "+212612345678"
        role = "AGENT_SECURITE"
    }
    
    $headers = @{
        "Authorization" = "Bearer $adminToken"
        "Content-Type" = "application/json"
    }
    
    $createResponse = Invoke-WebRequest -Uri "$BackendUrl/api/v1/users" `
        -Method POST `
        -ContentType "application/json" `
        -Body (ConvertTo-Json $agentData) `
        -Headers $headers `
        -ErrorAction SilentlyContinue
    
    if ($createResponse.StatusCode -eq 201 -or $createResponse.StatusCode -eq 200) {
        Write-Host "✓ Agent created successfully" -ForegroundColor Green
        $agentUser = $createResponse.Content | ConvertFrom-Json
        Write-Host "Agent ID: $($agentUser.user.id)" -ForegroundColor Gray
        Write-Host "Agent Email: $($agentUser.user.email)" -ForegroundColor Gray
        
        # Step 3: Test agent login
        Write-Host "`n=== Step 3: Test Agent Login ===" -ForegroundColor Cyan
        
        $agentCreds = @{
            email = "agent@test.com"
            password = "test123"
        }
        
        $agentLoginResponse = Invoke-WebRequest -Uri "$BackendUrl/api/auth/login" `
            -Method POST `
            -ContentType "application/json" `
            -Body (ConvertTo-Json $agentCreds) `
            -ErrorAction SilentlyContinue
        
        if ($agentLoginResponse.StatusCode -eq 200) {
            $agentToken = ($agentLoginResponse.Content | ConvertFrom-Json).token
            Write-Host "✓ Agent logged in successfully!" -ForegroundColor Green
            Write-Host "Agent Token: $($agentToken.Substring(0, 50))..." -ForegroundColor Gray
            Write-Host "`n✓ Login test PASSED - Agent can now access the system" -ForegroundColor Green
        } else {
            Write-Host "✗ Agent login failed with status: $($agentLoginResponse.StatusCode)" -ForegroundColor Red
            Write-Host "Response: $($agentLoginResponse.Content)" -ForegroundColor Red
        }
    } else {
        Write-Host "✗ Failed to create agent. Status: $($createResponse.StatusCode)" -ForegroundColor Red
        Write-Host "Response: $($createResponse.Content)" -ForegroundColor Red
    }
} else {
    Write-Host "✗ Admin login failed. Make sure:" -ForegroundColor Red
    Write-Host "   1. Backend is running on $BackendUrl" -ForegroundColor Gray
    Write-Host "   2. Admin user exists with email: admin@gestionvisite.com" -ForegroundColor Gray
    Write-Host "   3. Admin password is: Admin@123" -ForegroundColor Gray
    Write-Host "`nResponse: $($adminLoginResponse.Content)" -ForegroundColor Red
}

Write-Host "`n=== Summary ===" -ForegroundColor Yellow
Write-Host "To login as agent in the UI, use:" -ForegroundColor Cyan
Write-Host "  Email: agent@test.com" -ForegroundColor White
Write-Host "  Password: test123" -ForegroundColor White
