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
## node version
ensure you have node 8.x or 10.x
If you have 14.x then use the following to install earlier version
```
sudo npm install -g n
sudo n stable
sudo n 10.16.0
```

## Running
```
cd puppeteer
func build
func start
```

