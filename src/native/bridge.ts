import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";

export const isNative = (): boolean => Capacitor.isNativePlatform();

export async function shareFile(name: string, json: string): Promise<void> {
  if (!isNative()) return;
  const { uri } = await Filesystem.writeFile({
    path: name,
    data: json,
    directory: Directory.Cache,
    encoding: Encoding.UTF8,
  });
  await Share.share({ title: name, files: [uri] });
}
