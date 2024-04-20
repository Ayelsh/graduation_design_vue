@SETLOCAL
@IF NOT DEFINED NODE_PATH (
  @SET "NODE_PATH=%~dp0\D:\Gre\toC\graduation-design\node_modules\.store\marked@12.0.1\node_modules"
) ELSE (
  @SET "NODE_PATH=%NODE_PATH%;%~dp0\D:\Gre\toC\graduation-design\node_modules\.store\marked@12.0.1\node_modules"
)
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\.store\marked@12.0.1\node_modules\marked\bin\marked.js" %*
) ELSE (
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\.store\marked@12.0.1\node_modules\marked\bin\marked.js" %*
)
