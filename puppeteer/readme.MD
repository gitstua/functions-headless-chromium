# Purpose
This Azure Function is a sample which uses Puppeteer to measure page load time. 

The page load time is added to the page then a screenshot is returned.

Sample to include in an HTML page:
```
<img src="https://sturesponse-au.azurewebsites.net/api/screenshot?url=https://example.com" alt="screengrab of example.com with timing">
```
# Sample url (please do not abuse as this will mean it will be rate limited)
https://sturesponse-au.azurewebsites.net/api/screenshot?url=https://example.com/
