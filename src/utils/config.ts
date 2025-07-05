export interface Config {
  defaultOutputDir: string;
  defaultQuality: string;
  defaultFormat: string;
  maxRetries: number;
}

export const defaultConfig: Config = {
  defaultOutputDir: './downloads',
  defaultQuality: 'highest',
  defaultFormat: 'mp4',
  maxRetries: 3
};

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return url.includes('youtube.com') || url.includes('youtu.be');
  } catch {
    return false;
  }
}
