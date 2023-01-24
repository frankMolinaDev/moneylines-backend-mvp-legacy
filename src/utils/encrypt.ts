const crypto = require('crypto');

const encryptString = (str: string): string => {
  try {
    const algorithm = 'aes-256-cbc';
    const iv = 'vOVH6sdmpNWjRRIq';
    const key = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let data = cipher.update(str, 'utf-8', 'hex');
    data += cipher.final('hex');
    return data;
  } catch (error) {
    return null;
  }
};

const decryptString = (str: string): string => {
  try {
    const algorithm = 'aes-256-cbc';
    const iv = 'vOVH6sdmpNWjRRIq';
    const key = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let data = decipher.update(str, 'hex', 'utf-8');
    data += decipher.final('utf8');
    return data;
  } catch (error) {
    return null;
  }
};

const hashString = (str: string): string => {
  const md5 = crypto.createHash('md5');
  return md5.update(str).digest('hex');
};

export { encryptString, decryptString, hashString };
