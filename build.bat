@echo off
setlocal
echo Building the project...
echo Building frontend...
cd frontend
call npm run build
cd ..

echo Building backend...
echo done

echo Building Docker image...
docker build paynow .

echo Build process completed!

endlocal
