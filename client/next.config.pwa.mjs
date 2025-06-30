// next-pwa config for Deed3 Platform
import { withPWA } from 'next-pwa';

export default withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    // ...other Next.js config options
});
