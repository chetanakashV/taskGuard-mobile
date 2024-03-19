if(title == "") Alert.alert("Title should not be empty"); 
else  if(message == "") Alert.alert("Message should not be empty"); 
else {
    console.log(message)
    
    async function sendFCMNotification(titl, message, fcmToken) {
        // Replace with your actual FCM server key (DO NOT SHARE THIS PUBLICLY)
        const apiKey = 'AAAA49LMuFs:APA91bG0JEGIEJCkSSUIrdpJZYAYvNCTGFnYj6J_5AZtvBjDu35f4XIaq6geM7Rww0kFJBK15CtsDWwvrEpUhQxZYMDyMQLiP5JXQkMfcZGl1CpVoN_dIlt5DZf7v_Ba7d0pvrbCc6mA';
      
        try {
          const response = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
              'Authorization': `key=${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: fcmKey,
              notification: {
                title : title,
                body: message,
              },
              priority: 'high', // Set priority to ensure timely delivery (optional)
            }),
          });
      
          if (!response.ok) {
            throw new Error(`FCM notification failed with status: ${response.status}`);
          }
      
          console.log('FCM notification sent successfully!');
        } catch (err) {
          console.error('Error sending FCM notification:', err);
        } finally {
          // Optional: Perform any necessary cleanup actions (e.g., closing connections)
        }
      }
      
      // Example usage (assuming you have the FCM token and message content)
      const fcmToken = {fcmKey};
      const title = {title};
      const message = {message};
      
      sendFCMNotification(title, message, fcmToken)
        .then(() => console.log('Alert displayed after successful notification'))
        .catch(err => console.error('Error:', err));
      
}