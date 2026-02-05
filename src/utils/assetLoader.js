// --- Robust Asset Preloader ---

const preloadAsset = (src) => {
  return new Promise((resolve, reject) => {
    // Use the path after the last '/' to get the filename for extension check
    const filename = src.substring(src.lastIndexOf('/') + 1);
    const fileExtension = filename.split('.').pop().toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension)) {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    } else if (['mp3', 'wav', 'ogg'].includes(fileExtension)) {
      const audio = new Audio();
      audio.src = src;
      audio.oncanplaythrough = resolve;
      audio.onerror = reject;
    } else if (['mp4', 'webm'].includes(fileExtension)) {
      const video = document.createElement('video');
      video.src = src;
      video.oncanplaythrough = resolve;
      video.onerror = reject;
    } else {
      // For unknown types or paths without extensions, resolve immediately
      console.warn(`Unknown asset type for '${src}', resolving immediately.`);
      resolve();
    }
  });
};

export const preloadAssets = (srcArray) => {
    return Promise.all(srcArray.map(preloadAsset));
};
