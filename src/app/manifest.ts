import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HelpArm – Допомога українцям в Польщі',
    short_name: 'HelpArm',
    description: 'Допомога українцям в Польщі',
    start_url: '/',
    display: 'standalone',
    background_color: '#edf2f7',
    theme_color: '#edf2f7',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icons/icon.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/icons/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/android-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/icons/android-icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/icons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icons/favicon-24x24.png',
        sizes: '24x24',
        type: 'image/png',
      },
      {
        src: '/icons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
  };
}
