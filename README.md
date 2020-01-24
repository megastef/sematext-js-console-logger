# sematext-js-console-logger

Persist your browser logs in [Sematext Cloud](https://sematext.com/cloud) with no code changes -  simply use `console.log` to store logs. 

Writing all browser logs to Sematext Cloud. This library overwrites `console.log`, `console.error`, `console.warn` functions.
Logs are displayed in browser console and forwarded to Sematext Cloud. 

In addition it installs an error handler logging all errors. 
All logs are enriched with sessionId from cookies, url, and user agent etc. 

See also: [quick start instructions to setup your log storage](https://sematext.com/docs/logs/quick-start/). 

Once you created a logs App, add this script to your web-page: 

- Sematext Cloud in USA
```
<script src="https://cdn.jsdelivr.net/gh/megastef/sematext-js-console-logger@master/index.js">
  sematextLogger('YOUR_LOGS_TOKEN', 'US')
</script>
```
- Sematext Cloud in Europe
```
<script src="https://cdn.jsdelivr.net/gh/megastef/sematext-js-console-logger@master/index.js">
  // Sematext Cloud in Europe
  sematextLogger('YOUR_LOGS_TOKEN', 'EU')
</script>
```

- Sematext Enterprise
```
<script src="https://cdn.jsdelivr.net/gh/megastef/sematext-js-console-logger@master/index.js">
  // Sematext Enterprise 
  sematextLogger('YOUR_LOGS_TOKEN', 'local', 'http://your-sematext-server:port')
</script>
```

Example web page: 

```html
<html>
<body>
<script src="https://cdn.jsdelivr.net/gh/megastef/sematext-js-console-logger/index.min.js"></script>
<script language="JavaScript">
// use your sematext logs token, and set region to US or EU
sematextLogger('c0e39f27-xxxx-xxxx-9f27-8818a4f0b59d', 'US')
console.log('Hello from Browser')
console.error('Error from Browser')
console.log({'name': 'stefan'}, 5, window.name)
console.log({'name': 'stefan'}, '5', 10, window.name)
</script>
  Hello
</body>

</html>
```


Example log entry in Sematext: 

```
{
  "@timestamp": "2020-01-24T09:09:49.622Z",
  "sessionId": "false",
  "severity": "info",
  "href": "file:///Users/stefan/sematext/sematext-browser-loggger/test.html",
  "browser": {
    "appName": "Netscape",
    "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    "platform": "MacIntel"
  },
  "message": "Error event: 'Uncaught TypeError: console.invalidFunctionCall is not a function' from file:///Users/stefan/sematext/sematext-browser-loggger/test.html:13 Error event: 'Uncaught TypeError: console.invalidFunctionCall is not a function' from file:///Users/stefan/sematext/sematext-browser-loggger/test.html:13",
  "@timestamp_received": "2020-01-24T09:09:52.735Z",
  "logsene_orig_type": "browser_logs"
}
```
