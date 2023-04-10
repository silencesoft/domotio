export const saveMedia = async (media: string, type: string, name: string) => {
  if (!media) return '';

  // const file = await fetch(media).then((response) => response.blob());
  const formData = new FormData();

  const file = new Blob([media], { type });

  formData.append('fileToUpload', {
     uri: media,
     type: type,
     name: name,
  });

  // formData.append('submit', file, name);
  formData.append('submit', 'Upload Image');
  const headers = {
    Accept: 'application/json, */*',
    // 'Content-Type': 'multipart/form-data',
  };

  const url = await fetch('https://nostr.build/upload.php', {
    headers,
    method: 'POST',
    body: formData,
  })
    .then(async (response) => {
      const text = await response.text();
      const url = text.match(/https:\/\/nostr\.build\/(?:i|av)\/nostr\.build_[a-z0-9]{64}\.[a-z0-9]+/i);

      if (url) {
        return url;
      } else {
        return '';
      }
    })
    .catch((error) => {
      console.error('upload error', error);
      return '';
    });

  return url;
};
