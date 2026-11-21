# Installation, offline stories and Android packages

## Supported delivery

Discover Burgas 1.1.0 is a web application with progressive installation. Open `/bg/install` or `/en/install` for device-specific instructions. Android and desktop Chromium browsers can expose the native install prompt; iOS/iPadOS use Share → Add to Home Screen. Safari on supported macOS versions offers Add to Dock. Linux installation depends on the browser, not the distribution. Browsing remains available without installation. No universal compatibility with every OS is claimed.

## Offline and updates

The production service worker caches the public application shell and same-origin assets. A visitor explicitly saves a landmark's public text, sources, attribution and local photograph in IndexedDB. `/offline` lists and removes saved stories. Maps, directions, live visitor information and new downloads require connectivity. APIs, admin pages, external map tiles and credentials are not cached. Browser storage can be evicted; saved stories are not a backup.

A new worker waits until the visitor chooses Update. Activation reloads the page without clearing favorites or the offline library. `/api/version` exposes the compiled version/build identity without caching. Service workers are disabled in development; verify using `npm run build` then `npm start` over localhost or HTTPS.

## Android

`platforms/android/project` is a generated Bubblewrap Trusted Web Activity project. It opens `https://discover-burgas.vercel.app`, so the public website must be current and available. Android package ID: `com.discoverburgas.guide`. APK is for direct installation; AAB is a future distribution bundle and cannot be directly installed. No store publication is configured.

Requirements: JDK 17, Android SDK platform 36, build tools 35.0.0 and acceptance of Google's SDK license by the owner. Set `JAVA_HOME` and `ANDROID_HOME`. Run:

```sh
npm run android:signing
npm run android:build
```

The signing script keeps private material outside the repository, under `%LOCALAPPDATA%/DiscoverBurgasBuild/signing` on Windows. Back up that folder securely: losing the key prevents compatible future updates. Never commit the keystore or `release.json`. Only the public certificate fingerprint is committed. The public `/.well-known/assetlinks.json` binds the website to this signing certificate; it must be deployed before testing the trusted full-screen experience. Without successful verification a browser toolbar may appear.

Build outputs go to `artifacts/android`: signed APK, signed AAB and SHA256SUMS.txt. The manual Android workflow requires repository signing secrets (`ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_PASSWORD`). Use the same certificate as `platforms/android/signing-certificate.json`.

Generated Android boilerplate retains its Apache license headers. Bubblewrap was used as a one-time generator, not added to runtime dependencies.

Implementation references: [Chrome TWA quick start](https://developer.chrome.com/docs/android/trusted-web-activity/quick-start), [Android bundles and APKs](https://developer.android.com/guide/app-bundle/faq), [Android SDK terms](https://developer.android.com/studio/terms), [WebKit installation capabilities](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/).

## Release checks still requiring devices/owner action

- Approve and install Android SDK, then execute the signed build and Android lint.
- Deploy the matching website and asset links; verify the current domain does not show an old release.
- Test APK installation, verified TWA origin, QR deep links and updates on a physical Android device.
- Test Add to Home Screen on a physical iPhone/iPad and platform-specific desktop installation.
- Keep store submission, desktop installers and full offline maps out of this release.
