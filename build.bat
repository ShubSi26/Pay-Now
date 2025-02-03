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
docker build -t shubhamdockr/paynow:3.0 .

docker push shubhamdockr/paynow:3.0

echo Build process completed!

endlocal
