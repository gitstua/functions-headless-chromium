# Purpose
This Azure Function is a sample which uses Puppeteer to measure page load time. 

The page load time is added to the page then a screenshot is returned.

Sample to include in an HTML page:
```
<img src="https://sturesponse-au.azurewebsites.net/api/screenshot?url=https://example.com" alt="screengrab of example.com with timing">
```
# Sample url (please do not abuse as this will mean it will be rate limited)
https://sturesponse-au.azurewebsites.net/api/screenshot?url=https://example.com/

# Development
## Linux Node version 
ensure you have node 8.x or 10.x
If you have 14.x then use the following to install earlier version
```
sudo npm install -g n
sudo n stable
sudo n 10.16.0
```

## Windows Node
install node 12
npm i puppeteer@1.11.0-next.1547527073587

If you want to run multiple versions of Node side by side on window then this [post](https://medium.com/appseed-io/how-to-run-multiple-versions-of-node-js-with-nvm-for-windows-ffbe5c7a2b47#:~:text=%20How%20to%20run%20multiple%20versions%20of%20NodeJS,which%20will%20print%20out%20the%20current...%20More%20) is good to explain NVM on Windows

## Running locally
```
cd puppeteer
func start
```

