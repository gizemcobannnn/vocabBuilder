export default function generateObjectId() {
  const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
  const randomPart = 'xxxxxxxxxxxxxxxx'.replace(/x/g, () =>
    Math.floor(Math.random() * 16).toString(16)
  );
  return (timestamp + randomPart).substring(0, 24);
}

