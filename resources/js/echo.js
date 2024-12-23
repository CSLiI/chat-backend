import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: 'b4d3083504abe0fdfcf5', 
    cluster: 'ap1', 
    forceTLS: true,
});

export default echo;