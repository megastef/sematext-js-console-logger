# sematext-js-console-logger

Writing all browser logs to Sematext Cloud. This library overwrites console.log, console.error, console.warn functions. In additionit installs an error handler that logs all errors. 

All logs are enriched with sessionId, url, userAgent etc. 

Example web page: 

```html
<html>
<body>
<script src="./index.js"></script>
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
