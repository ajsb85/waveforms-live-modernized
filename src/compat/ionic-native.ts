import { Filesystem, Directory } from '@capacitor/filesystem';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar as CapacitorStatusBar, Style } from '@capacitor/status-bar';

export class StatusBar {
  static styleDefault(): void {
    void CapacitorStatusBar.setStyle({ style: Style.Default }).catch(() => {});
  }
}

export class Splashscreen {
  static hide(): void {
    void SplashScreen.hide().catch(() => {});
  }
}

export class Transfer {
  async download(source: string, target: string): Promise<{ nativeURL: string }> {
    const response = await fetch(source);
    if (!response.ok) {
      throw new Error(`Download failed with HTTP ${response.status}`);
    }

    const blob = await response.blob();
    const data = await blobToBase64(blob);
    const path = target.split('/').pop() || 'download.bin';

    await Filesystem.writeFile({
      path,
      data,
      directory: Directory.Data
    });

    return { nativeURL: target };
  }
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
    reader.readAsDataURL(blob);
  });
}
