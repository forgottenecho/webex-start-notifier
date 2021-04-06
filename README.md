# webex-start-notifier
This is a chrome extension that automatically runs on [webex.com](http://webex.com). It waits for the host to start a meeting, so you don't have to.

## Dependencies
- Chrome (developer mode ON)
- PHPMailer

## Under the Hood
Once the webex room is open, an HTTP request is sent to `notifyUrl`. I hosted notify.php and pointed my `notifyUrl` there. It saids and email saying "WEBEX ROOM OPEN" and you could even have it send you a text message by emailing <your_phone_number@txt.att.net>.

The extension has an auto-reload feature that avoids webex's time out of 30 minutes, so the extension can technically run indefinitely.