export function convertTimestampToTime(timestamp) {
    const date = new Date(timestamp);
  
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime;
  }
  
  export function calculateTimeSpent(startTimestamp, endTimestamp) {
    const timeDifference = endTimestamp - startTimestamp;
    const milliseconds = Math.abs(timeDifference);
  
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  
    const formattedTime = `${hours}h: ${minutes}m: ${seconds}s`;
    return formattedTime;
  }
  