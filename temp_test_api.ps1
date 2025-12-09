$port=8081
$base = "http://localhost:$port"
$email = "test$(Get-Date -Format yyyyMMddHHmmss)@example.com"
Write-Output "Registering user: $email"
$regBody = @{ name = 'Test User'; email = $email; password = 'Password123!' } | ConvertTo-Json
try{
    $reg = Invoke-RestMethod -Method Post -Uri "$base/api/auth/register" -Body $regBody -ContentType 'application/json' -TimeoutSec 30
    Write-Output "Register response:"
    $reg | ConvertTo-Json
} catch {
    Write-Output "Register failed: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $resp = $_.Exception.Response.GetResponseStream(); $sr = New-Object System.IO.StreamReader($resp); Write-Output $sr.ReadToEnd()
    }
    exit 1
}
Write-Output "-> login"
$loginBody = @{ email = $email; password = 'Password123!' } | ConvertTo-Json
try {
    $login = Invoke-RestMethod -Method Post -Uri "$base/api/auth/login" -Body $loginBody -ContentType 'application/json' -TimeoutSec 30
    Write-Output "Login response:"
    $login | ConvertTo-Json
} catch {
    Write-Output "Login failed: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $resp = $_.Exception.Response.GetResponseStream(); $sr = New-Object System.IO.StreamReader($resp); Write-Output $sr.ReadToEnd()
    }
    exit 1
}
$token = $login.token
Write-Output "Token length: $($token.Length)"
Write-Output "-> Access protected endpoint GET /api/v1/users"
try {
    $users = Invoke-RestMethod -Method Get -Uri "$base/api/v1/users" -Headers @{ Authorization = "Bearer $token" } -TimeoutSec 30
    Write-Output "Protected GET response:"
    $users | ConvertTo-Json
} catch {
    Write-Output "Protected GET failed: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $resp = $_.Exception.Response.GetResponseStream(); $sr = New-Object System.IO.StreamReader($resp); Write-Output $sr.ReadToEnd()
    }
}
Write-Output "-> Logout"
try {
    $logout = Invoke-RestMethod -Method Post -Uri "$base/api/auth/logout" -Headers @{ Authorization = "Bearer $token" } -TimeoutSec 30
    Write-Output "Logout response:"
    $logout | ConvertTo-Json
} catch {
    Write-Output "Logout failed: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $resp = $_.Exception.Response.GetResponseStream(); $sr = New-Object System.IO.StreamReader($resp); Write-Output $sr.ReadToEnd()
    }
}
Write-Output "-> Access protected endpoint after logout"
try {
    $users2 = Invoke-RestMethod -Method Get -Uri "$base/api/v1/users" -Headers @{ Authorization = "Bearer $token" } -TimeoutSec 30
    Write-Output "Protected GET after logout response:"
    $users2 | ConvertTo-Json
} catch {
    Write-Output "Protected GET after logout failed: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $resp = $_.Exception.Response.GetResponseStream(); $sr = New-Object System.IO.StreamReader($resp); Write-Output $sr.ReadToEnd()
    }
}
Write-Output 'Done'