export function parseDate(date){
    const dateObj = new Date(date);
    const now = new Date();
    const diff = (now.getTime() - dateObj.getTime()) / 1000;

    if (diff < 60) {
        return `${Math.floor(diff)} seconds ago`;
    } else if (diff < 3600) {
        return `${Math.floor(diff / 60)} minutes ago`;
    } else if (diff < 86400) {
        return `${Math.floor(diff / 3600)} hours ago`;
    } else if (diff < 604800) {
        return `${Math.floor(diff / 86400)} days ago`;
    } else {
        const options = { month: 'short', day: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options);
    }
}
